const React = require("react");
const Header = require("../components/Header");
const { getAction, postAction } = require("../utility/generalServices");
const { useState, useEffect } = require("react");

const PrescriptionDetail = () => {
  const prescriptionId = window.location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    bmi: "",
    bloodPressure: "",
    insulin: "",
    glucose: "",
    diabetes: "",
  });
  const [recommendations, setRecommendations] = useState([]);

  const calcRecommendations = async () => {
    const response = await postAction("/pres/recommend", formData);
    console.log(response);
    setRecommendations(response.data.recommendations);
  };

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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1
          onClick={() => {
            window.location.href = "/prescriptions";
          }}
        >
          Health Recommendations
        </h1>
        <div className="recommendation-container">
          bmi: {formData.bmi}
          <br />
          bloodPressure: {formData.bloodPressure}
          <br />
          insulin: {formData.insulin}
          <br />
          glucose: {formData.glucose}
          <br />
          diabetes: {formData.diabetes}
          <br />
          <button onClick={() => calcRecommendations(prescriptionId)}>
            calculate Recommendations
          </button>
        </div>
      </header>

      <header className="App-header">
        <h1>Recommendations</h1>
        <div className="recommendation-container">
          <div>
            {recommendations.map((recommendation) => {
              return (
                <div>
                  <p>{recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
};

export default PrescriptionDetail;
