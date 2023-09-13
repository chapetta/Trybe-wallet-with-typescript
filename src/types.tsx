import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type EmailType = string;

export type DespesaType = {
  despesa: number,
};

export type InfosUserType = {
  email: EmailType,
  despesa: DespesaType
};

export type CurrencieType = {
  code: string,
  name: string,
  ask: string;
};

export type ExpensesType = {
  id: number;
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: {
    [currencyCode: string]: {
      code: string;
      name: string;
      ask: string;
    }
  }
};

export type InfosState = {
  email: EmailType | null,
  despesa: number,
  currencies: CurrencieType[] | null,
  isLoading: boolean,
  error: string | null,
  expenses: ExpensesType[] | null,
  totalExpenses: number
};

export type Dispatch = ThunkDispatch<InfosUserType, null, AnyAction>;
