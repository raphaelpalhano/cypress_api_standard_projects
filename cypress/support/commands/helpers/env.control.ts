export const controlEnv = () => {
  const envValue = String(Cypress.env('ENV'));

  if (envValue !== null && typeof envValue !== undefined && typeof envValue === 'string' && envValue === 'prod') {
    Cypress.env('api', 'https://wiizbeoq3c.execute-api.us-east-1.amazonaws.com/proxy/');
  }
};
