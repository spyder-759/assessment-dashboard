import React, { useEffect, useState } from "react";
import { getQuestions, submitResult } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function AttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    getQuestions(id).then(res => setQuestions(res.data));
  }, [id]);

  if (questions.length === 0) return <h2>Loading...</h2>;

  const question = questions[current];

  const handleNext = () => {
    if (selected === question.optionA) {
      setScore(score + question.marks);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      submitResult({
        assessmentId: parseInt(id),
        candidateName: name,
        score: score
      }).then(() => navigate(`/results/${id}`));
    }
  };

  return (
    <div className="container">
      <h2>{question.questionText}</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="options">
        {[question.optionA, question.optionB, question.optionC, question.optionD]
          .map(opt => (
            <button
              key={opt}
              className={selected === opt ? "selected" : ""}
              onClick={() => setSelected(opt)}
            >
              {opt}
            </button>
          ))}
      </div>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default AttemptPage;