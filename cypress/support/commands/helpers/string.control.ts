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

export const dataIncrement = (day: number) => {
  let today = new Date();
  today.setDate(today.getDate() + day);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  let yyyy = today.getFullYear();

  let formatToday = `${dd}/${mm}/${yyyy}`;

  return formatToday;
};
