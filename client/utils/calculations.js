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

//provides the aggregates 
export const aggregatePoints = (transactions) => {
  const pointsPerMonth = transactions.reduce(
    (acc, { customerId, name, transactions }) => {
      const customerPoints = transactions.reduce(
        (pointsAcc, { date, amount }) => {
          const month = new Date(date).getMonth() + 1; // Get month as a number (1-12)
          const points = calculatePoints(amount);

          if (!pointsAcc[month]) pointsAcc[month] = 0;
          pointsAcc[month] += points;

          console.log("pointsAcc",pointsAcc);
          
          return pointsAcc;
        },
        {}
      );
      console.log("customerPoints: ",customerPoints)

      acc[customerId] = {
        name,
        points: customerPoints,
        total: Object.values(customerPoints).reduce((a, b) => a + b, 0),
      };

console.log("Acc: ",acc)
      return acc;
    },
    {}
  );

  return pointsPerMonth;
};
