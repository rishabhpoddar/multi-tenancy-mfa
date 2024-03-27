# Multi tenancy with MFA example

This app contains the following tenants with their authentication methods:
- Public tenant: Email password as first factor with OTP email as second factor
- Tenant 1: Google workspaces or email password as first factor with TOTP as second factor
- Tenant 2: Email password, with no second factor
- Tenant 3: GitHub or OTP email as first factor, with no second factor


## Running the example

```
npm install
npm run start
```

This will start the React app on `http://localhost:3000` and the Node Express server on `http://localhost:3001`.

## TODO:
- Export list of users
- Multiple frontends, same backend
- Security writeup

## cURL commands to create and configure tenants

This project relies on certain tenants to be created in the SuperTokens core. Below are the curl commands to create and configure the tenants.

```bash
curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "public",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": false,
    "passwordlessEnabled": true,
    "firstFactors": ["emailpassword"],
    "requiredSecondaryFactors": ["otp-email"]
}'

curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "tenant1",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": false,
    "firstFactors": ["emailpassword", "thirdparty"],
    "requiredSecondaryFactors": ["totp"]
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
    "passwordlessEnabled": false,
    "firstFactors": ["emailpassword"]
}'

curl --location --request PUT 'https://st-dev-56a99940-ebfe-11ee-8c0b-b794a0d529eb.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: rcnRppf7FlY-lKCTvUS39ZGQxW' \
--data-raw '{
    "tenantId": "tenant3",
    "emailPasswordEnabled": false,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": true,
    "firstFactors": ["thirdparty", "otp-email"]
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