import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaTools, FaBell, FaInfoCircle } from "react-icons/fa";
import "./Energy.css";

const BLYNK_TOKEN = "YOUR_AUTH_TOKEN"; 
const API_URL = `https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}`;

const SmartEnergyMeter = () => {
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [realPower, setRealPower] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voltageRes = await fetch(`${API_URL}&V0`);
        const currentRes = await fetch(`${API_URL}&V1`);
        const powerRes = await fetch(`${API_URL}&V2`);

        const voltageData = await voltageRes.json();
        const currentData = await currentRes.json();
        const powerData = await powerRes.json();

        console.log(voltageData, currentData, powerData);

        setVoltage(voltageData.V0 || 0);
        setCurrent(currentData.V1 || 0);
        setRealPower(powerData.V2 || 0);
      } catch (error) {
        console.error("Error fetching Blynk data:", error);
        alert("Error fetching Blynk data. Please check the console for more information.");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <img className="logo" src="./logopg.png" alt="logo"/>
        <h1 className="title">SMART ENERGY METER</h1>
        <div className="icon-group">
          <FaTools className="icon" />
          <FaBell className="icon" />
          <FaInfoCircle className="icon" />
        </div>
      </div>

      {/* Circular Progress Bars */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <CircularProgressbar
            value={voltage}
            maxValue={260}
            text={`${voltage}V`}
            styles={buildStyles({ pathColor: "#1e3a8a", textColor: "#1e3a8a" })}
          />
          <p className="progress-label">VOLTAGE</p>
        </div>
        <div className="progress-wrapper">
          <CircularProgressbar
            value={current}
            maxValue={10}
            text={`${current.toFixed(2)}A`}
            styles={buildStyles({ pathColor: "#6b7280", textColor: "#6b7280" })}
          />
          <p className="progress-label">CURRENT</p>
        </div>
      </div>

      {/* Real Power */}
      <div className="real-power">
        <p>{realPower}W</p>
      </div>

      {/* Time Range Buttons */}
      <div className="time-buttons">
        {["1h", "6h", "1d", "1wk", "1Mo", "3Mo"].map((item, index) => (
          <button key={index} className="time-button">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmartEnergyMeter;
