/**
 * Proxy — runs before every page request. Composes per-concern helpers
 * (e.g., theme header injection) into a single response passed through Next.
 *
 * Each concern is factored into its own helper function so new proxy
 * behaviors (auth, analytics, feature flags, etc.) can be added without
 * cluttering the main entry point.
 *
 * Renamed from middleware.ts per Next 16 file-convention deprecation; API
 * is otherwise identical.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);

  applyThemeHeader(request, headers);

  return NextResponse.next({ request: { headers } });
}

/**
 * Inject the active theme id from the `?theme=X` search param as an
 * `x-theme-id` request header so Server Components and next-intl config can
 * read it. App Router layouts do not receive searchParams as props, so header
 * injection is the cleanest way to expose the query param across the request.
 */
function applyThemeHeader(request: NextRequest, headers: Headers) {
  const themeId = request.nextUrl.searchParams.get('theme') ?? 'default';
  headers.set('x-theme-id', themeId);
}

/**
 * `config` is a Next.js convention export; the framework reads it directly at
 * build/runtime to determine which paths trigger this proxy.
 *
 * Match all paths EXCEPT those negated in the regex, such as /api/*,
 * /_next/static/*, /_next/image/*, and /favicon.ico.
 *
 * The negative lookahead (?!...) keeps proxy off requests that do not need
 * proxy processing, avoiding wasted serverless invocations on every static
 * asset fetch.
 *
 * Add to the exclusion list as new paths need to be skipped.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
