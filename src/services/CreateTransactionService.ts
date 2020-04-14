import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: RequestDTO): Transaction {
    const newTransaction = new Transaction(data);

    if (newTransaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < newTransaction.value) {
        throw Error('Valor de saida maior que o de em caixa');
      }
    }

    return this.transactionsRepository.create(newTransaction);
  }
}

export default CreateTransactionService;
