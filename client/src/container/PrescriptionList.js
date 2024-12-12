import React from "react";
import { useNavigate } from "react-router";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = React.useState([]);

  const navigate = useNavigate();
  // Function for adding a prescription
  const handleAddPrescription = (e) => {
    e.preventDefault();
    navigate("/addprescription");
  };

  // Function for displaying prescription details
  const handleViewPrescription = (e, prescriptionId) => {
    e.preventDefault();

    navigate("/prescription/" + prescriptionId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAddPrescription}>Add Prescription</button>

        <h2>Prescription List</h2>
        <ul>
          {prescriptions.map((prescription, index) => (
            <li key={index}>
              <span>{prescription}</span>
              <button onClick={(e) => handleViewPrescription(e, prescription)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default PrescriptionList;
