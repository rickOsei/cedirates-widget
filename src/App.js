import { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowDown, BsArrowUp, BsDash } from "react-icons/bs";

function App() {
  const [index, setIndex] = useState(0);
  const [stations, setStations] = useState([
    {
      company: { image: "loading" },
      name: "loading",
      petrol: "loading",
      diesel: "loading",
      premium: "loading",
      petrolInflation: "",
      dieselInflation: "",
      premiumInflation: "",
    },
  ]);

  // timestamp
  const showDate = new Date();

  const displayDate = `${showDate.getDate()}-${
    showDate.getMonth() + 1
  }-${showDate.getFullYear()}`;

  const getFuelData = async () => {
    try {
      const { data } = await axios.get(
        "https://cedi-rates-api.onrender.com/api/v1/fuelPrices/" + displayDate
      );
      setStations(data.fuelPrices.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 >= stations.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 6000);
    return () => {
      clearInterval(slider);
    };
  }, [index, stations.length]);

  const {
    company,
    name,
    petrol,
    diesel,
    premium,
    petrolInflation,
    dieselInflation,
    premiumInflation,
  } = stations[index];

  useEffect(() => {
    getFuelData();
  }, []);

  const fuelChangeFunc = (value) => {
    switch (value) {
      case "decrease":
        return <BsArrowDown className="decrease" />;
      case "increase":
        return <BsArrowUp className="increase" />;
      default:
        return <BsDash />;
    }
  };

  return (
    <aside className="widget-card">
      <div className="widget-content">
        <div className="widget-logo-name">
          <img src={company.image} alt="compnany-logo" className="widget-img" />

          <p className="widget-company-name">{name}</p>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Petrol:{" "}
            <span className="widget-fuel-price">
              {petrol === 0 ? "-" : petrol}
            </span>{" "}
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">
              {fuelChangeFunc(petrolInflation)}
            </p>
            <p className="widget-fuel-change-timestamp">{displayDate}</p>
          </div>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Diesel:{" "}
            <span className="widget-fuel-price">
              {diesel === 0 ? "-" : diesel}
            </span>
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">
              {fuelChangeFunc(dieselInflation)}
            </p>
            <p className="widget-fuel-change-timestamp">{displayDate}</p>
          </div>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Premium:{" "}
            <span className="widget-fuel-price">
              {premium === 0 ? "-" : premium}
            </span>
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">
              {fuelChangeFunc(premiumInflation)}
            </p>
            <p className="widget-fuel-change-timestamp">{displayDate}</p>
          </div>
        </div>
        <p className="widget-powered_by">
          This widget is powered by{" "}
          <a
            href="https://cedirates.com"
            rel="noopener noreferrer"
            target="_blank"
            className="widget-website-link"
          >
            cedirates.com
          </a>
        </p>
      </div>
    </aside>
  );
}

export default App;
