import { faker } from '@faker-js/faker';

const name = `${faker.name.firstName()} ${faker.name.lastName()}`;

export default {
  getEnterprise(loginType) {
    switch (loginType) {
      case 'valido':
        return {
          dataCompany: {
            cnpj: '16.701.716/0001-56',
            companyName: faker.company.name(),
            fantasyName: faker.company.suffixes()[2],
            fundationData: '2022-05-20',
            cnae: '1345678',
          },

          dataAta: '2022-10-18',
          address: {
            zipCode: '88106-102',
            number: '12',
            complement: 'casa',
          },
          responsible: {
            fullName: name,
            cpf: '519.892.830-55',
            birthData: '1994-04-18',
            cell: '489864-43712',
            email: 'rafa123@hotmail.com',
            qualification: 'Acionista',
          },
          attorneyValidity: '2024-03-19',
        };
      case 'empresa_invalido':
        return {
          dataCompany: {
            cnpj: '2344312',
            companyName: faker.company.name(),
            fantasyName: faker.company.suffixes()[2],
            fundationData: '2022-05-20',
            cnae: '1345678',
          },
          dataAta: '1999-02-15',
          address: {
            zipCode: '88106-102',
            number: '12',
            complement: 'casa',
          },
          responsible: {
            fullName: name,
            cpf: '519.892.830-55',
            birthData: '1995-04-19',
            cell: '489864-43712',
            email: 'rafa123@hotmail.com',
            qualification: 'Acionista',
          },
          attorneyValidity: '2024-03-18',
        };
      case 'endereco_invalido':
        return {
          dataCompany: {
            cnpj: '16.701.716/0001-56',
            companyName: faker.company.name(),
            fantasyName: faker.company.suffixes()[2],
            fundationData: '2022-05-20',
            cnae: '1345678',
          },
          dataAta: '2022-03-19',
          address: {
            zipCode: '88106-1',
            number: '12',
            complement: 'casa',
          },
          responsible: {
            fullName: 'Orlando',
            cpf: '099732',
            birthData: '2022-03-19',
            cell: '489862',
            email: 'rafa123@hotmail.com',
            qualification: 'Acionista',
          },
          validadeProc: '24/03/2024',
        };
      case 'responsavel_invalido':
        return {
          dataCompany: {
            cnpj: '16.701.716/0001-56',
            companyName: faker.company.name(),
            fantasyName: faker.company.suffixes()[2],
            fundationData: '2022-05-20',
            cnae: '1345678',
          },
          dataAta: '2022-05-13',
          address: {
            zipCode: '88106-102',
            number: '12',
            complement: 'casa',
          },
          responsible: {
            fullName: name,
            cpf: '519.892.830-55',
            birthData: '1995-05-09',
            cell: '(48) 9864-43712',
            email: 'rafa123@hotmail',
            qualification: 'Acionista',
          },
          attorneyValidity: '2019-04-12',
        };

      default:
        return { notfound: 'O login não foi encontrado!' };
    }
  },
};
