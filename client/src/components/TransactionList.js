import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
  const { transactions, fetchTransactions } = useContext(GlobalContext);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions &&
          transactions.map(({ _id, text, amount }) => (
            <Transaction key={_id} id={_id} text={text} amount={amount} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
