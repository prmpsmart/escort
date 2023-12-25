const axios = require("axios");

const host = "http://localhost:3000";

function path(response) {
  let s = response.config.url.split("/");
  return `/${s[s.length - 2]}/${s[s.length - 1]}`;
}

async function call(func) {
  try {
    const response = await func;

    console.log(
      `${path(response)} :: ${response.status} :: ${
        response.statusText
      } :: ${JSON.stringify(response.data)}\n`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `${path(error.response)} :: ${error.response.status} :: ${
            error.response.statusText
          } :: ${JSON.stringify(error.response.data)}\n`
        );
      }
    } else {
      console.error("Error with the request:\n");
    }
  }
}

async function login() {
  call(
    axios.post(`${host}/auth/login`, {
      usernameEmail: "prmpsmart",
      // usernameEmail: "prmpsmart@gmail.com",
      password: "762590",
      isEscort: true,
    })
  );
}

async function clientSignup() {
  call(
    axios.post(`${host}/auth/clientSignup`, {
      firstName: "Miracle",
      lastName: "Peter",
      username: "prmpsmarty",
      email: "prmpsmart@mailinator.com",
      password: "762590",
    })
  );
}

async function escortSignup() {
  call(
    axios.post(`${host}/auth/escortSignup`, {
      workingName: "prmpsmart",
      email: "prmpsmart@gmail.com",
      password: "762590",
    })
  );
}

login();
clientSignup();
escortSignup();
