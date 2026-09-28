---
name: writing-style
description: Write or rewrite blog posts in Wil Marques' personal writing style (as seen on dev.to/wilmarques and this blog)
argument-hint: "[path to post]"
allowed-tools:
  - read
  - edit
  - grep
  - glob
---

Write or rewrite the given blog post (or the file the user points to) in Wil Marques' writing style, described below. The reference is his articles at https://dev.to/wilmarques and `src/content/what-if-devin-on-my-phone.md` in this repo.

## Hard rules

- Keep every technical fact, command and output. Do not add new claims.
- Preserve code blocks and command outputs byte for byte.
- Keep the frontmatter (`title`, `slug`, `description`, `coverImage`) unchanged unless asked.
- Keep the post's language. Posts on this blog are in English; many dev.to posts are in Portuguese (pt-BR). The style is the same in both.
- If adding links to documentation, only use URLs you are confident about, and tell the user which ones you added.

## Voice

- Plain, direct and unpretentious. Someone who did the thing, explaining it to a colleague.
- Mostly "we" for walking through steps ("Let's check where we are", "Vamos começar..."), and "I" for personal choices and opinions ("I chose Fedora", "I expected some trouble here").
- No rhetorical flourishes, metaphors, hype or dramatic reveals. No "Here's the thing", "And just like that", "Poof", "That's where X comes in", "Let me walk you through".
- Understated. A result is stated, not celebrated.

## Sentences and paragraphs

- Short paragraphs, very often a single sentence.
- Short, literal sentences. One idea per sentence.
- Lists in prose use commas with "and" before the last item, no Oxford comma ("a filesystem, processes, users and a network stack").
- Few em-dashes. Prefer a period, a comma or parentheses.
- Very little bold. Italics for terms being introduced or light emphasis (*on* the phone, *nice*).

## Structure

- Open by stating plainly what the post is about or what will be done. For series, say which series and what it covers.
- Headings are plain nouns naming the topic or tool: "JDK", "Maven", "Termux", "proot-distro", "How it works", "Conclusion". No clever headings.
- Step-by-step flow, one step per paragraph:
  - Introduce commands with imperative phrases: "Run the following command:", "First, update Fedora:", "Then run...", "And log in:".
  - Introduce verification plainly: "To verify the installation, run the following commands:", "If everything is working, the result will be:" (pt-BR: "Caso esteja tudo funcionando, o resultado será o seguinte:").
- Use `>` blockquotes for side notes, caveats, aliases, version remarks and "this may differ for you" notes.
- Link generously to official docs and tools the first time they're mentioned.
- End with a `## Conclusion` (pt-BR: `## Conclusão`) that briefly recaps the result and, in series, points to the next article.
- Close with a short sign-off, e.g. a plain "Thanks!" or "Até o próximo artigo!". **This blog has no comment system — never ask readers to leave a comment here.** The "just drop a comment" / "escreva nos comentários" sign-off is only for platforms that have one (e.g. dev.to).

## Example (before / after)

Before:

> Here's the thing: the phone already *is* a computer. That's where **Termux** comes in. Install the app, open it, and you get a prompt.

After:

> Android runs on the Linux kernel. Technically, everything a coding agent needs is already there.
>
> What's missing is a terminal.
>
> For that, we have [Termux](https://termux.dev). It's a terminal emulator for Android, with a minimal Linux environment and its own package manager. No root required.
>
> Install the app, open it and run the following command:

## Process

1. Read the target post fully.
2. Rewrite it following the rules above, section by section, keeping the narrative order.
3. Diff mentally against the original: confirm every code block, output and fact survived.
4. Report to the user what changed in a few bullets, including any links added.
