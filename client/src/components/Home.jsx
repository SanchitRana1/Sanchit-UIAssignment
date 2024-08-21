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
      const points = aggregatePoints(data);
      setCustomerPoints(points);
    });
  }, []);
  return (
    <div>
      <h1>Customer Reward Points</h1>
      {Object.keys(customerPoints).map((customerId) => {
        const customer = customerPoints[customerId];
        console.log(customer)
        return (
          <div key={customerId}>
            <h2 className="border">{customer.name}</h2>
            <h3 className="underLine">Total Points: {customer.total}</h3>
            <ul>
              {Object.keys(customer.points).map((month) => (
                <li key={month}>

                  <p className="fontBold underLine">Month {month}</p> 
                  {customer.points[month].map((trans,i) => <div key={i}>
                    <span className="fontBold">$ {trans[0]} </span> amount | 
                    <span className="fontBold"> {trans[1]} </span>points</div>)} 
                </li>
              ))}
            </ul>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
