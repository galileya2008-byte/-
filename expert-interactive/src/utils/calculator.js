export const formatMoney = (value) =>
  `${Math.round(value).toLocaleString("ru-RU")} руб.`;

export const calculateMetrics = ({
  traffic,
  currentConversion,
  averageCheck,
  potentialConversion,
}) => {
  const currentLeads = (traffic * currentConversion) / 100;
  const potentialLeads = (traffic * potentialConversion) / 100;
  const currentIncome = currentLeads * averageCheck;
  const potentialIncome = potentialLeads * averageCheck;
  const monthlyLoss = potentialIncome - currentIncome;
  const yearlyLoss = monthlyLoss * 12;

  return {
    currentLeads,
    potentialLeads,
    currentIncome,
    potentialIncome,
    monthlyLoss,
    yearlyLoss,
  };
};
