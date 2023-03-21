import { useState } from 'react';

import FormBTC from './components/FormBTC';
import CurrencyField from './components/CurrencyField';
import { AVAILABLE_CURRENCIES_LIST } from './components/models/Utils';

function App() {
  const [activeCurrencies, setActiveCurrencies] = useState(AVAILABLE_CURRENCIES_LIST);
  const [amountBTC, setAmountBTC] = useState(0);

  const amountHandler = (amount) => {
    console.log('amount from form: ', amount)
    setAmountBTC(amount ? amount : 0);
  };

  const currenciesHandler = (item, isAdd) => {
    console.log('currenciesHandler', item, 'isAdd ? ', isAdd);
    if (isAdd) {
      setActiveCurrencies([...activeCurrencies, item]);
    } else {
      setActiveCurrencies([...activeCurrencies.filter(el => el !== item)]);
    }
  }

  return (
    <div className="app">
      <FormBTC onAmountChange={amountHandler}/>
      { activeCurrencies
        .map(currency =>
          <CurrencyField currency={currency} amount={amountBTC} onRemoveCurrency={currenciesHandler} />
        )
      }
    </div>
  );
}

export default App;
