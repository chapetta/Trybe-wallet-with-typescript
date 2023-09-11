import { EmailType } from '../../types';

export const USER_EMAIL = 'USER_EMAIL';

export const saveUserEmail = (email: EmailType) => {
  return {
    type: USER_EMAIL,
    email,
  };
};
