import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;
//const getMasterSchoolData_URL = "http://localhost:3000/schoolmanagement/getMasterSchoolData"; // Replace with your actual API endpoint

export const fetchData = async () => {
  try {
    const response = await axios.get(`${base_url}/getMasterSchoolData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
