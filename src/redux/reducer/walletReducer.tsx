import {
  SEARCH_BEGIN,
  SEARCH_ERROR, SEARCH_SUCESSFUL, SEND_EXPENSES, UPDATE_TOTAL_EXPENSES, USER_EMAIL,
} from '../actions';
import {
  CurrencieType,
  EmailType, ExpensesType, InfosState,
} from '../../types';

const INITIAL_STATE: InfosState = {
  email: null,
  despesa: 0,
  isLoading: false,
  currencies: null,
  error: null,
  expenses: [],
  totalExpenses: 0,
};

export const walletReducer = (
  state: InfosState = INITIAL_STATE,
  action: {
    type: string,
    email: EmailType,
    despesa: number,
    currencies: CurrencieType[],
    error: string,
    expenses: ExpensesType,
    totalExpenses: number,
  },
) => {
  switch (action.type) {
    case USER_EMAIL:
      return {
        ...state,
        email: action.email,
        despesa: action.despesa,
      };
    case SEARCH_BEGIN:
      return {
        ...state,
        isLoading: true,

      };
    case SEARCH_SUCESSFUL:
      return {
        ...state,
        isLoading: false,
        currencies: action.currencies,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SEND_EXPENSES:
      return {
        ...state,
        expenses: action.expenses,
      };
    case UPDATE_TOTAL_EXPENSES:
      return {
        ...state,
        totalExpenses: action.totalExpenses,
      };
    default:
      return state;
  }
};
