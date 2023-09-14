/* eslint-disable react/jsx-curly-spacing */
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, InfosState } from '../types';
import { sendExpenses } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: InfosState) => state);
  const dispatch: Dispatch = useDispatch();

  const handleDeleteButton = (expenseID: number) => {
    const newExpenses = expenses?.filter((item) => item.id !== expenseID);
    if (newExpenses) {
      dispatch(sendExpenses(newExpenses));
    }
  };

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
                <button
                  onClick={() => handleDeleteButton(expense.id)}
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
