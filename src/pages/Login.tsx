/* eslint-disable react/jsx-curly-spacing */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isValidEmail, isValidPassword } from '../utils/loginValidations';
import { Dispatch } from '../types';
import { saveUserEmail } from '../redux/actions';

function Login() {
  const [validButton, setValidButton] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const handleChangeButton = () => {
    if (isValidEmail(email) && isValidPassword(password)) {
      setValidButton(false);
    } else {
      setValidButton(true);
    }
  };
  const handleSubmitButton = () => {
    navigate('/carteira');
    dispatch(saveUserEmail(email));
  };

  useEffect(() => {
    handleChangeButton();
  }, [email, password]);

  return (
    <div>
      <h1>Trybe Wallet</h1>
      <label>
        <input
          type="text"
          placeholder="'alguem@alguem.com"
          value={email}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(target.value);
          }}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button
        type="button"
        disabled={validButton}
        onClick={() => handleSubmitButton()}
      >
        Entrar

      </button>
    </div>
  );
}

export default Login;
