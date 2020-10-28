import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Transaction = ({ id, text, amount }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = amount > 0 ? '+' : '-';
  const amountType = amount > 0 ? 'plus' : 'minus';

  return (
    <li className={amountType}>
      {text}{' '}
      <span>
        {sign}
        {Math.abs(amount)}€
      </span>
      <button className="delete-btn" onClick={() => deleteTransaction(id)}>
        x
      </button>
    </li>
  );
};

export default Transaction;
