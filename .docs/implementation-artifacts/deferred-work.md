# Deferred Work

- source_spec: `.docs/implementation-artifacts/spec-1-1-skjelett-som-starter-i-demomodus.md`
  summary: Add automated tests for the `/readme` page (README found via `README_PATH`, and the missing-file fallback «Fant ikke README-filen.»).
  evidence: Verification-gap review found that no test renders `ReadmePage`; testing an async server component under Vitest/jsdom needs extra setup. It was checked by hand during the Docker run (story 1.1).
