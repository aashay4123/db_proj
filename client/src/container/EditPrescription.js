const React = require("react");
const { useState, useEffect } = require("react");
const { toast } = require("react-toastify");
const { getAction, postAction } = require("../utility/generalServices");
const { isAuth } = require("../utility/helper");

const EditPrescription = () => {
  const prescriptionId = window.location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    bmi: "",
    bloodPressure: "",
    insulin: "",
    glucose: "",
    diabetes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAction("/prescription/" + prescriptionId);
      const data = response.data.data[0];
      setFormData({
        bmi: data.bmi,
        bloodPressure: data.bloodPressure,
        insulin: data.insulin,
        glucose: data.glucose,
        diabetes: data.diabetes,
      });
    };

    fetchData();
  }, [prescriptionId]);

  const handleHealthDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleHealthDataSubmit = async (e) => {
    e.preventDefault();

    const user = isAuth();
    console.log("user", user);
    const data = {
      ...formData,
      user: user._id,
    };

    const response = await postAction(`/pres/${prescriptionId}`, data);
    console.log(response);
    toast.success("Data submitted successfully: ");
    window.location.href = "/prescriptions";
    //    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header animate-fade">
        <h1>HealthCare Recommendations</h1>
        <div className="form animate-slide">
          <div className="form-group">
            <label>BMI:</label>
            <input
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
              name="diabetes"
              placeholder="Enter Diabetes Info"
              value={formData.diabetes}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div className="button-group">
            <button
              onClick={(e) => handleHealthDataSubmit(e)}
              className="btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default EditPrescription;
