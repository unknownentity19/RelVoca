> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secrets

> Securely store sensitive information.

<img src="https://mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/Secrets.png?fit=max&auto=format&n=BH9pjWm_sH9INCep&q=85&s=066897a966b0960ab220041076f1c516" alt="Cover Placeholder" width="1920" height="1080" data-path="images/steps/Secrets.png" />

Secrets let you securely store sensitive information like API keys, database credentials, and encryption keys. Unlike variables, secret values are encrypted and hidden from view, keeping your credentials safe while still allowing your agent to use them.

## Creating secrets

You can create and manage secrets in **Settings** → **Secrets**. Click **New Secret** in the top right to create one.

When creating a secret, you'll provide a name, value, and visibility setting:

* **Masked** secrets are hidden by default but can be temporarily revealed by clicking on them.
* **Restricted** secrets cannot be revealed after creation. Use this for highly sensitive credentials.

You can also create secrets inline while building. Type `{` in any input field, switch to the **Secrets** tab in the dropdown, then click **Create Secret** at the bottom.

## Using secrets

Secrets work like variables but are accessed from a separate tab. In any input field within a [tool](/docs/documentation/build/tools/api-tool), type `{` to open the dropdown, then switch to the **Secrets** tab and select the secret you need.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Screenshot2026-02-17at4.49.22PM.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=65f3e09ef4bf958c07b3d42494289c7d" alt="Screenshot2026 02 17at4 49 22PM" width="1490" height="982" data-path="images/Screenshot2026-02-17at4.49.22PM.png" />
</Frame>

## Managing secrets

To edit or delete a secret, click the three dots menu next to it. For masked secrets, you can also copy the value to your clipboard. Restricted secrets cannot be copied or revealed.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/sQXqOXyzFR_wI2F3/images/CleanShot-2026-06-16-at-19.16.31@2x.png?fit=max&auto=format&n=sQXqOXyzFR_wI2F3&q=85&s=c7f0deacd1bda76c572971b2f5eeee6d" alt="Clean Shot 2026 06 16 At 19 16 31@2x" width="2088" height="466" data-path="images/CleanShot-2026-06-16-at-19.16.31@2x.png" />
</Frame>

## Secrets across environments

Secrets are project-wide. The values you set in **Settings** → **Secrets** are the defaults for every [environment](/docs/documentation/deploy/environments) in your project, including `Main`, and any change applies across all of them immediately.

## Overrides and merging

Because [merges](/docs/documentation/deploy/environments/merging) replace the content of `Main`, when you merge an environment to main, its secret overrides are also applied to `Main`. If you've been testing with non-production credentials, such as a development API key, we recommend you remove the live secrets override prior to merging to prevent your live agent being connected to non-production APIs.

To give one environment a different value, set a per-environment **override**. Open **Settings** → **Environments**, open the `...` menu next to the environment, and select **Override live secrets** or **Override draft secrets**. An override applies only to that environment's draft or live version. It never changes the project-wide default or affects any other environment, and secrets without an override fall back to the default.

<Frame>
  <img src="https://mintcdn.com/voiceflow-009a8802/NHpRp09zo70gXfwC/images/Secrets---override.png?fit=max&auto=format&n=NHpRp09zo70gXfwC&q=85&s=78666bb6a0cd528dab343579b2277026" alt="Secrets Override" width="3012" height="934" data-path="images/Secrets---override.png" />
</Frame>

## Duplicating and exporting projects

When you duplicate or export a project, only secret names are included. Secret values are never copied for security reasons. After importing a duplicated project, you'll need to re-enter the secret values in **Settings** → **Secrets**.

## Security

Secrets are encrypted using AES-256 GCM, which provides both confidentiality and integrity protection through a Message Authentication Code (MAC). Encryption keys are securely managed and secrets are stored and transmitted according to industry best practices.
