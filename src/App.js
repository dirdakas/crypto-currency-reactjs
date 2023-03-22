import { useState } from 'react';

import FormBTC from './components/FormBTC';
import CurrencyField from './components/CurrencyField';
import { AVAILABLE_CURRENCIES_LIST } from './components/models/Utils';

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

  const currenciesHandler = (item, isAdd) => {
    console.log('currenciesHandler', item, 'isAdd ? ', isAdd);
    if (isAdd) {
      setActiveCurrencies((prevState) => [...prevState, item]);
    } else {
      setActiveCurrencies((prevState) => [...prevState.filter(el => el !== item)]);
    }
  }

  const activeRequestsHandler = (currency) => {
    setRequests((prevState) => [...prevState].filter(req => req !== currency));
  }

  function isActiveRequest(currency) {
    return !!requests.find(el => el === currency);
  }

  return (
    <div className="app">
      <FormBTC onAmountChange={amountHandler} onSubmit={submitHandler} />
      { activeCurrencies
        .map(curr =>
          <CurrencyField
            currency={curr}
            key={curr}
            amount={amountBTC}
            isActiveRequest={isActiveRequest(curr)}
            onRequestFinished={activeRequestsHandler}
            onRemoveCurrency={currenciesHandler} />
        )
      }
    </div>
  );
}

export default App;
