import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getAssessments = () => API.get("/assessments");

export const getQuestions = (assessmentId) =>
  API.get(`/questions?assessmentId=${assessmentId}`);

export const createAttempt = (data) =>
  API.post("/attempts", data);

export const submitResult = (data) =>
  API.post("/results", data);

export const getResults = (assessmentId) =>
  API.get(`/results?assessmentId=${assessmentId}`);