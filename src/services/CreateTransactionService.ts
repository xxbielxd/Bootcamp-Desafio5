import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    const { title, value, type } = data;
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
