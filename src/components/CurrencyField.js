import { useEffect, useState } from 'react';

import './CurrencyField.css';
import {
  USD,
  EUR,
  GBP,
  MOCKED_USD_RESPONSE,
  MOCKED_EUR_RESPONSE,
  MOCKED_GBP_RESPONSE
} from './models/Utils';

function CurrencyField(params) {
  const [data, setData] = useState();
  var isInit = false;

  useEffect(() => {
    const interval = setInterval(() => {
      requestData();
    }, 60000);
    return () => clearInterval(interval);
  });

  if (!isInit && (params.isActiveRequest || !data)) {
    isInit = true;
    requestData();
  } else if (isInit && params.isActiveRequest) {
    requestData();
  }

  function requestData() {
    // fetch(`https://spectrocoin.com/scapi/ticker/BTC/${params.currency}`, {
    //   mode: 'no-cors',
    // })
    params.onRequestStarted(params.currency);

    fetch(`fake`)
    .then(response => {
      return getMockedResponse(params.currency);
    })
    .catch(response => {
      return getMockedResponse(params.currency);
    })
    .then((data) => {
      // @TODO: used only for generating random price
      const newLast = data.last + Math.floor(Math.random() * 3);
      setData({
        ...data,
        last: newLast,
        friendlyLast: `1 EUR = ${newLast} BTC`
      });
      params.onRequestFinished(params.currency);
    });
  }

  function getMockedResponse(currency) {
    switch(currency) {
      case USD: 
        return MOCKED_USD_RESPONSE;
      case EUR: 
        return MOCKED_EUR_RESPONSE;
      case GBP: 
        return MOCKED_GBP_RESPONSE;
      default: return MOCKED_USD_RESPONSE;
    }
  }

  function formatValue() {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: params.currency
    }).format(params.amount / data?.last).toString();
  }

  function removeCurrency() {
    params.onRemoveCurrency(params.currency);
  }

  return (
    <div className='currency-field-wrapper'>
      <div className='currency-field'>
        <div className='calculation'>
          {params.amount} BTC =  {formatValue()} {params.currency}
        </div>
        <div className='one-to-one'>
          {data?.friendlyLast}
        </div>
      </div>
      <button className='remove-button' onClick={removeCurrency}>
        Remove
      </button>
    </div>
  );
}

export default CurrencyField;
