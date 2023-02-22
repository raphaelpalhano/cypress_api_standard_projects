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
    Cypress.env('AUTH_TOKEN', response.signInUserSession.accessToken.jwtToken);
    Cypress.env('REFRESH_TOKEN', response.signInUserSession.refreshToken.token);
  });
});

Cypress.Commands.add('authSap', function (userType: 'supplier' | 'manager' | 'investor' | 'integrator') {
  const typesUsers = {
    supplier: {
      user: Cypress.env('USERS').USER_BACK_SUPPLIER,
      password: Cypress.env('USERS').SUPPLIER_PASS,
    },
    manager: {
      user: Cypress.env('USERS').USER_SAP_MANAGER,
      password: Cypress.env('USERS').SAP_PASS,
    },
    investor: {
      user: Cypress.env('USERS').USER_BACK_INVESTOR,
      password: Cypress.env('USERS').INVESTOR_PASS,
    },
    integrator: {
      user: Cypress.env('USERS').USER_INTEGRATOR,
      password: Cypress.env('USERS').PASSOWRD_INTEGRATOR,
    },
    client_id: Cypress.env('AWS_AMPLYF').COGNITO_CLIENT_SAP,
    client_secret: Cypress.env('AWS_AMPLYF').CLIENTE_SECRET_SAP,
  };

  const typeUser = typesUsers[userType];

  console.log(typeUser);

  const params = {
    headers: {
      Accept: '*/*',
      'content-type': 'application/x-www-form-urlencoded',
    },
  };

  const body = {
    username: typeUser.user,
    password: typeUser.password,
    client_id: typesUsers.client_id,
    client_secret: typesUsers.client_secret,
  };
  // `username=${typeUser.username}&password=${typeUser.password}&client_id=${typesUsers.client_id}&client_secret=${typesUsers.client_secret}`;

  cy.requestFormUrlEncoded('POST', `${Cypress.env('sapUrl')}auth/token`, body, params).then(function (token) {
    console.log(JSON.stringify(token.body));
    const tokenAcess = token.body;
    Cypress.env('AUTH_TOKEN', tokenAcess.access_token);
    Cypress.env('REFRESH_TOKEN', tokenAcess.refresh_token);
    Cypress.env('EXPIRES_IN', tokenAcess.expires_in);
  });
});
