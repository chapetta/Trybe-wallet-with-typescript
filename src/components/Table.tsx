/* eslint-disable react/jsx-curly-spacing */
import { useSelector } from 'react-redux';
import { InfosState } from '../types';

function Table() {
  const { expenses } = useSelector((state: InfosState) => state);

  if (expenses) {
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{expense.currency}</td>
              <td>
                {(parseFloat(expense.exchangeRates[expense.currency]
                  .ask) * expense.value).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
