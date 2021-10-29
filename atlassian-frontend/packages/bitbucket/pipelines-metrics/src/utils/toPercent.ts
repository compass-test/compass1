const toPercent = (decimal: any, fixed = 0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};

export default toPercent;
