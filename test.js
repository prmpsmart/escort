const axios = require("axios");

const host = "http://localhost:3000";

async function call(func) {
  try {
    const response = await func;
    console.log(
      `Response :: ${response.status} :: ${
        response.statusText
      } :: ${JSON.stringify(response.data)}`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);

      if (error.response) {
        console.error(
          `Response :: ${error.response.status} :: ${
            error.response.statusText
          } :: ${JSON.stringify(error.response.data)}`
        );
      }
    } else {
      console.error("Error with the request:");
    }
  }
}

async function login() {
  call(
    axios.post(`${host}/auth/login`, {
      username: "prmpsmart",
      email: "prmpsmart@gmail.com",
    })
  );
}

async function client_signup() {
  call(
    axios.post(`${host}/auth/client_signup`, {
      username: "prmpsmart",
      email: "prmpsmart@gmail.com",
    })
  );
}

client_signup();
