## cURL commands to create and configure tenants

This project relies on certain tenants to be created in the SuperTokens core. Below are the curl commands to create and configure the tenants.

```bash
curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "tenant1",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": false
}'

curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/tenant1/recipe/multitenancy/config/thirdparty' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
  "config": {
    "thirdPartyId": "google-workspaces",
    "name": "Google Workspaces",
    "clients": [
      {
        "clientId": "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
        "clientSecret": "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",
        "additionalConfig": {
            "hd": "*"
        }
      }
    ]
  }
}'


curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "tenant2",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": false,
    "passwordlessEnabled": false
}'

curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "tenant3",
    "emailPasswordEnabled": false,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": true
}'


curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/tenant3/recipe/multitenancy/config/thirdparty' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
  "config": {
    "thirdPartyId": "github",
    "name": "GitHub",
    "clients": [
      {
        "clientId": "467101b197249757c71f",
        "clientSecret": "e97051221f4b6426e8fe8d51486396703012f5bd"
      }
    ]
  }
}'
```