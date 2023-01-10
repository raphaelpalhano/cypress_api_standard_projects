Cypress.Commands.add('routerGenerator', () => {
  const routers = {
    home: 'dashboard',
    forgotPass: 'forgot-password',
    firstAccess: 'first-access',
    integration: 'integrations',
    integration_create: 'integrations/create',
    enterprise_create: 'registrations/company',
    provider: 'registration',
  };

  for (const key in routers) {
    if (routers[key]) {
      Cypress.env(key, routers[key]);
    }
  }
});
