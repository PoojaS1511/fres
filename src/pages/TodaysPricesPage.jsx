import React from 'react';
import '../css/TodaysPricesPage.css';  // Adjusted import path

const TodaysPricesPage = () => {
  const items = [
    ["Avarai (1 Kg)", "30 - 40"],
    ["Amla (1 Kg)", "75 - 83"],
    ["Baby corn (1 Kg)", "59 - 65"],
    ["Beans (1 Kg)", "40 - 60"],
    ["Beetroot (1 Kg)", "05 - 10"],
    ["Bittergourd (1 Kg)", "10 - 20"],
    ["Brinjal (1 Kg)", "15 - 30"],
    ["Brinjal - Big (1 Kg)", "46 - 51"],
    ["Brinjal - Green (1 Kg)", "20 - 70"],
    ["Butter Beans (1 Kg)", "58 - 64"],
    ["Cabbage (1 Kg)", "05 - 10"],
    ["Capscicum - Red (1 Kg)", "120 - 250"],
    ["Capscicum - Green (1 Kg)", "10 - 20"],
    ["Carrot (1 Kg)", "20 - 25"],
    ["Cauliflower (1 Piece)", "10 - 15"],
    ["Chow Chow (1 Kg)", "15 - 18"],
    ["Cluster Beans (1 Kg)", "48 - 53"],
    ["Coconut (Small)", "25 - 35"],
    ["Coconut (Big)", "25 - 35"],
    ["Cucumber (1 Kg)", "08 - 10"],
    ["Double Beans (1 Kg)", "30 - 60"],
    ["Drumstick (1 Kg)", "10 - 20"],
    ["Garlic - Big (Hills) (1 Kg)", "153 - 169"],
    ["Garlic - Small (Country) (1 Kg)", "240 - 250"],
    ["Ginger (1 Kg)", "40 - 50"],
    ["Green Peas (1 Kg)", "72 - 80"],
    ["Green Chilli (1 Kg)", "20 - 30"],
    ["Karunai Kizhangu (1 Kg)", "40 - 60"],
    ["Kovakkai (1 Kg)", "20 - 30"],
    ["Ladies Fingers (1 Kg)", "10 - 20"],
    ["Mango - Raw (1 Kg)", "20 - 40"],
    ["Maravalli Kizhangu (1 Kg)", "68 - 75"],
    ["Noolkol (1 Kg)", "15 - 18"],
    ["Onion - Big (1 Kg)", "16 - 22"],
    ["Onion - Small (1 Kg)", "20 - 40"],
    ["Onion - White (1 Kg)", "53 - 65"],
    ["Peerkangai (1 Kg)", "37 - 41"],
    ["Potato (1 Kg)", "14 - 20"],
    ["Potatoes - Baby (1 Kg)", "14 - 19"],
    ["Radish (1 Kg)", "10 - 15"],
    ["Senaikizhangu (1 Kg)", "20 - 40"],
    ["Seppankizhangu (1 Kg)", "32 - 36"],
    ["Snake Gourd (1 Kg)", "10 - 15"],
    ["Bottle Gourd (1 Kg)", "26 - 29"],
    ["Tomato - Bangalore (1 Kg)", "14 - 20"],
    ["Tomato - Local (1 Kg)", "10 - 15"],
    ["Vazhai Poo (1 Piece)", "18 - 20"],
    ["Vazhai Thandu (1 Piece)", "06 - 10"],
    ["Yellow Pumpkin (1 Kg)", "20 - 22"]
  ];

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center mb-3 pb-3">
          <div className="col-md-12 heading-section text-center ftco-animate">
            <h2 className="mb-4">Today's Prices</h2>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Item</th>
                <th>Price Range (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map(([item, price], index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TodaysPricesPage;
