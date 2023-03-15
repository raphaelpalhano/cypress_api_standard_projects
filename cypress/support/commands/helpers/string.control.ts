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
