---
name: verify
description: Run lint, typecheck, and tests to verify the codebase is in a good state. Use after making changes or before committing.
---

Run the following checks sequentially and report results:

```bash
pnpm lint
tsc --noEmit
pnpm test
```

If any step fails, analyze the error and fix it. After fixing, re-run all checks from the beginning to ensure nothing else broke.
