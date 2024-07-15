import axios from "axios";

const getMasterSchoolData_URL = "http://localhost:3000/schoolmanagement/getMasterSchoolData"; // Replace with your actual API endpoint

export const fetchData = async () => {
  try {
    const response = await axios.get(getMasterSchoolData_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
