import './CurrencyField.css';

function CurrencyField(params) {
  return (
    <div className='currency-field'>
      {params.amount} BTC ===  20000.23$ {params.currency}
    </div>
  );
}

export default CurrencyField;
