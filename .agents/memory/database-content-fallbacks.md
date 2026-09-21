---
name: Database content fallbacks
description: Preserve original website content when introducing editable database-backed collections.
---

When moving hardcoded marketing content into PostgreSQL, keep the original source as a safe fallback and seed the database with the complete legacy records before making the public page depend on them. Store every field the existing UI renders, not only the first-generation summary fields.

**Why:** An empty or incomplete content table can make a previously complete public page appear blank or lose case-study detail immediately after a database connection is added.

**How to apply:** Prefer published database records when they exist, use the original source when the collection is empty, and provide an authenticated restore/import path so the original records become editable rather than being discarded.