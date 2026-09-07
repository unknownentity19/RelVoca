> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspaces

> Organize projects and collaborate with your team.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/Workspaces.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=35b9e3c533dbd5139d44d4618994c4d0" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/Workspaces.png" />

A workspace is a container for your projects. Everyone you invite to a workspace can see all the projects inside it, so think of workspaces as team boundaries. Your plan determines how many workspaces you can create.

## Organizing your workspace

<video autoPlay={true} loop={true} muted={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/organizing-workspaces.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=257103112f0c68b1a161b9bacfa785c8" data-path="videos/organizing-workspaces.mp4" />

When you log in to RelVoca, you'll land on your workspace. You can organize projects into folders, and customize each project's icon, name, and description by hovering over it and clicking the three-dot menu. From there you can also export the project as a `.vf` file or share a clone link that lets others copy your agent.

To switch between workspaces, click your workspace name in the top left corner of the dashboard. From here, you can also create new workspaces.

## Inviting team members

In the **Members** section of your workspace, you can manage collaborators and permissions. You can invite people by entering their email address or by copying a magic link to share directly. Magic links expire after 72 hours.

When inviting someone, you choose their role. You can change a team member's role later from the same menu, though you can only assign roles at or below your own access level.

<video autoPlay={true} muted={true} loop={true} playsInline={true} className="w-full aspect-video" src="https://mintcdn.com/voiceflow-009a8802/s3P1FU2SwfLb9qjL/videos/collaborators.mp4?fit=max&auto=format&n=s3P1FU2SwfLb9qjL&q=85&s=c26f7ae06fa3c0a75cce9ae82c6110ca" data-path="videos/collaborators.mp4" />

### Roles

RelVoca workspaces have five different roles that users may be assigned to:

* **Owner** has full control over the workspace, including billing, settings, and member management. The person who creates a workspace is automatically its owner. On Enterprise plans, owners control all workspaces in the organization.
* **Admin** can do everything except transfer ownership. Admins manage workspace settings, invite and remove members, and edit all projects.
* **Editor** can build and publish agents, manage project settings, and import or export projects. Editors cannot invite new members or change workspace settings, and cannot publish to or merge into a [protected environment](/docs/documentation/deploy/environments/overview#environment-protection).
* **Viewer** can see projects and leave comments, but cannot make edits. Viewer seats are free and unlimited on all plans.
* **Billing** has the same access as a viewer, plus the ability to manage billing and subscription settings.

## Project-level permissions

By default, workspace members have the same access to every project. But you can give viewers or billing users edit access to specific projects without upgrading their workspace role.

To manage project access, hover over a project card, click the three-dot menu, and select **Manage access**. You can only add people who are already workspace members.

Keep in mind that viewers with project-level edit access count as editors for [billing purposes](/docs/documentation/account-management/billing).
