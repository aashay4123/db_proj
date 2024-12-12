import React, { useEffect } from "react";
import { getAction, deleteAction } from "../utility/generalServices";
import Header from "../components/Header";
import { toast } from "react-toastify";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAction("/prescription");
      setPrescriptions(response.data.data);
    };
    fetchData();
  }, []);

  // Function for adding a prescription
  const handleAddPrescription = (e) => {
    e.preventDefault();
    window.location.href = "/addprescription";
    //    window.location.reload();
  };
  const deletePrescription = async (e, prescriptionId) => {
    e.preventDefault();
    alert("Are you sure you want to delete this prescription?");
    const response = await deleteAction(`/prescription/${prescriptionId}`);
    console.log(response);
    if (response.data.status === "success") {
      window.location.href = "/prescriptions";
      toast.success("Prescription deleted successfully");
    }
  };
  const handleEditPrescription = (e, prescriptionId) => {
    e.preventDefault();

    window.location.href = "/editprescription/" + prescriptionId;
    //    window.location.reload();
  };
  // Function for displaying prescription details
  const handleViewPrescription = (e, prescriptionId) => {
    e.preventDefault();

    window.location.href = "/prescription/" + prescriptionId;
    //    window.location.reload();
  };

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <button onClick={handleAddPrescription}>Add Prescription</button>

        <h2>Prescription List</h2>

        <div className="recommendation-container">
          {prescriptions.map((prescription, index) => (
            <div className="recommendation-box" key={index}>
              <h2>Previous Health data</h2>
              <p>
                bmi: {prescription.bmi}
                <br />
                bloodPressure: {prescription.bloodPressure}
                <br />
                insulin: {prescription.insulin}
                <br />
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
                  onClick={(e) => handleEditPrescription(e, prescription._id)}
                />
                <img
                  src="/bin.svg"
                  alt="Delete"
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  onClick={(e) => deletePrescription(e, prescription._id)}
                />
              </div>
              <div className="">
                <button
                  onClick={(e) => handleViewPrescription(e, prescription._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <ul></ul>
      </header>
    </div>
  );
};

export default PrescriptionList;
