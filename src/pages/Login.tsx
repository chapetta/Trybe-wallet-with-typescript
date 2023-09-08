/* eslint-disable react/jsx-curly-spacing */
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/loginValidations';

function Login() {
  const [validButton, setValidButton] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeButton = () => {
    if (isValidEmail(email) && isValidPassword(password)) {
      setValidButton(false);
    } else {
      setValidButton(true);
    }
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
          onChange={({ target }) => setEmail(target.value)}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button
        type="button"
        disabled={validButton}

      >
        Entrar

      </button>
    </div>
  );
}

export default Login;
