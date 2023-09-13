import { Dispatch, EmailType, CurrencieType, ExpensesType } from '../../types';

export const USER_EMAIL = 'USER_EMAIL';
export const UPDATE_TOTAL_EXPENSES = 'UPDATE_TOTAL_EXPENSES';
export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const SEARCH_SUCESSFUL = 'SEARCH_SUCESSFUL';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const saveUserEmail = (email: EmailType) => {
  return {
    type: USER_EMAIL,
    email,
  };
};

export const searchBegin = () => {
  return { type: SEARCH_BEGIN };
};

export const searchSucessful = (currencies: CurrencieType[]) => {
  return {
    type: SEARCH_SUCESSFUL,
    currencies,
  };
};

export const searchError = (error: string) => {
  return {
    type: SEARCH_ERROR,
    error,
  };
};
export const sendExpenses = (expenses: ExpensesType[]) => {
  return {
    type: SEND_EXPENSES,
    expenses,
  };
};

export const updateTotalExpenses = (totalExpenses: number) => {
  return {
    type: UPDATE_TOTAL_EXPENSES,
    totalExpenses,
  };
};

export const getCurrenciesApi = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(searchBegin());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data: CurrencieType[] = await response.json();
      delete data[1];
      const newData = Object.values(data);
      dispatch(searchSucessful(newData));
    } catch (error: any) {
      dispatch(searchError(error));
    }
  };
};
