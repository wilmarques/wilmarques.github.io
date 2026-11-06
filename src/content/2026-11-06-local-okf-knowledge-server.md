---
title: "A Local OKF Knowledge Server for Coding Agents"
slug: 2026-11-06-local-okf-knowledge-server
description: "Testing okf-mcp across five Git repositories, measuring retrieval quality and adding Git citations and explicit policy decisions."
---

Suppose you ask a coding agent to add a secured Spring Boot endpoint. The controller guidelines are in one repository. The REST and security standards are in two others. The agent needs to find the applicable rules without knowing where each team keeps them.

I tested whether `okf-mcp` could do this from a developer's machine. The setup uses local Git checkouts and the Model Context Protocol (MCP). The corpus uses the Open Knowledge Format (OKF), which stores concepts as Markdown with structured metadata. [OKF 0.2 specification](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/ad30107c31c06aec8a7d5636e0d1058118604e6f/SPEC.md)

## Setup

I made five independent Git repositories for Java, Spring Boot, REST APIs, security and Angular. Together they contained 43 synthetic concepts, including standards, examples and deprecated rules. Some concepts had typed links to another repository. One stdio MCP process indexed all five in memory. The retrieval and scale tests used synthetic content and no embedding service.

The main test used `@mfdaves/okf-mcp@0.12.0-rc.1` at commit `d10a05528289cb4a3440e7ea3c4b567d351a44d6`. The upstream test suite reported 451 passes, two skipped or marked todo and zero failures. I also ran a smaller MCP smoke test on 0.9.1, the stable release at the time. [Pinned upstream source](https://github.com/mfdaves/okf-mcp/tree/d10a05528289cb4a3440e7ea3c4b567d351a44d6)

The stock dependency audit flagged four packages. The runnable POC keeps the RC but pins patched versions of the MCP server SDK, YAML parser and Zod. It also updates the MCP client to the same SDK generation. The patched production dependency audit had zero findings at the time of the test. Both dependency sets are in the workspace.

## Retrieval

I froze 32 questions before running the benchmark and gave each a natural-language and a keyword version. The official TypeScript MCP SDK sent the requests over stdio using protocol `2025-11-25`. All three configurations received the same queries without repository names.

| Metric | Upstream default | Upstream with filters | Adapter |
| --- | ---: | ---: | ---: |
| Precision@5 | 0.463 | 0.497 | 0.475 |
| Recall@5 | 0.751 | 0.791 | 0.764 |
| Mean reciprocal rank | 0.865 | 0.984 | 0.992 |
| Cross-repository success | 11/16 | 12/16 | 12/16 |
| Authority selection | 0/16 | 16/16 | 16/16 |
| Complete Git attribution | 0% | 0% | 100% |

Cross-repository success required at least one relevant result from every expected repository in the first five. For the secured Spring Boot endpoint question, the adapter returned five Spring Boot documents. It missed the Java, REST API and security repositories that the judgment also required. Both the filtered upstream configuration and the adapter fell short of the 85% coverage target.

The Precision@5 test had a design flaw. It always divided by five, even for questions with fewer than five relevant concepts. With the frozen judgments, a perfect ranking could reach only 0.65, below the original 0.80 target. A new benchmark needs enough judged items to test that target and a separate metric for sparse answers.

Native filters for document type, lifecycle and review status selected the expected standard in every conflict case. They also had slightly higher recall than the adapter. Native search correctly identified the bundle, file and concept, while complete Git attribution also required the source repository and commit.

## Adapter

The adapter keeps the upstream parser, BM25+ search and graph. It exposes two MCP tools, `search_knowledge` and `read_knowledge`. It checks the allowed reviewers, reports why a policy was excluded and withholds a recommendation when two eligible standards share the same policy key. A citation points to the repository, concept, file and exact Git commit.

There was one OKF compatibility issue. The upstream parser expected a calendar date for `stale_after` and warned on an offset-bearing datetime allowed by OKF 0.2. The adapter checks freshness with the timestamp and offset.

Git synchronization fetches shallow checkouts, verifies file bytes against Git blobs and validates the whole project before switching the active snapshot. The tests covered added, edited, removed and deprecated concepts, changed verification and cross-repository links. Invalid content and unavailable sources left the previous snapshot available. A running MCP process needs to reconnect or restart to use the new snapshot.

The MCP calls were read-only. The mutation calls were rejected and the source hashes stayed the same. Local retrieval also passed with a network tripwire. A coding agent's model provider is a separate part of the setup, so private source access and the model's data policy still need to be verified.

## Runtime

Public GitHub loading worked with two repositories and an empty working directory. Startup took about 21 seconds for five searchable concepts. A missing public source prevented the server from starting even when it had a valid local bundle. For everyday use, I'd use local Git snapshots and make sync a separate operation.

| Concepts | Upstream warm p95 | Adapter warm p95 |
| --- | ---: | ---: |
| 1,000 | 4.66 ms | 4.73 ms |
| 10,000 | 53.07 ms | 37.50 ms |

The scale test used three fresh processes per size and mode. Memory varied at 5,000 and 10,000 concepts and reached several hundred MiB. These numbers describe the test environment and workload.

The Codex CLI accepted the stdio configuration, but its runtime exited before making an MCP call. The SDK tests verified the protocol and retrieval. They leave autonomous Codex tool use and the generated Spring Boot endpoint unverified. Private GitHub authentication was also untested. [Codex MCP configuration](https://developers.openai.com/codex/mcp)

## Alternatives

I also assessed GitNexus, Graphify and Sourcebot from their documentation. GitNexus and Graphify are built around code graphs. Sourcebot offers cross-repository search through a running deployment. For this use case, OKF lifecycle and provenance would need dedicated handling. The workspace contains the weighted rubric, including a custom OKF server as a design option. Only the upstream and adapter configurations ran on the judged corpus.

## Reproduction

Download and extract the [POC source ZIP](https://raw.githubusercontent.com/wilmarques/wilmarques.github.io/master/src/content/2026-11-06-local-okf-knowledge-server/sources/okf-knowledge-server-poc.zip). With Git and Node.js 22 or later installed, run these commands from the extracted workspace.

```bash
node scripts/bootstrap.mjs
npm test
npm run benchmark
npm run scale
```

The archive includes the fixture repositories, adapter, test harness, raw results and architecture decision. See `README.md` for the remote loader and Codex trials, `docs/benchmark-results.md` for the metric definitions and `docs/security-assessment.md` for the trust boundaries.

## Conclusion

I would use the adapter for a limited pilot with synthetic or explicitly authorized sources. For production, I'd first want better coverage on held-out compound queries, a real Codex endpoint run and a private GitHub pilot. I'd also verify the setup on macOS and Windows and put the snapshot and reviewer policies under explicit ownership.

Thanks!
