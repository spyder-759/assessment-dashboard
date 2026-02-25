import React, { useEffect, useState } from "react";
import { getAssessments } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAssessments()
      .then(res => setData(res.data))
      .catch(err => alert("Error loading assessments"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Assessment Dashboard</h1>
      <div className="card-grid">
        {data.map(item => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>Duration: {item.duration} mins</p>
            <p>Total Marks: {item.totalMarks}</p>
            <button onClick={() => navigate(`/attempt/${item.id}`)}>
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;