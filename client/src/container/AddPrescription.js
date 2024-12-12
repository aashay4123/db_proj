import React, { useState } from "react";
import { toast } from "react-toastify";

const AddPrescription = () => {
  const [formData, setFormData] = useState({
    bmi: "",
    bloodPressure: "",
    insulin: "",
    glucose: "",
    diabetes: "",
  });

  const handleHealthDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleHealthDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/prescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Data submitted successfully: " + JSON.stringify(data));
      } else {
        toast.error("Error submitting data");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header animate-fade">
        <h1>HealthCare Recommendations</h1>
        <form onSubmit={handleHealthDataSubmit} className="form animate-slide">
          <div className="form-group">
            <label>BMI:</label>
            <input
              type="text"
              name="bmi"
              placeholder="Enter BMI"
              value={formData.bmi}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Blood Pressure:</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter Blood Pressure"
              value={formData.bloodPressure}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Insulin:</label>
            <input
              type="text"
              name="insulin"
              placeholder="Enter Insulin Level"
              value={formData.insulin}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Glucose:</label>
            <input
              type="text"
              name="glucose"
              placeholder="Enter Glucose Level"
              value={formData.glucose}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Diabetes:</label>
            <input
              type="text"
              name="diabetes"
              placeholder="Enter Diabetes Info"
              value={formData.diabetes}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default AddPrescription;
