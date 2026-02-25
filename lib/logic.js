const calculateValue = (price, stock) => {
  if (typeof price !== 'number' || typeof stock !== 'number') {
    return 0;
  }
  if (isNaN(price) || isNaN(stock)) {
    return 0;
  }
  if (price < 0 || stock < 0) {
    return 0;
  }
  return price * stock;
};

module.exports = { calculateValue };