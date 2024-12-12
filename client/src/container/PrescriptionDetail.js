import React from "react";
const PrescriptionDetail = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Health Recommendations</h1>
        <div className="recommendation-container">
          <div className="recommendation-box">
            <h2>Previous Health Recommendations</h2>
            <p>
              Your previous health data and recommendations will appear here.
            </p>
            <div className="edit-icon-container">
              <img
                src="/pencil.svg"
                alt="Edit"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              />
              <img
                src="/bin.svg"
                alt="Delete"
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="recommendation-box">
            <h2>Present Health Recommendations</h2>
            <p>
              Your current health data and recommendations will appear here.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default PrescriptionDetail;
