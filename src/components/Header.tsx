import { useSelector } from 'react-redux/es/hooks/useSelector';
import { InfosState } from '../types';

function Header() {
  const { email, despesa } = useSelector((state: InfosState) => state);

  if (email) {
    return (
      <div>
        <h4>Chaps Wallet</h4>
        <span>{email.toString()}</span>
        <span>{`Despesa Total: ${despesa} BRL`}</span>
      </div>
    );
  }
}

export default Header;
