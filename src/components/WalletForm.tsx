/* eslint-disable react/jsx-curly-spacing */
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { CurrencieType, Dispatch, ExpensesType, InfosState } from '../types';
import {
  getCurrenciesApi,
  sendExpenses,
  updateTotalExpenses,
} from '../redux/actions';

function WalletForm() {
  const [formData, setFormData] = useState({
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  });
  const [ids, setIds] = useState(0);
  const dispatch: Dispatch = useDispatch();
  const { currencies, expenses } = useSelector((state: InfosState) => state);
  const [loadingCurrencies, setLoadingCurrencies] = useState(false);

  const handleChange = (
    fieldName: string | number,
  ) => ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: target.value,
    }));
  };

  // ...

  useEffect(() => {
    if (!currencies || currencies.length === 0) {
      dispatch(getCurrenciesApi());
      setLoadingCurrencies(true);
    } else if (loadingCurrencies) {
      setLoadingCurrencies(false); // Define como false após o carregamento inicial
    }
  }, [currencies, dispatch, loadingCurrencies]);

  // ...

  function calculateTotalExpenses(totalExpenses: ExpensesType[]) {
    if (totalExpenses && totalExpenses.length > 0) {
      return totalExpenses.reduce((total, expense) => {
        if (expense && expense
          .exchangeRates && expense.exchangeRates[formData.currency]) {
          const exchangeRate = parseFloat(expense.exchangeRates[formData.currency].ask);
          const expenseValue = expense.value;
          return total + (expenseValue * exchangeRate);
        }
        return total;
      }, 0);
    }
    return 0;
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSubmitButton = () => {
    dispatch(getCurrenciesApi());
    const newExpense: ExpensesType = {
      id: ids,
      value: parseFloat(formData.value),
      tag: formData.tag,
      currency: formData.currency,
      method: formData.method,
      description: formData.description,
      exchangeRates: {},
    };

    const selectedCurrency: CurrencieType | undefined = currencies?.find(
      (currencie) => currencie.code === formData.currency,
    );

    if (selectedCurrency) {
      newExpense.exchangeRates = {
        [formData.currency]: {
          code: selectedCurrency.code,
          name: selectedCurrency.name,
          ask: selectedCurrency.ask,
        },
      };
    }

    const updatedExpenses = [...(expenses || []), newExpense];

    const totalExpenses = parseFloat(calculateTotalExpenses(updatedExpenses).toFixed(2));

    dispatch(sendExpenses(updatedExpenses));
    dispatch(updateTotalExpenses(totalExpenses));
    setIds(ids + 1);
    setFormData({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  return (
    <div>
      {loadingCurrencies ? (
        <p>Carregando moedas...</p>
      ) : (
        <form onSubmit={handleSubmitForm}>
          <label>
            Valor:
            <input
              type="number"
              value={formData.value}
              onChange={handleChange('value')}
            />
          </label>
          <label>
            Moeda:
            <select
              value={formData.currency}
              onChange={handleChange('currency')}
            >
              {currencies && currencies.map((currencie) => (
                <option
                  key={currencie.name}
                  value={currencie.code}
                >
                  {currencie.code}

                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              value={formData.method}
              onChange={handleChange('method')}
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de Débito</option>
            </select>
          </label>
          <label>
            Categoria:
            <select
              value={formData.tag}
              onChange={handleChange('tag')}
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={formData.description}
              onChange={handleChange('description')}
            />
          </label>
          <button
            type="submit"
            onClick={handleSubmitButton}
          >
            Adicionar despesas
          </button>
        </form>
      )}
    </div>
  );
}

export default WalletForm;
