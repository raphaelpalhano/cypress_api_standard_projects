import { faker } from '@faker-js/faker';

export default {
  typesIntegrations(type: string) {
    switch (type) {
      case 'url_valid':
        return {
          name: faker.internet.domainName(),
          credentials: [
            {
              type: 'URL',
              key: 'uri',
              value: 'https://docsign.com',
            },
          ],
        };
      case 'url_invalid':
        return {
          name: faker.internet.domainName(),
          credentials: [
            {
              type: 'UR',
              key: 'uri',
              value: 'https://docsign',
            },
          ],
        };
      case 'text_valid':
        return {
          name: faker.internet.domainName(),
          credentials: [
            {
              type: 'TEXT',
              key: 'phrase',
              value: faker.random.words(),
            },
          ],
        };
      case 'text_invalid':
        return {
          name: faker.internet.domainName(),
          credentials: [
            {
              type: 'TEX',
              key: 'phrase',
              value: '',
            },
          ],
        };

      case 'date_valid':
        return {
          name: faker.internet.domainName(),
          credentials: [
            {
              type: 'DATE',
              key: 'datevalid',
              value: faker.date.future,
            },
          ],
        };

      default:
        return { notfound: 'O type foi encontrado!' };
    }
  },
};
