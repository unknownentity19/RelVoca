> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Authenticate the vf CLI

> Authenticate the vf CLI with the VF_TOKEN environment variable, the token flag, or an interactive login, and check what is configured with vf auth whoami.

The CLI resolves credentials from three sources, in priority order: the global
`--token` flag, the `VF_TOKEN` environment variable, and credentials stored
locally by an interactive login.

## Interactive login

```bash theme={null}
vf auth login
```

Walks you through configuring credentials interactively. All fields are
optional, press Enter to skip any field you don't need.

## Check who you are

```bash theme={null}
vf auth whoami
```

Shows which credential source is configured (flag, environment variable,
keychain, or config file), with the token masked. Also available as the
top-level alias `vf whoami`.

`whoami` runs entirely offline. It does not validate the token against the
API, so for a live check run a real command such as `vf workspace list`.

## Sign out

```bash theme={null}
vf auth logout
```

Clears all stored credentials.

## Non-interactive use (CI and coding agents)

The CLI reads the `VF_TOKEN` environment variable natively, so there is no
login step and nothing stored on disk:

```bash theme={null}
export VF_TOKEN=vfp_...
vf workspace list --output-format json
```

Every command also accepts the token directly with the global `--token` flag:

```bash theme={null}
vf workspace list --token "$VF_TOKEN"
```

Store the token as a secret in your CI provider. Never commit it: the token
grants the same access as your account. Full flag reference:
[vf auth](/docs/cli/commands/auth).
