import type { BoardFilters, BoardResponse, FieldErrors, OfferingsResponse } from "./types";

// All calls go to /api/* on this Next app; next.config rewrites them to Django (API_URL),
// adding Django's trailing slash. So paths here never end with "/".

const PASSCODE_KEY = "board-passcode";

export function getPasscode(): string | null {
  try {
    return window.localStorage.getItem(PASSCODE_KEY);
  } catch {
    return null;
  }
}

export function setPasscode(code: string) {
  try {
    window.localStorage.setItem(PASSCODE_KEY, code);
  } catch {
    // Storage blocked (private mode etc.); the code just won't persist.
  }
}

export type ApiErrorKind = "unreachable" | "passcode" | "not_found" | "invalid" | "other";

export class ApiError extends Error {
  constructor(
    public kind: ApiErrorKind,
    public status: number,
    public body: unknown = null,
    /** Whether a passcode was sent with the failing request (to tell "missing" from "wrong"). */
    public sentPasscode = false,
  ) {
    super(`API ${kind} (${status})`);
  }

  get fieldErrors(): FieldErrors {
    const errors = (this.body as { errors?: FieldErrors } | null)?.errors;
    return errors ?? {};
  }
}

function errorKind(status: number, hasJson: boolean): ApiErrorKind {
  if (status === 401) return "passcode";
  if (status === 404) return "not_found";
  if (status === 400) return "invalid";
  // The Next proxy answers with a non-JSON 5xx when Django is down.
  if (status >= 500 && !hasJson) return "unreachable";
  return "other";
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const passcode = getPasscode();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (passcode) headers.set("X-Board-Passcode", passcode);

  let res: Response;
  try {
    res = await fetch(`/api${path}`, { ...init, headers, cache: "no-store" });
  } catch {
    throw new ApiError("unreachable", 0);
  }

  let body: unknown = null;
  let hasJson = false;
  try {
    body = await res.json();
    hasJson = true;
  } catch {
    // Not JSON (e.g. proxy error page).
  }

  if (!res.ok) throw new ApiError(errorKind(res.status, hasJson), res.status, body, Boolean(passcode));
  return body as T;
}

function withFilters(path: string, filters: BoardFilters) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.district) params.set("district", filters.district);
  const qs = params.toString();
  return `${path}${qs ? `?${qs}` : ""}`;
}

export const getBoard = (filters: BoardFilters) =>
  request<BoardResponse>(withFilters("/requests", filters));

export const getOfferings = (filters: BoardFilters) =>
  request<OfferingsResponse>(withFilters("/offerings", filters));
