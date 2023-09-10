// This is just an example, it is not expected from you to keep this function
// signature or even the file name. Feel free to change whatever you like.
interface Balance {
  date: Date;
  amount: number,
  currency: string,
}

interface TransactionResponse {
  transactions: Transaction[];
}
interface Transaction {
  amount: number;
  currency: string;
  date: Date;
  status: string;
}

interface HistoricalBalance {
  date: Date;
  amount: number;
  currency: string;
}

export async function getBalance() {
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

export async function getTransactions() {
  const response = await fetch('https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions', {
    method: 'GET',
    headers: {
      'x-api-key': 'b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18'
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json() as TransactionResponse;
}

export async function getHistoricalBalance(from: Date, to: Date) {
  // input validation
  if (from > to) throw new Error("from cannot be greater than to");

  // get balance and list of all transactions sorted desc
  const balance = await getBalance();
  const transactions = (await getTransactions()).transactions.sort((t1,t2) => Number(new Date(t2.date)) - Number(new Date(t1.date)));
  console.log(transactions)
  // set currentBalance to amount of balance reponse
  // create empty Array for HistoricalBalance
  let currentBalance = balance.amount;
  let result: HistoricalBalance[] = [];

  // decrease transaction amounts from currentBalance
  for (let i=0; i < transactions.length; i++) {
    let currentTransaction = transactions[i];
    currentBalance -= currentTransaction.amount;

  // set time frame
  let currentTransactionDate = new Date(currentTransaction.date);
  let isInbetween = from <= currentTransactionDate && currentTransactionDate <= to;
  if (isInbetween) {
    let currentDayBalance = result.find(hBalance => isSameDay(hBalance.date, currentTransactionDate));
    if (!currentDayBalance) {
      currentDayBalance = {
        date: currentTransactionDate,
        amount: currentBalance,
        currency: currentTransaction.currency
      };
      result.push(currentDayBalance);
    }
    currentDayBalance.amount = currentBalance;
  }
}
return result;
}

function isSameDay(d1: Date, d2:Date) {
  return  d1.getUTCDate() === d2.getUTCDate() &&
          d1.getUTCMonth() === d2.getUTCMonth() &&
          d1.getUTCFullYear() === d2.getUTCFullYear();
}
