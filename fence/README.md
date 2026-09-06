# Fence policy registry

Fence is Bison's policy-enforcing proxy for LLM traffic. Policies are declarative
YAML files applied at **ingress** (before the model sees anything) and **egress**
(before anything the model produced reaches state or a user). This directory is the
open registry: the schema, the core policies, and the layout vertical packs follow.

```
fence/
  schema/policy.schema.json   # what a policy file must contain
  policies/*.yaml             # core policies (free)
  packs/<vertical>/*.yaml     # vertical packs (paid; layout documented here)
```

Every policy declares: `id`, `stage` (ingress|egress|both), `action` on match
(`block`, `redact`, `repair_once_then_block`, `route_human`, `degrade`), the
`detector` (regex, classifier, schema, budget, allowlist), `severity`, and a
`test` block with positive and negative examples so the policy is verifiable in CI.

Fail-closed is the default. A policy with no `test` block is rejected by
`fence-lint` (planned).
