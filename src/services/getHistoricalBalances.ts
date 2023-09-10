// This is just an example, it is not expected from you to keep this function
// signature or even the file name. Feel free to change whatever you like.
interface Balance {
  date: Date;
  amount: number,
  currency: string,
}

interface Transaction {
  amount: number;
  currency: string;
  date: Date;
  status: string;
}

async function getBalance() {
  const response = await fetch('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balances', {
    method: 'GET',
    headers: {
      'x-api-key': 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json() as Balance;
}

async function getTransactions() {
  const response = await fetch('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions', {
    method: 'GET',
    headers: {
      'x-api-key': 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json() as Transaction[];
}

export function getHistoricalBalance() {

}
