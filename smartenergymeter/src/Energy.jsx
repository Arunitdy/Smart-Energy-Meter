import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaTools, FaBell, FaInfoCircle } from "react-icons/fa";
import "./Energy.css";

const SmartEnergyMeter = () => {
  const voltage = 260;
  const current = 4.02424;
  const realPower = 1702.168;

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="title">SMART ENERGY METER</h1>
        <div className="icon-group">
          <FaTools className="icon" />
          <FaBell className="icon" />
          <FaInfoCircle className="icon" />
        </div>
      </div>

      {/* Circular Progress Bars in a Row */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <CircularProgressbar
            value={voltage}
            maxValue={260}
            text={`${voltage}`}
            styles={buildStyles({ pathColor: "#1e3a8a", textColor: "#1e3a8a" })}
          />
          <p className="progress-label">VOLTAGE</p>
        </div>
        <div className="progress-wrapper">
          <CircularProgressbar
            value={current}
            maxValue={255}
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
