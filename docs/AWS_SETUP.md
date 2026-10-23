# Future AWS deployment template

AWS deployment is postponed. This repository retains Terraform definitions and
Python cloud adapters for a future account plan that supports the necessary
IAM/OIDC setup. The active GitHub Actions workflow performs CI and Terraform
validation only; it does not plan, apply or destroy AWS resources.

Before reactivating cloud deployment:

1. Review costs and budget controls. Alerts are not spending caps.
2. Choose a region and update all template references. The current Terraform
   default is `us-east-1`; the account owner mentioned Sydney (`ap-southeast-2`)
   as a future preference, but no region migration has been performed.
3. Create a private, encrypted, versioned S3 state bucket in that region.
4. Configure a GitHub OIDC role scoped to this repository and protected
   `planning` and `production` environments. Avoid long-lived AWS keys.
5. Review and restore a gated plan/apply workflow, set an alert email, inspect
   the Terraform plan and approve only expected, affordable resources.
6. After deployment, run `python scripts/verify_project.py --api-url <endpoint>`,
   verify the frontend and record real costs and service evidence.

The public demo uses shared metadata if the cloud API is ever enabled. Add
authentication, per-user authorization, restricted CORS and abuse protection
before storing private data.

References: [AWS OIDC setup](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html),
[S3 state guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/backend.html).
