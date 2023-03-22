import { useState } from 'react';

import FormBTC from './components/FormBTC';
import CurrencyField from './components/CurrencyField';
import { AVAILABLE_CURRENCIES_LIST } from './components/models/Utils';
import AddCurrency from './components/AddCurrency';

function App() {
  const [activeCurrencies, setActiveCurrencies] = useState(AVAILABLE_CURRENCIES_LIST);
  const [amountBTC, setAmountBTC] = useState(0);

  const amountHandler = (amount) => {
    setAmountBTC(amount ? amount : 0);
  };

  const [requests, setRequests] = useState([]);

  const submitHandler = () => {
    // prevent multiple requests
    if (requests.length === 0) {
      setRequests([...activeCurrencies]);
    }
  }

  const currencyRemoveHandler = (item) => {
    setActiveCurrencies((prevState) => [...prevState.filter(el => el !== item)]);
  }

  const currencyAddHandler = (item) => {
    setActiveCurrencies((prevState) => prevState.find(el => el === item) ? [...prevState] : [...prevState, item]);
  }

  const activeRequestsHandler = (currency) => {
    setRequests((prevState) => [...prevState].filter(req => req !== currency));
  }

  const addActiveRequestHandler = (currency) => {
    setRequests((prevState) => {
      if (prevState.find(el => el === currency)) {
        return prevState;
      } else {
        return [...prevState, currency];
      }
    });
  }

  function isActiveRequest(currency) {
    return !!requests.find(el => el === currency);
  }

  return (
    <div className="app">
      <FormBTC onAmountChange={amountHandler} onSubmit={submitHandler} />
      <AddCurrency
        activeCurrencies={activeCurrencies}
        onAddCurrency={currencyAddHandler} />
      { activeCurrencies
        .map(curr =>
          <CurrencyField
            currency={curr}
            key={curr}
            amount={amountBTC}
            isActiveRequest={isActiveRequest(curr)}
            onRequestFinished={activeRequestsHandler}
            onRequestStarted={addActiveRequestHandler}
            onRemoveCurrency={currencyRemoveHandler} />
        )
      }
    </div>
  );
}

export default App;
