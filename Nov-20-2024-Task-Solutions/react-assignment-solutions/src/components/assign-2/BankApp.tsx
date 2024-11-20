import React, { useReducer, useState } from 'react';
import './BankApp.css';

type TransactionType = 'DEPOSIT' | 'WITHDRAW';
type TransactionCategory = 'salary' | 'bills' | 'shopping' | 'savings' | 'other';

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  date: string;
}

type ActionType =
  | { type: 'ADD_TRANSACTION'; payload: Omit<Transaction, 'id' | 'date'> }
  | { type: 'UNDO_LAST' };

interface BankState {
  balance: number;
  transactions: Transaction[];
  error: string | null;
}

const initialState: BankState = {
  balance: 0,
  transactions: [],
  error: null,
};

const bankReducer = (state: BankState, action: ActionType): BankState => {
  console.log('Dispatched action========>:', action);
  console.log('Current state before reduction:', state);

  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const { type, amount, category } = action.payload;
      const newBalance = type === 'DEPOSIT' ? state.balance + amount : state.balance - amount;

      if (type === 'WITHDRAW' && amount > state.balance) {
        console.warn('Insufficient funds for withdrawal:', amount);
        return { ...state, error: 'Insufficient funds' };
      }

      const newTransaction: Transaction = {
        id: Date.now(),
        type,
        amount,
        category,
        date: new Date().toLocaleDateString(),
      };

      const newState = {
        balance: newBalance,
        transactions: [newTransaction, ...state.transactions],
        error: null,
      };

      console.log('-----New state after addition:-------', newState);
      return newState;
    }
    case 'UNDO_LAST': {
      if (state.transactions.length === 0) {
        console.warn('No transactions to undo');
        return state;
      }

      const lastTransaction = state.transactions[0];
      const newBalance =
        lastTransaction.type === 'DEPOSIT'
          ? state.balance - lastTransaction.amount
          : state.balance + lastTransaction.amount;

      const newState = {
        balance: newBalance,
        transactions: state.transactions.slice(1),
        error: null,
      };

      console.log('New state after undo:', newState);
      return newState;
    }
    default:
      return state;
  }
};

const BankApp: React.FC = () => {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<TransactionCategory>('other');

  const handleTransaction = (type: TransactionType) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      console.warn('Invalid amount input:', amount);
      return;
    }

    // console.log('Adding transaction:', { type, amount: numAmount, category });
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: { type, amount: numAmount, category },
    });
    setAmount('');
  };

  const categoryOptions: TransactionCategory[] = [
    'salary',
    'bills',
    'shopping',
    'savings',
    'other',
  ];

  console.log('Current state:', state);

  return (
    <>
      <div className="bank-app">
        <div className="balance-section">
          <h2>Current Balance</h2>
          <div className="balance-amount">₹{state.balance.toFixed(2)}</div>
        </div>

        {state.error && <div className="error">{state.error}</div>}

        <div className="controls">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="deposit-btn"
              onClick={() => handleTransaction('DEPOSIT')}
            >
              Deposit
            </button>
            <button
              className="withdraw-btn"
              onClick={() => handleTransaction('WITHDRAW')}
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="transactions">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <h3>Recent Transactions</h3>
            {state.transactions.length > 0 && (
              <button
                className="undo-btn"
                onClick={() => dispatch({ type: 'UNDO_LAST' })}
              >
                Undo Last
              </button>
            )}
          </div>
          {state.transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <span
                className={`transaction-type ${transaction.type.toLowerCase()}`}
              >
                {transaction.type}
              </span>
              <span className="category-tag">{transaction.category}</span>
              <span className="amount">${transaction.amount.toFixed(2)}</span>
              <span>{transaction.date}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BankApp;
