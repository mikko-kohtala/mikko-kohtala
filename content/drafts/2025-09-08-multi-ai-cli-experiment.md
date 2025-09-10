---
title: "Why Run Just One AI Tool When You Can Run Ten in Parallel?"
date: "2025-09-09"
description: "What happens when you run 10 AI coding assistants simultaneously? A deep dive into parallel AI workflows and surprising performance insights."
author: "Mikko Kohtala"
tags: ["ai", "cli", "development", "experimentation", "tools"]
coverImage: "/images/blog/2025-01-09-multi-ai-cli-experiment-cover.jpg"
---

What happens when you stop using AI tools sequentially and start running them in parallel? I've been conducting an experiment that fundamentally changed how I approach AI-assisted development.

Over the past few months, I've been deep in the AI tooling ecosystem—from chat apps and CLI tools to background agents and speech models. But the real breakthrough came when I stopped asking "which AI tool should I use?" and started asking "why not use them all at once?"

## The Parallel AI Experiment

Enter the MULTI-AI-CLI-TOOL-3000 (yes, the name is ridiculous, but the results aren't). This approach lets me run multiple AI CLI tools simultaneously on the same task. Here's how my development workflow has evolved:

1. **Isolated Environments**: Each feature gets its own sandbox via Git worktrees—no cross-contamination
2. **One-Command Setup**: Database, backend, and frontend spin up instantly in complete isolation
3. **Parallel AI Execution**: Multiple terminals, different AI tools, same prompt—let them race
4. **Natural Selection**: The best implementation wins and gets further refinement
5. **Rapid Integration**: Merge to main and move on to the next feature

## Real-World Example

Let me show you what this looks like in practice. Here's a recent prompt I sent to all tools simultaneously:

> "Add a settings panel to this SwiftUI macOS menubar app. In the settings panel, the user can select whether the app starts at login and whether it has a dock icon. Also, add an 'About' tab that shows an OIIA cat spinning. Update AGENTS.md, but keep it brief."

**The results were fascinating:**
- **Codex (GPT-5)**: Completed in 3 minutes, implemented launch-at-login correctly using SMAppService
- **Claude Code**: Took 4 minutes, created a more polished UI but missed the spinning animation
- **Gemini CLI**: Still working after 8 minutes, eventually produced broken Swift code

What's remarkable isn't just the speed difference—it's how each tool approaches the problem differently. Codex tends to be more methodical, Claude Code often produces cleaner code structure, and Gemini... well, Gemini tries.

## The Shifting Landscape

Two months ago, Claude Code dominated every test. It wasn't even close. Then GPT-5 arrived with Codex CLI, and suddenly the game changed.

After running this parallel workflow for 200+ tasks, here are the success rates:

| Tool | Model | Win Rate | Avg. Time | Notes |
|------|-------|----------|-----------|-------|
| **Codex** | GPT-5 (high reasoning) | 50% | 4-6 min | Best at complex logic, thorough testing |
| **Claude Code** | Opus 4.1 | 35% | 3-5 min | Excellent code quality, best documentation |
| **Others** | Various | 14.9% | 5-8 min | Occasional surprises, worth including |
| **Gemini CLI** | Gemini Pro | 0.1% | 8-12 min | Fast but struggles with implementation |

**Key Insights from the Data:**

- **Codex's Rise**: GPT-5's reasoning capabilities shine in complex, multi-step tasks. It's particularly strong when dealing with edge cases and error handling.
- **Claude's Consistency**: While no longer always winning, Claude Code produces the cleanest, most maintainable code. It's the tool I trust when code quality matters more than speed.
- **The Gemini Paradox**: Despite being cost-effective for API usage, Gemini struggles in CLI environments. It often misunderstands file structures or produces syntactically incorrect code.
- **The Dark Horses**: That 14.9% "Others" category includes some surprising wins from tools like Cursor and Aider, especially on refactoring tasks.

## Beyond the Numbers: What Really Matters

Running AI tools in parallel has taught me more than just which one "wins." It's revealed fundamental differences in how these systems think:

**Tool Architecture Matters as Much as Models**
- Context window management varies wildly between tools
- Some tools excel at file navigation, others at code generation
- The way tools handle errors and recovery can make or break a task

**The Human Element is Still Critical**
- Clear, detailed prompts improve all tools equally
- Understanding each tool's strengths lets you route tasks appropriately
- No tool handles ambiguity well—they won't read your mind (or lottery numbers)

**Speed Isn't Everything**
- The fastest completion often has subtle bugs
- Taking 2 extra minutes for better error handling saves hours later
- Documentation quality varies dramatically between tools

## What's Next?

This parallel approach isn't just an experiment anymore—it's become my default workflow. Here's where I see this heading:

**Short Term (Next Month)**
- Building automated scoring systems to remove human bias from comparisons
- Testing specialized models for specific languages (Rust vs. TypeScript vs. Python)
- Exploring ensemble approaches where multiple AIs collaborate on different parts

**Medium Term (3-6 Months)**
- Creating a meta-layer that automatically routes tasks to the best tool
- Developing metrics for code quality beyond just "does it work?"
- Open-sourcing the parallel execution framework

**The Bigger Picture**

We're moving toward a world where AI tools become specialized members of our development team. Just as you wouldn't ask your database expert to design your UI, we'll learn to leverage each AI's unique strengths.

The question isn't "which AI tool should I use?" anymore. It's "how can I orchestrate multiple AI tools to maximize both speed and quality?"

And honestly? Running ten terminals with different AIs racing to solve your problem is just plain fun. Science doesn't have to be boring.
