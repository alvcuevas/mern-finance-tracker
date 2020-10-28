import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const API_URL = '/api/transactions';

const initialState = {
  transactions: [],
  loading: true,
  error: null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL);
      dispatch({ type: 'FETCH_TRANSACTIONS', payload: res.data?.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTIONS_ERROR', payload: err?.response?.data?.error });
    }
  };

  const addTransaction = async transaction => {
    const options = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post(API_URL, transaction, options);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTIONS_ERROR', payload: err.response.data?.error });
    }
  };

  const deleteTransaction = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      dispatch({ type: 'TRANSACTIONS_ERROR', payload: err.response.data?.error });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        fetchTransactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
