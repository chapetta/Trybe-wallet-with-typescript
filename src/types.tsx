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

export type InfosState = {
  email: EmailType | null,
  despesa: DespesaType | 0
};

export type Dispatch = ThunkDispatch<InfosUserType, null, AnyAction>;
