const React = require("react");
const { useState } = require("react");
const { toast } = require("react-toastify");
const { postAction } = require("../utility/generalServices");
const { isAuth } = require("../utility/helper");

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
      [name]: parseFloat(value),
    });
  };
  const handleHealthDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = isAuth();
      const response = await postAction("/prescription", {
        ...formData,
        user: user._id,
      });
      console.log(response);
      if (response.data.status === "success") {
        window.location.href = "/prescriptions";
        //    window.location.reload();
        toast.success("Data submitted successfully: ");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Login failed: ${error.response.data.message || "Please try again."}`,
        );
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Error submitting data");
      }
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header animate-fade">
          <h1>HealthCare Recommendations</h1>
          <form
            onSubmit={handleHealthDataSubmit}
            className="form animate-slide"
          >
            <div className="form-group">
              <label>BMI:</label>
              <input
                type="text"
                name="bmi"
                placeholder="Enter BMI (10-40)"
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
                placeholder="Enter Blood Pressure (40-250)mm/hg"
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
                placeholder="Enter Insulin Level ( (5-40)mIU/L)"
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
                placeholder="Enter Glucose Level  (20-200)mg/dL"
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
                placeholder="Enter Diabetes  (100-400)mg/dL"
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
    </>
  );
};

export default AddPrescription;
