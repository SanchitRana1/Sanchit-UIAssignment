import React, { useEffect, useState } from "react";
import { aggregatePoints } from "../../utils/calculations";
import { transactions } from "../../utils/testData";

const Home = () => {
  const [customerPoints, setCustomerPoints] = useState({});
 
  const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactions);
      }, 1000);
    });
  };

  useEffect(() => {
    fetchTransactions().then((data) => {
        console.log(data)
      const points = aggregatePoints(data);
      setCustomerPoints(points);
    });
  }, []);
  return (
    <div>
      <h1>Customer Reward Points</h1>
      {Object.keys(customerPoints).map((customerId) => {
        const customer = customerPoints[customerId];
        return (
          <div key={customerId}>
            <h2>{customer.name}</h2>
            <p>Total Points: {customer.total}</p>
            <ul>
              {Object.keys(customer.points).map((month) => (
                <li key={month}>
                  Month {month}: {customer.points[month]} points
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
