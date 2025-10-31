# 🤖 VibeCoder Agent Architecture

## Overview

VibeCoder operates as a **multi-agent orchestration system** where each autonomous unit (Agent) specializes in a specific cognitive role within the development lifecycle.

The goal is not just to automate tasks but to **simulate collaboration** between virtual engineers that can plan, execute, review, deploy, and improve software autonomously.

---

## 🧠 Core Agents

### 1. Planner Agent
**Role:** Interprets `PROJECT.md` to derive a roadmap of executable tasks.

**Responsibilities:**
- Parse project vision and objectives.
- Identify deliverables and milestones.
- Generate structured task definitions (title, description, driver, priority).
- Update the task graph as new insights appear.

**Drivers used:** Claude, GPT‑4o, or any reasoning-capable model.

---

### 2. Engineer Agent
**Role:** Implements code modifications required for each task.

**Responsibilities:**
- Generate or modify code following best practices.
- Create branches and commits.
- Open pull requests for review.
- Respect task locks to prevent file conflicts.

**Drivers used:** Codex CLI, Claude, GPT‑4o‑mini.

---

### 3. Reviewer Agent
**Role:** Ensures the quality and coherence of produced code.

**Responsibilities:**
- Review pull requests.
- Evaluate diffs for consistency and performance.
- Request changes or approve and trigger merge.
- Score tasks based on quality feedback.

**Drivers used:** GPT‑4o, local lint/test runners.

---

### 4. Deployer Agent
**Role:** Handles the deployment and environment monitoring.

**Responsibilities:**
- Trigger deployments (Coolify, AWS Amplify, Vercel…).
- Collect build and runtime logs.
- Report deployment results.
- Notify the Fixer agent if errors occur.

**Drivers used:** Coolify API, Amplify API, custom shell drivers.

---

### 5. Fixer Agent
**Role:** Analyzes failures and generates corrective actions.

**Responsibilities:**
- Read failing logs or exceptions.
- Identify the probable cause and solution.
- Create a new task for the Engineer to implement the fix.
- Escalate to humans if the issue is beyond scope.

**Drivers used:** GPT‑4o, error pattern databases.

---

### 6. Historian Agent
**Role:** Maintains a knowledge base of past decisions and outcomes.

**Responsibilities:**
- Record task history and outcomes.
- Summarize learnings and architectural decisions.
- Store vectorized embeddings for semantic recall.
- Feed insights to the Planner to refine future iterations.

**Drivers used:** GPT‑4o‑mini, pgvector, internal summarizers.

---

## 🔁 Agent Collaboration Loop

```
Planner → Engineer → Reviewer → Deployer → Fixer → Historian → Planner
```

Each agent writes to a shared database (`projects`, `tasks`, `runs`, `deployments`, `journal`) to ensure state consistency.  
The orchestrator supervises this loop, enforcing task locks and dependency sequencing.

---

## ⚙️ Concurrency & Locking

- Tasks are assigned unique branches.
- File‑level locks prevent overlapping modifications.
- PR auto‑merge only if no conflicts detected.
- Failed merges generate reconciliation tasks.

---

## 🔐 Security & Isolation

Each agent runs in a sandboxed container with:
- Limited filesystem access.
- Per‑task environment variables.
- Execution timeouts.
- Audit logs stored in `runs`.

---

## 🧩 Extending Agents

To create a new agent:

1. Add a folder in `packages/agents/<agent-name>`  
2. Export a `run()` method that accepts `TaskContext` and returns `AgentResult`.  
3. Register it in the orchestrator under `/apps/orchestrator/src/agents/registry.ts`.

Example:

```ts
export const ExampleAgent: Agent = {
  name: "example",
  async run(ctx) {
    const result = await ctx.driver.run("Implement example behavior");
    return { ok: true, output: result };
  },
};
```

---

## 📊 Future Extensions

- **Negotiation protocols:** allow agents to debate conflicting strategies.  
- **Distributed execution:** run agents across nodes for scalability.  
- **Self‑evaluation:** meta‑agent that scores agent performance over time.  
- **Plugin store:** community‑built drivers and behaviors.

---

## 🧭 Philosophy

> *A single model can write code. A team of models can build systems.*  
> VibeCoder treats AI agents not as tools, but as collaborators within a shared creative loop.