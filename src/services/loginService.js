import axios from "axios"

const base_url = process.env.REACT_APP_BASE_URL

// export const loginWithEmailAndPassword = async (email: string, password: string) => {
//   console.log(`the base url is ${base_url}` )
//   const response = await axios.post(`${base_url}/getLoginDetails`, { email, password });
//   return response;
// };
// Function to fetch Google user info
// export const fetchGoogleUserInfo = async (accessToken: string) => {
//   try {
//     const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Google user info:", error);
//     throw error;
//   }
// };
export const forgotPassword = async email => {
  const response = await axios.post("/api/forgotPassword", { email })
  return response
}

export const hashPassword = async password => {
  const response = await axios.post("/api/hash-password", { password })
  return response.data.hashedPassword
}
