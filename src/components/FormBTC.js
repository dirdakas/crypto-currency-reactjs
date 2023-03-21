import { useState, useEffect } from 'react';

import './FormBTC.css';
import { MOCKED_USD_RESPONSE, AVAILABLE_CURRENCIES_LIST } from './models/Utils';

const  FormBTC = (props) => {
  console.log('FormBTC props', props)
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredAmountTouched, setEnteredAmountTouched] = useState(false);

  const enteredAmountIsValid = enteredAmount.trim() !== '';
  const amountInputIsInvalid = !enteredAmountIsValid && enteredAmountTouched;
  const amountInputClasses = amountInputIsInvalid ? 'form-control invalid' : 'form-control';
  
  const amountInputChangeHandler = event => {
    setEnteredAmount(event.target.value);
    props.onAmountChange(event.target.value);
  }

  const amountInputBlurHandler = event => {
    setEnteredAmountTouched(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredAmountTouched(true);

    if (!enteredAmountIsValid) {
      return;
    }

    console.log('shoot get from API request. Current amount: ' + enteredAmount);
    alert('Form was submitted: ' + enteredAmount);
  }

  return <form onSubmit={formSubmissionHandler}>
    <div className={amountInputClasses}>
      <label htmlFor='btcInput'>BTC amount</label>
      <input
        type='text'
        id='btcInput'
        placeholder='eg. 1'
        value={enteredAmount}
        onBlur={amountInputBlurHandler}
        onChange={amountInputChangeHandler} />
      {amountInputIsInvalid && <p className='error-text'>Amount should not be empty</p>}
    </div>
    <div className='form-actions'>
      <button>Check it now!</button>
    </div>
  </form>
}

export default FormBTC;