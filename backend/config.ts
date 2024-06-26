import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import AccountLinking from "supertokens-node/recipe/accountlinking"
import MultiFactorAuth from "supertokens-node/recipe/multifactorauth"
import TOTP from "supertokens-node/recipe/totp";
import EmailVerification from "supertokens-node/recipe/emailverification"

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // this is the location of the SuperTokens core.
        connectionURI: "https://st-dev-30506dd0-ed09-11ee-ad01-1fdc88939d81.aws.supertokens.io",
        apiKey: "etb03yacD9WnwIC22o=MEy4J0V",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init(),
        Passwordless.init({
            contactMethod: "EMAIL",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
        AccountLinking.init({
            shouldDoAutomaticAccountLinking: async () => {
                return {
                    shouldAutomaticallyLink: true,
                    shouldRequireVerification: true
                }
            }
        }),
        MultiFactorAuth.init(),
        TOTP.init(),
        EmailVerification.init({
            mode: "REQUIRED"
        }),
    ],
};
