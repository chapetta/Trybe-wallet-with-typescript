import { useSelector } from 'react-redux';
import { InfosState } from '../types';

function Header() {
  const { email, totalExpenses } = useSelector((state: InfosState) => state);

  return (
    <div>
      <h4>Chaps Wallet</h4>
      {email && <span>{email.toString()}</span>}
      <span>{`Despesa Total: ${totalExpenses} BRL`}</span>
      {' '}
    </div>
  );
}
export default Header;
