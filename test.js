const axios = require("axios");

const host = "http://localhost:3000";

async function login() {
  try {
    const response = await axios.post(`${host}/auth/login`, {
      username: "prmpsmart",
      email: "prmpsmart@gmail.com",
    });
    console.log("Data fetched successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      if (error.response) {
        // console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        // console.error("Response headers:", error.response.headers);
      }
    } else {
      // Handle generic error
      // console.error("Error fetching data:", error.message);
    }
  }
}

login();
