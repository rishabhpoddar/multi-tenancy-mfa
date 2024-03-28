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

## Exporting list of users per tenant
There are two ways to see this list:
- You can view the list of users per tenant on the [user management dashboard](https://supertokens.com/docs/userdashboard/users-listing-and-details)
- You can call the [user pagination API / function](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/user-pagination) to get the list of users per tenant and then convert them to any format you like.

## Multiple frontends with the same backend
[This document](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/multiple-clients) shows you how you can configure the `origin` value dynamically on the backend based on the request's host header. This will automatically set the right cookie config so that the session tokens work correctly. One point to note is that if you want to use cookie based sessions and have the frontend be on a different base domain than the backend, then browsers like safari won't allow setting of cookies (since they reject third party cookies). To solve this, you would need to setup a CNAME in your DNS for your backend for each of the frontends such that the backend domain that that frontend queries is in the same base domain (example.com queries api.example.com). Alternatively, you could just use [header based sessions](https://supertokens.com/docs/session/common-customizations/sessions/token-transfer-method).

## Security

### Login security
- [Customizable password policy](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/signup-form/field-validators#changing-the-default-email-and-password-validators)
- Support for [Argon2 password hashing algorithm](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/password-hashing/argon2)
- Prevent [account takeover risk if enabled automatic account linking](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/account-linking/security-considerations)
- MFA via TOTP or email / sms OTP.
- Allowing you to add custom logic for implementing dynamic MFA based on risk score.
- TOTP rate limiting and account lockout for 15 mins after 5 failed attempts (configurable).
- Configurable password reset / email verification link / passwordless OTP / link lifetimes.
- Flexibility to allow you to use any third party / custom logic for spam detection, rate limiting, DDos protection.

### Session security:
- [Rotating refresh tokens for session theft detection](https://supertokens.com/docs/session/introduction#overview-of-session-flow)
- [Configurable session lifetime](https://supertokens.com/docs/session/common-customizations/sessions/change-session-timeout)
- [Automatic anti-csrf protection](https://supertokens.com/docs/session/common-customizations/sessions/anti-csrf)
- Use of HttpOnly, secure cookies to store session tokens.
- [Automatic signing key rotation](https://supertokens.com/docs/session/common-customizations/sessions/jwt-signing-key-rotation)
- [Access token blacklisting](https://supertokens.com/docs/session/common-customizations/sessions/access-token-blacklisting)


## cURL commands to create and configure tenants

This project relies on certain tenants to be created in the SuperTokens core. Below are the curl commands to create and configure the tenants.

```bash
curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
--data-raw '{
    "tenantId": "public",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": false,
    "passwordlessEnabled": true,
    "firstFactors": ["emailpassword"],
    "requiredSecondaryFactors": ["otp-email"]
}'

curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
--data-raw '{
    "tenantId": "tenant1",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": false,
    "firstFactors": ["emailpassword", "thirdparty"],
    "requiredSecondaryFactors": ["totp"]
}'

curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/tenant1/recipe/multitenancy/config/thirdparty' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
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


curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
--data-raw '{
    "tenantId": "tenant2",
    "emailPasswordEnabled": true,
    "thirdPartyEnabled": false,
    "passwordlessEnabled": false,
    "firstFactors": ["emailpassword"]
}'

curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/recipe/multitenancy/tenant' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
--data-raw '{
    "tenantId": "tenant3",
    "emailPasswordEnabled": false,
    "thirdPartyEnabled": true,
    "passwordlessEnabled": true,
    "firstFactors": ["thirdparty", "otp-email"]
}'


curl --location --request PUT 'https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io/tenant3/recipe/multitenancy/config/thirdparty' \
--header 'Content-Type: application/json' \
--header 'api-key: etb03yacD9WnwIC22o=MEy4J0V' \
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