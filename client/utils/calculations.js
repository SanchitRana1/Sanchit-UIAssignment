
//calculates the reward points for each transaction
export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1;
  }
  return points;
};

//provides the aggregates of points per customer per month
export const aggregatePoints = (transactions) => {
  const pointsPerMonth = transactions.reduce(
    (acc, { customerId, name, transactions }) => {
      const customerPoints = transactions.reduce(
        (pointsAcc, { date, amount }) => {
          const month = new Date(date).getMonth() + 1; // Get month as a number (1-12)
          const points = calculatePoints(amount);

          if (!pointsAcc[month]) {
            pointsAcc[month] = [];
          }
          pointsAcc[month].push([amount, (points ? points : 0)])

          return pointsAcc;
        },
        {}
      );

      acc[customerId] = {
        name,
        points: customerPoints,
        total: Object.values(customerPoints).map(item => item.reduce((acc, inn) => acc + inn[1], 0)).reduce((acc, final) => acc + final, 0)
      }
      return acc;
    },
    {}
  );

  return pointsPerMonth;
};
