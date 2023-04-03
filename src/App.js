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

  const [singleStation, setSingleStation] = useState({});
  const [loading, setLoading] = useState(true);

  let query = window.location.search;
  const param = new URLSearchParams(query);
  // console.log(param.has("test"));
  query.replace("?", "");

  // timestamp
  const showDate = new Date();

  const displayDate = `${showDate.getDate()}-${
    showDate.getMonth() + 1
  }-${showDate.getFullYear()}`;

  const getFuelData = async () => {
    try {
      const { data } = await axios.get(
        "https://cedi-rates.herokuapp.com/api/v1/fuelPrices/" + displayDate
      );
      setStations(data.fuelPrices.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleFuelData = async () => {
    const queryName = query.split("=")[1];
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://cedi-rates.herokuapp.com/api/v1/fuelprices/get/${queryName}/${displayDate}`
      );
      console.log(data);
      setSingleStation(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
    getSingleFuelData();
  }, []);

  const fuelChangeFunc = (value) => {
    switch (value) {
      case "decrease":
        return <BsArrowDown className="decrease" />;
      case "increase":
        return <BsArrowUp className="increase" />;
      default:
        return "";
    }
  };

  if (param.has("station")) {
    if (loading) {
      return <h4>Loading...</h4>;
    }
    return (
      <aside className="widget-card">
        <div className="widget-content">
          <div className="widget-fuel-title">
            <p className="widget-fuel-title-value">Fuel Prices (GHS/L)</p>
            <p className="widget-fuel-title-timestamp">{displayDate}</p>
          </div>
          <div className="widget-logo-name">
            <img
              src={singleStation.company.image}
              alt="compnany-logo"
              className="widget-img"
            />

            <p className="widget-company-name">{singleStation.name}</p>
          </div>
          <div className="widget-fuel-name-price-change">
            <p className="widget-fuel-name-price">
              Petrol:{" "}
              <span className="widget-fuel-price">
                {singleStation.petrol === 0 ? "-" : singleStation.petrol}
                {fuelChangeFunc(singleStation.petrolInflation)}
              </span>{" "}
            </p>
          </div>

          <div className="widget-fuel-name-price-change">
            <p className="widget-fuel-name-price">
              Diesel:{" "}
              <span className="widget-fuel-price">
                {singleStation.diesel === 0 ? "-" : singleStation.diesel}
                {fuelChangeFunc(singleStation.dieselInflation)}
              </span>
            </p>
          </div>

          <div className="widget-fuel-name-price-change">
            <p className="widget-fuel-name-price">
              Premium:{" "}
              <span className="widget-fuel-price">
                {singleStation.premium === 0 ? "-" : singleStation.premium}
                {fuelChangeFunc(singleStation.premiumInflation)}
              </span>
            </p>
          </div>
          <p className="widget-powered_by">
            Powered by{" "}
            <a
              href="https://cedirates.com"
              rel="noopener noreferrer"
              target="_blank"
              className="widget-website-link"
            >
              CediRates.com
            </a>
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="widget-card">
      <div className="widget-content">
        <div className="widget-fuel-title">
          <p className="widget-fuel-title-value">Fuel Prices (GHS/L)</p>
          <p className="widget-fuel-title-timestamp">{displayDate}</p>
        </div>
        <div className="widget-logo-name">
          <img src={company.image} alt="compnany-logo" className="widget-img" />

          <p className="widget-company-name">{name}</p>
        </div>
        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Petrol:{" "}
            <span className="widget-fuel-price">
              {petrol === 0 ? "-" : petrol}
              {fuelChangeFunc(petrolInflation)}
            </span>{" "}
          </p>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Diesel:{" "}
            <span className="widget-fuel-price">
              {diesel === 0 ? "-" : diesel}
              {fuelChangeFunc(dieselInflation)}
            </span>
          </p>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Premium:{" "}
            <span className="widget-fuel-price">
              {premium === 0 ? "-" : premium}
              {fuelChangeFunc(premiumInflation)}
            </span>
          </p>
        </div>
        <p className="widget-powered_by">
          Powered by{" "}
          <a
            href="https://cedirates.com"
            rel="noopener noreferrer"
            target="_blank"
            className="widget-website-link"
          >
            CediRates.com
          </a>
        </p>
      </div>
    </aside>
  );
}

export default App;
