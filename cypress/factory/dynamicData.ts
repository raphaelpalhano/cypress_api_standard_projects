import { faker } from '@faker-js/faker';

export function integrationName() {
  return faker.internet.domainName();
}
