export const controlEnv = () => {
  const envValue = String(Cypress.env('ENV'));

  if (envValue !== null && typeof envValue !== undefined && typeof envValue === 'string' && envValue === 'prod') {
    Cypress.env('api', 'https://wiizbeoq3c.execute-api.us-east-1.amazonaws.com/proxy/');
    Cypress.env('frontend', 'https://cf-banco-fidis-master-ui-ms8.digital.fcalatam.com.br');
  }
};
