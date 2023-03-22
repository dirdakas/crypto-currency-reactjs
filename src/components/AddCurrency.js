import './AddCurrency.css';
import { AVAILABLE_CURRENCIES_LIST } from './models/Utils';

function AddCurrency(params) {
  const isDisabled = params?.activeCurrencies?.sort().toString() === AVAILABLE_CURRENCIES_LIST.sort().toString();
  const availableCurrencies = isDisabled ? [] : AVAILABLE_CURRENCIES_LIST.reduce((res, curr) => {
    if (params.activeCurrencies.find(el => el === curr)) {
      return res;
    } else {
      return [...res, curr];
    }
  }, []);

  function addCurrency(currency) {
    params.onAddCurrency(currency)
  }

  return (
    <div className={isDisabled ? 'dropdown disabled' : 'dropdown'}>
      <button className='dropbtn' disabled={isDisabled}>Dropdown</button>
      <div className='dropdown-content'>
        { availableCurrencies
          .map(curr => <button
              className='dowpdown-item'
              key={'add-currency-' + curr}
              onClick={() => addCurrency(curr)}>
                {curr}
            </button>)
        }
      </div>
    </div>
  );
}

export default AddCurrency;
