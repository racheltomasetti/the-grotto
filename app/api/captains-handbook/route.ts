import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "grotto_captains_handbook";
const PDF_FILENAME = "captains-handbook.pdf";
const PDF_REL_PATH = path.join("private", PDF_FILENAME);
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSigningSecret(): string | undefined {
  return process.env.GROTTO_SESSION_SECRET ?? process.env.GROTTO_PASSWORD;
}

function signSession(exp: number): string {
  const secret = getSigningSecret();
  if (!secret) {
    throw new Error("Missing GROTTO_PASSWORD");
  }
  const payload = Buffer.from(JSON.stringify({ exp }), "utf8").toString(
    "base64url",
  );
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string): boolean {
  const secret = getSigningSecret();
  if (!secret) return false;

  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payloadPart = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedSig = createHmac("sha256", secret)
    .update(payloadPart)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const raw = Buffer.from(payloadPart, "base64url").toString("utf8");
    const data = JSON.parse(raw) as { exp?: number };
    if (typeof data.exp !== "number" || Date.now() > data.exp) return false;
    return true;
  } catch {
    return false;
  }
}

async function hasSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

function passwordsMatch(input: string, expected: string): boolean {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.get("check") === "1") {
    const unlocked = await hasSession();
    return Response.json({ unlocked });
  }

  if (!(await hasSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const download = url.searchParams.get("download") === "1";
  const pdfPath = path.join(process.cwd(), PDF_REL_PATH);

  try {
    const buf = await readFile(pdfPath);
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `${download ? "attachment" : "inline"}; filename="${PDF_FILENAME}"`,
    );
    headers.set("Cache-Control", "private, no-store");
    return new Response(buf, { headers });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export async function POST(req: Request) {
  const expectedPassword = process.env.GROTTO_PASSWORD;
  if (!expectedPassword) {
    return Response.json({ error: "Misconfigured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!passwordsMatch(password, expectedPassword)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const exp = Date.now() + MAX_AGE_MS;
  const token = signSession(exp);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(MAX_AGE_MS / 1000),
  });

  return Response.json({ ok: true });
}
