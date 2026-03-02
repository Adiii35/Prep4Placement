import axios from "axios";

const API = "http://localhost:5000/api/resume";

export const uploadResume = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", file);

  const response = await axios.post(`${API}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getFullAnalysis = async (resumeId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/${resumeId}/full-analysis`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
