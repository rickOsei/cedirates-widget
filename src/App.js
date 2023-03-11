import { useState, useEffect } from "react";
import data from "./data";

function App() {
  const [stations, setStations] = useState(data);
  const [index, setIndex] = useState(0);

  const { logo, name, Petrol, Diesel, Premium } = stations[index];

  // timestamp
  const showDate = new Date();
  const displayDate =
    showDate.getDate() +
    "-" +
    (showDate.getMonth() + 1) +
    "-" +
    showDate.getFullYear();

  // slider

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

  return (
    <aside className="widget-card">
      <div className="widget-content">
        {/* {data.map((fuelStation) => {
          return ( */}

        <div className="widget-logo-name">
          <img src={logo} alt="compnany-logo" className="widget-img" />

          <p className="widget-company-name">{name}</p>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Petrol: <span className="widget-fuel-price">{Petrol}</span>{" "}
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">14.5%</p>
            <p className="widget-fuel-change-timestamp">{displayDate}</p>
          </div>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Diesel: <span className="widget-fuel-price">{Diesel}</span>
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">19.5%</p>
            <p className="widget-fuel-change-timestamp">{displayDate}</p>
          </div>
        </div>

        <div className="widget-fuel-name-price-change">
          <p className="widget-fuel-name-price">
            Premium: <span className="widget-fuel-price">{Premium}</span>
          </p>
          <div className="widget-fuel-change">
            <p className="widget-fuel-change-value">-20.5%</p>
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

        {/* );
        })} */}
      </div>
    </aside>
  );
}

export default App;
