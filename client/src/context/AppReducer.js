const AppReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: false
      }
    case 'TRANSACTIONS_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      };
    default:
      return state;
  }
};

export default AppReducer;
