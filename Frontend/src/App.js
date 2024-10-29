import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchMessage = () => {
      fetch("http://localhost:3001/last-message")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("Error fetching message:", err));
    };

    fetchMessage();

    const interval = setInterval(() => {
      fetchMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="App">
    //   {Object.entries(data).map(([key, value]) => (
    //       <p key={key}>
    //         <strong>{key}:</strong> {value ?? "N/A"}
    //       </p>
    //     ))}
    // </div>
    <div className="App">
      {/* {Object.entries(data).map(([key, value]) => (
        <div key={key} className="box">
          <label className="label">{key.toUpperCase()}</label>
          <span className="value">{value ?? 'N/A'}</span>
        </div>
      ))} */}
      {Object.keys(data).length > 0 ? (
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="box">
            <label className="label">{key.toUpperCase()}</label>
            <span className="value">{value ?? "N/A"}</span>
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}

export default App;
