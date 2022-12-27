export const controlEnv = (env) => {
  switch (env) {
    case 'prod':
      return {
        url: 'https://serverest.dev/login',
        schema: '',
        timeout: 5000,
      };
    case 'homolog':
      return {
        url: 'https://swapi.dev/api/people/30',
        schema: '',
        timeout: 5000,
      };
    case 'dev':
      return {
        url: 'https://serverest.dev/',
        schema: '',
        timeout: 2000,
      };
    default:
      throw new Error('This env not exist');
  }
};
