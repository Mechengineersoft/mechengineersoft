---
name: Preview auth sessions
description: Non-obvious session behavior for authenticated flows routed through a proxied preview.
---

When an authenticated flow runs behind a path-based preview proxy, do not assume a cookie survives the login-to-dashboard transition. Keep the secure HttpOnly cookie as the primary session, but support a short-lived signed handoff through the same-origin client request path and accept only valid signed credentials server-side.

**Why:** The preview can return successful login responses while the first protected dashboard request arrives without a usable cookie, creating a redirect loop that is difficult to diagnose from status codes alone.

**How to apply:** Keep the handoff scoped to the browser session, prefer same-document navigation after login, accept multiple valid credential channels rather than prioritizing a stale one, and redact cookies, Authorization, and any custom session headers from request logs. For HMAC sessions formatted as `owner:timestamp.signature`, split the signature from the value first, then split the value on `:`.