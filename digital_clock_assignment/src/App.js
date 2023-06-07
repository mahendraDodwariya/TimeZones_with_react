import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./App.css"; // Import the CSS file

const App = () => {
  const [dateDisplayFormat, setDateDisplayFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("24hr");
  const [selectedTimeZone, setSelectedTimeZone] = useState("Etc/GMT");
  const [currentTimeZoneName, setCurrentTimeZoneName] = useState("GMT");
  const [previousSelectedTimeZone, setPreviousSelectedTimeZone] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().tz(selectedTimeZone)
  );

  const handleDateDisplayFormatChange = (format) => {
    setDateDisplayFormat(format);
  };

  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
  };

  const handleTimeZoneChange = (timeZone) => {
    setPreviousSelectedTimeZone(selectedTimeZone);
    setSelectedTimeZone(timeZone);
    setCurrentTimeZoneName(getTimeZoneName(timeZone));
  };

  useEffect(() => {
    setCurrentDateTime(moment().tz(selectedTimeZone));
  }, [selectedTimeZone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().tz(selectedTimeZone));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  const getCurrentTime = () => {
    if (timeFormat === "12hr") {
      return currentDateTime.format("hh:mm:ss A");
    }
    return currentDateTime.format("HH:mm:ss");
  };

  const getCurrentDate = () => {
    if (dateDisplayFormat === "MM/DD/YYYY") {
      return currentDateTime.format("dddd, MMMM D, YYYY");
    }
    return currentDateTime.format("dddd, D MMMM, YYYY");
  };

  const getTimeZoneName = (timeZone) => {
    if (timeZone === "Etc/GMT") {
      return "GMT";
    } else if (timeZone === "Asia/Shanghai") {
      return "China";
    } else if (timeZone === "Asia/Kolkata") {
      return "India";
    } else if (timeZone === "Europe/Rome") {
      return "Italy";
    } else if (timeZone === "Pacific/Auckland") {
      return "New Zealand";
    }
    return "";
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>Time</li>
          <li>Unix Clock</li>
          <li>Converter</li>
        </ul>
      </nav>

      {/* Date Display and Time Format Options */}
      <div className="options">
        <div className="options-left">
          <button
            className={dateDisplayFormat === "MM/DD/YYYY" ? "active" : ""}
            onClick={() => handleDateDisplayFormatChange("MM/DD/YYYY")}
          >
            MM/DD/YYYY
          </button>
          <button
            className={dateDisplayFormat === "DD/MM/YYYY" ? "active" : ""}
            onClick={() => handleDateDisplayFormatChange("DD/MM/YYYY")}
          >
            DD/MM/YYYY
          </button>
        </div>
        <div className="options-right">
          <button
            className={timeFormat === "24hr" ? "active" : ""}
            onClick={() => handleTimeFormatChange("24hr")}
          >
            24hr
          </button>
          <button
            className={timeFormat === "12hr" ? "active" : ""}
            onClick={() => handleTimeFormatChange("12hr")}
          >
            12hr
          </button>
        </div>
      </div>

      {/* Time Zone, Time, and Date section */}
      <div className="time-container">
        {/* Time Zone */}
        <p className="time-zone">{currentTimeZoneName}</p>

        {/* Digital Clock */}
        <div className="clock-container">
          <h1 className="clock">{getCurrentTime()}</h1>
          <p className="date">{getCurrentDate()}</p>
        </div>
      </div>

      {/* Popular Time Zones */}
      <hr />
      <div className="time-zones">
        <h2>Popular Time Zones</h2>
        <ul>
          <li>
            <button
              className={selectedTimeZone === "Asia/Shanghai" ? "active" : ""}
              onClick={() => handleTimeZoneChange("Asia/Shanghai")}
            >
              China
            </button>
          </li>
          <li>
            <button
              className={selectedTimeZone === "Asia/Kolkata" ? "active" : ""}
              onClick={() => handleTimeZoneChange("Asia/Kolkata")}
            >
              India
            </button>
          </li>
          <li>
            <button
              className={selectedTimeZone === "Europe/Rome" ? "active" : ""}
              onClick={() => handleTimeZoneChange("Europe/Rome")}
            >
              Italy
            </button>
          </li>
          <li>
            <button
              className={
                selectedTimeZone === "Pacific/Auckland" ? "active" : ""
              }
              onClick={() => handleTimeZoneChange("Pacific/Auckland")}
            >
              New Zealand
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
