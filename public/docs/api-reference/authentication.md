> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Personal access tokens

> Create a personal access token in Settings, send it as a Bearer token, and pass the project and environment your request should run against.

Every request to the RelVoca API carries a **personal access token**. The
same token authenticates the REST API, the `vf` CLI, and optionally the MCP
server, so there is one credential to create and one to rotate.

## Create a token

Open **Settings** → **Access tokens** and choose **Create personal access
token**. Give it a name you will recognise later and pick how long it should
last.

<Warning>
  The token is shown once, at creation. After you close the dialog only a
  masked version is visible, so store it somewhere durable before you leave the
  page.
</Warning>

A token looks like this, and always begins with `vfp_`:

```text theme={null}
vfp_a1b2c3d4_e5f6g7h8i9j0k1l2m3n4o5p6
```

### Expiry

Tokens expire. You choose the lifetime when you create one:

| Option      | Lifetime          |
| ----------- | ----------------- |
| In a day    | 1 day             |
| In a week   | 7 days            |
| In a month  | 30 days (default) |
| In 3 months | 90 days           |
| In a year   | 365 days          |

There is no non-expiring option, so any long-running integration needs a
calendar reminder to issue a replacement before the current token lapses.

### What a token can reach

A personal access token acts as **you**. It carries the same access your own
account has, across every workspace you belong to, and cannot be narrowed to a
single workspace or project.

Two consequences worth planning around:

* Treat a token like a password. Anyone holding it can do anything you can do.
* Tokens can only be created through the dashboard, so a person has to issue and
  rotate the one your automation uses.

## Send the token

Pass it in the `Authorization` header as a Bearer token:

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/workspace" \
  -H "Authorization: Bearer $VF_PAT"
```

## Target a project and environment

Most endpoints act on one project, and many act on one environment inside it.
Both are query parameters rather than path segments:

```bash theme={null}
curl "https://realtime-api.voiceflow.com/v1/stable/function?projectID=$VF_PROJECT_ID&environmentAlias=main" \
  -H "Authorization: Bearer $VF_PAT"
```

Find `projectID` in **Settings** → **General** under Metadata.

`environmentAlias` names an [environment](/docs/documentation/deploy/environments)
in that project. New projects start with a single environment called `main`.
Passing an alias the project does not have returns:

```json theme={null}
{ "statusCode": 400, "message": "invalid environment tag" }
```

List the aliases a project actually has with
[List environments](/docs/api-reference/environment/list-environments).

## Revoke a token

Delete it from **Settings** → **Access tokens**. Revocation takes effect
immediately, so anything using that token stops working the moment you remove
it. Issue and deploy the replacement first.
