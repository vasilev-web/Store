const FormaterPrice = (value, currency = '₽') => {
    let price = Number.prototype.toFixed.call(parseInt(value) || 0, 0);
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' ' + currency;
};

export default FormaterPrice;
