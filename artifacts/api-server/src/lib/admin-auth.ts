import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "mes_admin_session";
const sessionDurationSeconds = 60 * 60 * 8;

const secret = () => process.env.ADMIN_AUTH_SECRET || process.env.SESSION_SECRET || "";
export const isAdminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && secret());
export const adminUsername = () => process.env.ADMIN_USERNAME || "admin";

export function matchesAdminUsername(candidate: string) {
  return candidate.trim().toLowerCase() === adminUsername().trim().toLowerCase();
}

const signature = (value: string) => createHmac("sha256", secret()).update(value).digest("base64url");

export function matchesAdminPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const expected = Buffer.from(password);
  const provided = Buffer.from(candidate);
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export function createAdminSession() {
  const value = `owner:${Math.floor(Date.now() / 1000)}`;
  return `${value}.${signature(value)}`;
}

export function isValidAdminSession(token?: string) {
  if (!token || !isAdminConfigured()) return false;
  const [value, suppliedSignature] = token.split(".");
  const [role, issuedAt] = value.split(":");
  const expectedSignature = signature(value);
  const issuedAtSeconds = Number(issuedAt);
  if (role !== "owner" || !issuedAtSeconds || Date.now() / 1000 - issuedAtSeconds > sessionDurationSeconds) return false;
  const expected = Buffer.from(expectedSignature);
  const provided = Buffer.from(suppliedSignature || "");
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}