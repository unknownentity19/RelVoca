> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Install the vf CLI

> Install the official RelVoca CLI with the install script, a manual download from GitHub releases, or go install. Verify with vf version.

The `vf` CLI ships as a single binary for macOS, Linux, and Windows. Every
release publishes signed archives and a `checksums.txt` on the
[releases page](https://github.com/voiceflow/cli/releases).

## Install script (macOS and Linux)

```bash theme={null}
curl -fsSL https://raw.githubusercontent.com/voiceflow/cli/master/scripts/install.sh | bash
```

The script downloads the latest release for your platform into
`/usr/local/bin` (or `~/.local/bin` when that is not writable). Set
`VF_VERSION` to pin a specific release:

```bash theme={null}
VF_VERSION=v0.135.0 curl -fsSL https://raw.githubusercontent.com/voiceflow/cli/master/scripts/install.sh | bash
```

## Install script (Windows PowerShell)

```powershell theme={null}
iwr -useb https://raw.githubusercontent.com/voiceflow/cli/master/scripts/install.ps1 | iex
```

## Manual download

Download the archive for your platform from the
[releases page](https://github.com/voiceflow/cli/releases), verify it against
`checksums.txt`, and place the `vf` binary on your `PATH`.

## Go install

With a Go toolchain installed:

```bash theme={null}
go install github.com/voiceflow/cli/cmd/vf@latest
```

## Verify the installation

```bash theme={null}
vf version
```

Prints the installed version, commit, and build date. Next, connect the CLI to
your account: [Authentication](/docs/cli/authentication).
