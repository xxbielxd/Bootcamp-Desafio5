import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface Accumulator {
  value: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /* Na minha opnião ficou muito mais simples, mas pediram pra usar o reduce
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.map((transaction)=>{
      if(transaction.type == "income"){
        income += transaction.value;
      }else if(transaction.type == "outcome"){
        outcome += transaction.value;
      }
      total += transaction.value;

    }); */

    // Demorei uns 40 minutos pra chegar a essa solução
    const reducerIcome = (accumulator: Balance, currentValue: Transaction) => {
      const income =
        currentValue.type === 'income'
          ? accumulator.income + currentValue.value
          : accumulator.income;
      const outcome =
        currentValue.type === 'outcome'
          ? accumulator.outcome + currentValue.value
          : accumulator.outcome;
      const total =
        currentValue.type === 'income'
          ? accumulator.total + currentValue.value
          : accumulator.total - currentValue.value;
      return {
        income,
        outcome,
        total,
      };
    };
    return this.transactions.reduce(reducerIcome, {
      income: 0,
      outcome: 0,
      total: 0,
    });
  }

  public create(transaction: Transaction): Transaction {
    console.log(this.getBalance());
    if (
      transaction.type === 'outcome' &&
      this.getBalance().total < transaction.value
    ) {
      throw Error("You don't have money for this transaction");
    }
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
