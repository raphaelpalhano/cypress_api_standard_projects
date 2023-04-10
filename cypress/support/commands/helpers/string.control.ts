import { faker } from '@faker-js/faker';

Cypress.Commands.add('convertArrayBinaryToString', (bodyBinary: any, encondingType: any) => {
  const body = Cypress.Blob.arrayBufferToBinaryString(bodyBinary);
  const json = JSON.parse(Buffer.from(body, encondingType).toString());
  return json;
});

Cypress.Commands.add('decodeJWT', (encoded: string) => {
  const base64Url = encoded.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const buff = Buffer.from(base64, 'base64');
  const payloadinit = buff.toString('ascii');
  const payload = JSON.parse(payloadinit);
  return payload;
});

export const dataIncrement = (day: number, format: string) => {
  let formatToday: string;
  let today = new Date();
  today.setDate(today.getDate() + day);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  let yyyy = today.getFullYear();
  if (format.includes('-')) {
    formatToday = `${yyyy}${format}${mm}${format}${dd}`;
  } else {
    formatToday = `${dd}${format}${mm}${format}${yyyy}`;
  }

  return formatToday;
};

export const dataDecrease = (day: number, format: string) => {
  let today = new Date();
  today.setDate(today.getDate() - day);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  let yyyy = today.getFullYear();

  let formatToday = `${yyyy}${format}${mm}${format}${dd}`;

  return formatToday;
};

export function createInvoicesJson(numberInvoices: number) {
  const dateIncremented = dataIncrement(10, '-');
  const dateDecresed = dataDecrease(10, '-');
  const items = { items: [] };
  if (numberInvoices > 100 || numberInvoices <= 0) throw new Error('Numero de invoices incorreto!');
  for (let step = 0; step < numberInvoices; step++) {
    let installmentValue = faker.datatype.number({ min: 1, max: 100000 });
    let object: object = {
      assetType: 'DIREITOS_CREDITORIOS',
      externalId: faker.random.numeric(10).toString(),
      installment: installmentValue,
      invoiceDate: `${dateDecresed}`,
      invoiceKey: `NOTA${faker.datatype.number({ min: 1, max: 1000000000 }).toString()}`,
      invoiceNumber: `${faker.datatype.number({ min: 1, max: 1000000000 })}`,
      paymentDate: `${dateIncremented}`,
      realPaymentDate: `${dateIncremented}`,
      paymentValue: faker.datatype.number({ min: 10, max: 15 }),
      supplierGovernmentId: '79922720000164',
      supplierName: `FERRAMENTARIA JN LTDA`,
      totalInstallment: installmentValue,
    };
    items.items.push(object);
  }

  return JSON.stringify(items);
}

export function createFees(feesNumbers: number) {
  const taxes = { taxes: [] };

  for (let step = 0; step < feesNumbers; step++) {
    let day = step + 1;
    let value = faker.datatype.number({ min: 0.1, max: 999999 });

    let object = {
      days: day,
      value,
    };

    if (!taxes.taxes.includes(object)) {
      taxes.taxes.push(object);
    }
  }

  return JSON.stringify(taxes);
}

export function createUserJson() {
  const name = faker.name.fullName();
  let userJson = {
    createdByName: name,
    createdByEmail: `${name}@gmail.com`,
    createdByDocument: '',
    privacyPolicyAgree: true,
    governmentId: '46266214000105',
    corporateName: faker.company.name(),
    tradingName: 'tradingName2',
    establishment: '2023-01-01',
    cnae: '002',
    commercialPhone: '',
    contactName: '',
    isHeadquarter: true,
    headquarterGovernmentId: '',
    socialContract: {
      key: 'socialKey3',
      name: 'socialName3',
    },
    tradeMark: {
      key: 'tradeMark3',
      name: 'tradeName3',
    },
    address: {
      line: 'this is a test3',
      number: 'this is a test3',
      complement: '003',
      zipCode: 'this is a test3',
      city: 'this is a test3',
      district: 'this is a test3',
      state: 'this is a test3',
      uf: 'this is a test3',
      country: 'this is a test1',
    },
    legalEntities: [
      {
        name: 'legalEntityName3',
        document: '084320344505',
        phone: '5521999999903',
        email: 'email4@email.com',
        birthDate: '1975-01-01',
        role: 'a',
        identityDocument: {
          key: 'identityKey4',
          name: 'identityName4',
        },
        legalEntityComprobationDate: '2023-04-01',
        legalEntityComprobation: {
          key: 'comprobationKey4',
          name: 'comprobationName4',
        },
      },
    ],
    bankAccounts: [
      {
        bank: 'bank3',
        bankName: 'bankName3',
        alias: '',
        agency: 8,
        account: 903,
        accountDigit: 9,
        default: true,
      },
    ],
  };

  return JSON.stringify(userJson);
}
