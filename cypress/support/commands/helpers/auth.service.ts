import { Amplify, Auth } from 'aws-amplify';

Cypress.Commands.add('getEntityId', function () {
  cy.decodeJWT(Cypress.env('ID_TOKEN')).then((body) => body['custom:entityId']);
});

const amplifyConfig = {
  Auth: {
    region: Cypress.env('AWS_AMPLYF').COGNITO_REGION,
    userPoolId: Cypress.env('AWS_AMPLYF').COGNITO_USER_POOL_ID,
    userPoolWebClientId: Cypress.env('AWS_AMPLYF').COGNITO_CLIENT_APP_ID,
    mandatorySignIn: false,
    signUpVerificationMethod: 'code',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

Amplify.configure(amplifyConfig);

// Amazon Cognito
Cypress.Commands.add('authSystem', (userType: 'supplier' | 'manager' | 'investor') => {
  const typesUsers = {
    supplier: {
      user: Cypress.env('USERS').USER_BACK_SUPPLIER,
      password: Cypress.env('USERS').SUPPLIER_PASS,
    },
    manager: {
      user: Cypress.env('USERS').USER_BACK_MANAGER,
      password: Cypress.env('USERS').MANAGER_PASS,
    },
    investor: {
      user: Cypress.env('USERS').USER_BACK_INVESTOR,
      password: Cypress.env('USERS').INVESTOR_PASS,
    },
  };

  const typeuser = typesUsers[userType];

  console.log(typeuser);

  cy.wrap(Auth.signIn(typeuser.user, typeuser.password)).then((response: any) => {
    Cypress.env('ID_TOKEN', response.signInUserSession.idToken.jwtToken);
    Cypress.env('COGNITO_TOKEN', response.signInUserSession.accessToken.jwtToken);
    Cypress.env('REFRESH_TOKEN', response.signInUserSession.refreshToken.token);
  });
});

Cypress.Commands.add('authSap', function (userType: 'supplier' | 'manager' | 'investor') {
  let typeUser;
  const typesUsers = {
    supplier: {
      user: Cypress.env('USERS').USER_BACK_SUPPLIER,
      password: Cypress.env('USERS').SUPPLIER_PASS,
    },
    manager: {
      user: Cypress.env('USERS').USER_BACK_MANAGER,
      password: Cypress.env('USERS').MANAGER_PASS,
    },
    investor: {
      user: Cypress.env('USERS').USER_BACK_INVESTOR,
      password: Cypress.env('USERS').INVESTOR_PASS,
    },
  };

  typeUser = typesUsers[userType];

  const headers = {
    Accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded',
  };

  const payload = `username=${typeUser.username}&password=${typeUser.password}&client_id=${typeUser.client_id}&client_secret=${typeUser.client_secret}`;

  // headers['x-amz-target'] = 'AWSCognitoIdentityProviderService.InitiateAuth';
  cy.requestWithBodyAndHeader('POST', `${Cypress.env('sapUrl')}auth/token`, payload, headers).then(function (token) {
    const tokenAcess = JSON.parse(token.body);
    Cypress.env('ID_TOKEN', tokenAcess.AuthenticationResult.IdToken);
    Cypress.env('COGNITO_TOKEN', tokenAcess.AuthenticationResult.AccessToken);
    Cypress.env('REFRESH_TOKEN', tokenAcess.AuthenticationResult.RefreshToken);
  });
});
