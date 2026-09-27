---
title: "What If... Devin Ran on My Phone?"
slug: 2026-09-27-what-if-devin-on-my-phone
description: First entry in the "What If" series — turning an Android phone into a pocket Linux computer with Termux and proot-distro, and running the Devin CLI (or any coding agent) on it.
coverImage: /images/what-if-devin-on-my-phone.svg
---

*This is the first post of a series I'm calling **What If...** — small experiments that start with a slightly unreasonable question and end wherever the terminal takes me.*

---

## The question

Coding agents have already left the laptop. You see it everywhere: an agent running on a spare PC at home, or on a cloud VM, reached over SSH or a tunnel and driven from anywhere — including from a phone.

But in every one of those setups, the phone is just a remote control. The agent lives somewhere else.

So I asked myself: **what if the agent lived *on* the phone?** No home server, no VM. Just the device in my pocket, running a coding agent by itself.

It's an experiment, not a recommendation. But it turned out to be a surprisingly short path.

The first problem, though, wasn't the agent. Coding agents are built for computers. So I needed to turn my phone into one.

---

## A computer that forgot it was one

Here's the thing: the phone already *is* a computer. Android runs on the Linux kernel. There's a filesystem, processes, users, a network stack — everything a coding agent needs is technically there.

What Android doesn't give you is the one interface a coding agent actually lives in: **a terminal**. No shell, no package manager, no way to `curl` an installer and run it. The Linux is there, it's just hidden behind icons.

That's where **[Termux](https://termux.dev)** comes in. Termux is a terminal emulator for Android that ships with a minimal Linux environment and its own package manager — no root required. Install the app (from F-Droid or its GitHub releases), open it, and you get a prompt:

```console
~ $ pkg upgrade && pkg update -y
```

That's the first command I ran. From here, the phone finally behaves like what it is: a small Linux box with a very nice screen.

But a terminal is a door, not a house. Termux gives you a shell and a curated set of packages built specifically for Android — it doesn't grow a full Linux distribution out of Android's guts. And a coding agent expects a regular Linux: standard paths, a standard C library, a standard package manager.

---

## Moving a Linux distro into the phone

For that, Termux has a very elegant answer: **[proot-distro](https://github.com/termux/proot-distro)**.

`proot` is a user-space trick: it intercepts a program's system calls and rewrites file paths on the fly, so a directory full of files looks like a complete root filesystem (`/`) to everything running inside it. No real root, no virtual machine, no emulation — processes run natively on the phone's CPU and on Android's own kernel. They just *believe* they're in a regular distro.

`proot-distro` wraps that trick into a package manager for whole distributions. Installing it is one line in Termux:

```console
~ $ apt install -y proot-distro
```

Running `proot-distro install` with no arguments lists the distributions you can pick. I went with Fedora:

```console
~ $ proot-distro install fedora:latest
~ $ proot-distro login fedora
```

(Later on, I just used the short alias: `pd login fedora`.)

And just like that, the prompt changes. Let's ask where we are:

```console
[root@localhost ~]# uname -a
Linux localhost 6.17.0-PRoot-Distro #1 SMP PREEMPT_DYNAMIC Fri, 10 Oct 2025 00:00:00 +0000 aarch64 GNU/Linux
```

```console
[root@localhost ~]# cat /etc/os-release | head -5
NAME="Fedora Linux"
VERSION="44 (Container Image)"
RELEASE_TYPE=stable
ID=fedora
VERSION_ID=44
```

Fedora 44, on an `aarch64` CPU, inside a phone. With `dnf`, with `/usr/bin`, with everything a regular Linux has.

Well — *almost* everything. There's no real init system here. `systemctl` exists, but there's nothing for it to talk to:

```console
[root@localhost ~]# systemctl is-system-running
offline
```

No systemd, no services, no dbus. That's the "almost" in "almost a complete distro", and it will matter in future episodes. For today, it doesn't: a coding agent CLI is just a program you run in a shell.

And the phone doesn't forget it's a phone, either. Android is still right there, leaking through the environment:

```console
[root@localhost ~]# echo $ANDROID_ROOT
/system
[root@localhost ~]# echo $PROOT_L2S_DIR
/data/data/com.termux/files/usr/var/lib/proot-distro/containers/fedora/rootfs/.l2s
```

A Fedora living inside a Termux directory, inside Android. With a real distro in my pocket, the question stopped being *"can a phone run Linux?"* and became *"does it run Devin?"*

---

## Installing Devin, poof

This is the part where I expected trouble. There wasn't any.

First, bring Fedora up to date:

```console
[root@localhost ~]# dnf upgrade --refresh -y
```

Then the exact same installer you'd use on a laptop:

```console
[root@localhost ~]# curl -fsSL https://cli.devin.ai/install.sh | bash
```

Then log in:

```console
[root@localhost ~]# devin auth login
```

That's it. Let's check:

```console
[root@localhost ~]# devin --version
devin 3000.10.31 (b98cc431)
```

```console
[root@localhost ~]# devin auth status
Logged in (via Devin).

Credentials:
  File:              /root/.local/share/devin/credentials.toml
  API server:        https://server.codeium.com
  Devin webapp:      https://app.devin.ai
  Devin API:         https://api.devin.ai
```

```console
[root@localhost ~]# devin doctor
...
1 check(s): 1 passed, 0 warning(s), 0 failure(s)
```

And the real test — asking Devin itself where it is, and making it check instead of guessing:

```console
[root@localhost notes]# devin -p -- "In one short sentence: what OS and CPU architecture are you running on? Check with a command, don't guess."
I'm running on Fedora Linux 44 (a PRoot container reporting kernel 6.17.0) on an aarch64 (ARM64) CPU.
```

Poof. A coding agent, running on my phone, aware that it's running on my phone.

From there it's just a Linux machine with an agent on it. The usual developer kit is one `dnf` away:

```console
[root@localhost ~]# dnf install git gh -y
[root@localhost ~]# gh auth login
```

Clone a repo, open `devin` in it, and start working — no home server, no VM, nothing but the phone.

### Not just Devin

Nothing in this setup is specific to Devin. Once the phone is running a real Linux distro, it's just an `aarch64` Linux box — so **any coding agent that runs on Linux ARM64 works the same way**: Claude Code, opencode, Codex CLI, Gemini CLI, whatever your agent of choice is. Use its regular Linux installer (or `npm`, since Node is one `dnf install nodejs` away), log in, and you're done.

Termux and proot-distro do the hard part: they turn the phone into a computer. Which agent you run on it is up to you.

---

## What if... (next episode)

So: it works. Devin runs on my phone, natively, inside a Fedora that lives inside Termux that lives inside Android.

But let's be honest about the experience. A coding agent in a terminal, on a 6-inch touchscreen, with a soft keyboard that covers half the output... it works, but it's not *nice*. Terminals were designed for keyboards and big screens, not thumbs.

Which leads to the next question: **what if I didn't have to use the terminal at all?** What if a real mobile app could talk to the Devin running on the same phone?

Tune in for the next episode of *What If*.
