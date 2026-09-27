---
title: "What If... Devin Ran on My Phone?"
slug: 2026-09-27-what-if-devin-on-my-phone
description: First entry in the "What If" series — turning an Android phone into a pocket Linux computer with Termux and proot-distro, and running the Devin CLI on it.
coverImage: TODO-unsplash-url
---

<!--
SERIES NOTE: "What If..." — short experiments that start with a question.
Each post ends by handing the next question to the following episode.
-->

## The question

<!--
- Coding agents running away from the laptop is already common: a PC at home,
  a cloud VM, reached over SSH/tunnels, driven from anywhere.
- In all of those, the phone is just a remote control. The agent lives elsewhere.
- The question that started this: what if the agent lived *on* the phone?
- Set expectations: this is the first "What If" — an experiment, not a
  production recommendation.
-->

**Transition →** *But coding agents are built for computers. So the first problem wasn't the agent — it was the phone.*

## A computer that forgot it was one

<!--
- Coding agents expect a computer: a shell, a filesystem, a package manager.
- Twist: the phone already is one. Android runs on the Linux kernel.
- What's missing is the key interface for installing and running an agent:
  a terminal. Android hides it by default.
- Enter Termux: a terminal emulator (plus a small package ecosystem) for
  Android. No root required.
- Visual: screenshot of a fresh Termux session.
-->

**Transition →** *A terminal is a door, though — not a house. Termux doesn't grow a full Linux distribution out of Android's guts.*

## Moving a Linux distro into the phone

<!--
- Termux alone ≠ a regular Linux box: Android's userland, non-standard paths,
  tools that assume glibc/FHS don't just work.
- What we need is a (nearly) complete distro. Termux offers an elegant path:
  proot-distro.
- Quick explanation: proot fakes a root filesystem in user space — no real
  root, no VM. You get a real distro userland (here: Fedora 44, aarch64)
  with its own package manager (dnf).
- The "almost" in "almost a full distro": no systemd, no dbus — PID 1 is
  proot's init. Keep it to one sentence here; it foreshadows later episodes.
- Commands block: pkg install proot-distro / proot-distro install fedora /
  proot-distro login fedora.
- Evidence block (from notes): uname -m + /etc/os-release showing aarch64 +
  Fedora 44.
-->

**Transition →** *With a real distro in my pocket, the question stopped being "can it run?" and became "does it run Devin?"*

## Installing Devin, poof

<!--
- Inside Fedora: dnf upgrade, then the Devin CLI installer, then login.
  Commands (from notes §0):
    dnf upgrade --refresh -y
    curl -fsSL https://cli.devin.ai/install.sh | bash
    devin auth login
- The anticlimax is the point: three commands and it's done. "Poof."
- Visual: Devin CLI running in Termux, answering a first prompt on the phone.
- Optional beat: first real task done from the phone (e.g. dnf install git gh,
  gh auth login, clone a repo).
-->

**Transition →** *It works. But a coding agent inside a terminal, on a 6-inch touchscreen, with a soft keyboard...*

## What if... (next episode)

<!--
- Honest wrap-up: it runs, but typing into a terminal on a phone is painful.
- Hand off the next question: what if I could talk to it through a real
  mobile app instead of a terminal? -> Ferngeist + ACP gateway (next post).
- Optional recursion teaser: Devin set up its own mobile client.
-->
