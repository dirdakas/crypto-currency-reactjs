import { useState } from 'react';

import './FormBTC.css';

const  FormBTC = (props) => {
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
    props.onSubmit();
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