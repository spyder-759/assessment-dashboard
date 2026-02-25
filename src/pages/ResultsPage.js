import React, { useEffect, useState } from "react";
import { getResults } from "../services/api";
import { useParams } from "react-router-dom";

function ResultsPage() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults(id).then(res => {
      const sorted = res.data.sort((a,b) => b.score - a.score);
      setResults(sorted);
    });
  }, [id]);

  const average =
    results.reduce((acc, curr) => acc + curr.score, 0) /
    (results.length || 1);

  return (
    <div className="container">
      <h1>Leaderboard</h1>

      <h3>Average Score: {average.toFixed(2)}</h3>
      <h3>Total Attempts: {results.length}</h3>

      {results.map((item, index) => (
        <div
          key={item.id}
          className={`leader ${index === 0 ? "top" : ""}`}
        >
          {item.candidateName} - {item.score}
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;