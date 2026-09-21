---
name: Resend connection authentication
description: Resend connections may be attached while their provider credential still returns 401.
---

Treat an attached Resend API-key connection as usable only after an authenticated provider call succeeds. Keep a secure EMAIL_API_KEY fallback when the connector proxy rejects its stored credential, and never expose either credential in logs or chat.

**Why:** The connection can report as added while the provider still rejects the credential, so assuming attachment means delivery is ready creates silent notification failures.

**How to apply:** Check the provider response during integration setup. For API-key failures, repair the connection or collect the key through Replit Secrets; do not use OAuth reauthorization.