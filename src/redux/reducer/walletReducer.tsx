import { USER_EMAIL } from '../actions';
import { DespesaType, EmailType, InfosState } from '../../types';

const INITIAL_STATE = {
  email: null,
  despesa: { despesa: 0 },
};
export const walletReducer = (
  state: InfosState = INITIAL_STATE,
  action: { type: string, email: EmailType, despesa: DespesaType },
) => {
  switch (action.type) {
    case USER_EMAIL:
      return {
        ...state,
        email: action.email,
        despesa: action.despesa,
      };
    default:
      return state;
  }
};
