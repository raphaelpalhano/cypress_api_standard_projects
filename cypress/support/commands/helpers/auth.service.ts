import { Amplify, Auth } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    region: Cypress.env('AWS_AMPLYF').COGNITO_REGION,
    userPoolId: Cypress.env('ENV') === 'prod' ? Cypress.env('AWS_AMPLYF').COGNITO_USER_POOL_ID_PROD : Cypress.env('AWS_AMPLYF').COGNITO_USER_POOL_ID,
    userPoolWebClientId: Cypress.env('ENV') === 'prod' ? Cypress.env('AWS_AMPLYF').COGNITO_CLIENT_APP_ID_PROD : Cypress.env('AWS_AMPLYF').COGNITO_CLIENT_APP_ID,
    mandatorySignIn: false,
    signUpVerificationMethod: 'code',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

Amplify.configure(amplifyConfig);

Cypress.Commands.add('getEntityId', function () {
  cy.decodeJWT(Cypress.env('ID_TOKEN')).then((body) => body['custom:entityId']);
});

// Amazon Cognito
Cypress.Commands.add('authSystem', (userType: 'supplier' | 'manager' | 'investor') => {
  const typesUsers = {
    supplier: {
      user: Cypress.env('USERS').USER_BACK_SUPPLIER,
      password: Cypress.env('USERS').PASS_BACK,
    },
    manager: {
      user: Cypress.env('USERS').USER_BACK_MANAGER,
      password: Cypress.env('USERS').PASS_BACK,
    },
    investor: {
      user: Cypress.env('USERS').USER_BACK_INVESTOR,
      password: Cypress.env('USERS').PASS_BACK,
    },
  };

  const typeuser = typesUsers[userType];

  if (Cypress.env('ENV') === 'prod') {
    switch (userType) {
      case 'supplier':
        typeuser.user = Cypress.env('USERS').USER_SUPPLIER_PROD;
        typeuser.password = Cypress.env('USERS').SUPPLIER_PROD_PASS;
        break;
      case 'manager':
        typeuser.user = Cypress.env('USERS').USER_MANAGER_PROD;
        typeuser.password = Cypress.env('USERS').MANAGER_PROD_PASS;
        break;
      case 'investor':
        typeuser.user = Cypress.env('USERS').USER_INVESTOR_PROD;
        typeuser.password = Cypress.env('USERS').INVESTOR_PROD_PASS;
        break;
      default:
        cy.log('Error AuthSystem', {
          userType,
        });
    }
  }

  console.log(typeuser);

  // if (Cypress.env('REFRESH_TOKEN')) {
  //   Auth.signOut();
  // }

  cy.wrap(Auth.signIn(typeuser.user, typeuser.password)).then((response: any) => {
    Cypress.env('ID_TOKEN', response.signInUserSession.idToken.jwtToken);
    Cypress.env('COGNITO_TOKEN', response.signInUserSession.accessToken.jwtToken);
    Cypress.env('REFRESH_TOKEN', response.signInUserSession.refreshToken.token);
  });
});

// Cypress.Commands.add('authSystem', function (userType: string) {
//   const typesUsers = {
//     supplier: Cypress.env('USERS').USER_BACK_SUPPLIER,
//     manager: Cypress.env('USERS').USER_BACK_MANAGER,
//     investor: Cypress.env('USERS').USER_BACK_INVESTOR,
//   };
//   const headers = {
//     authority: 'cognito-idp.us-east-1.amazonaws.com',
//     'content-type': 'application/x-amz-json-1.1',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'cross-site',
//     'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
//     'x-amz-user-agent': 'aws-amplify/5.0.4 js',
//   };
//   const body = {
//     AuthFlow: 'USER_PASSWORD_AUTH',
//     ClientId: 'o9od3jf3nqmfb0s8k8v3p1hcg',
//     AuthParameters: { USERNAME: '', PASSWORD: Cypress.env('USERS').PASS_BACK },
//     ClientMetadata: {},
//   };

//   for (const type in typesUsers) {
//     if (userType === type) body.AuthParameters.USERNAME = typesUsers[type];
//   }
//   if (Cypress.env('REFRESH_TOKEN')) {
//     const headerLogout = {
//       authority: 'cognito-idp.us-east-1.amazonaws.com',
//       'content-type': 'application/x-amz-json-1.1',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'cross-site',
//       'x-amz-target': 'AWSCognitoIdentityProviderService.RevokeToken',
//       'x-amz-user-agent': 'aws-amplify/5.0.4 js',
//     };

//     const bodyLogout = {
//       Token: Cypress.env('REFRESH_TOKEN'),
//       ClientId: body.ClientId,
//     };
//     let response = '';
//     cy.requestCognito('POST', Cypress.env('cognito'), JSON.stringify(bodyLogout), headerLogout).then(function (res) {
//       const respo = res;
//       console.log(respo);
//     });
//     console.log(response);
//   }
//   // headers['x-amz-target'] = 'AWSCognitoIdentityProviderService.InitiateAuth';
//   cy.requestCognito('POST', Cypress.env('cognito'), JSON.stringify(body), headers).then(function (token) {
//     const tokenAcess = JSON.parse(token.body);
//     Cypress.env('ID_TOKEN', tokenAcess.AuthenticationResult.IdToken);
//     Cypress.env('COGNITO_TOKEN', tokenAcess.AuthenticationResult.AccessToken);
//     Cypress.env('REFRESH_TOKEN', tokenAcess.AuthenticationResult.RefreshToken);
//   });
// });
