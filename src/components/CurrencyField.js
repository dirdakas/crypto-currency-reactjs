import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // @TODO: issues with cors?
    fetch(`https://spectrocoin.com/scapi/ticker/BTC/${params.currency}`, {
      mode: 'no-cors',
    })
    .then(response => {
      console.log('response: ', response);
      return getMockedResponse(params.currency);
    })
    .then((data) => {
      console.log(data);
      setData(data);
    })
  });

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

  return (
    <div className='currency-field'>
      <div className='calculation'>
        {params.amount} BTC =  {formatValue()} {params.currency}
      </div>
      <div className='one-to-one'>
        {data?.friendlyLast}
      </div>
    </div>
  );
}

export default CurrencyField;
