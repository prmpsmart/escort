const axios = require("axios");

const host = "http://localhost:3000";

function path(response) {
  let s = response.config.url.split("/");
  return `/${s[s.length - 2]}/${s[s.length - 1]}`;
}

let token = "";

async function call(func) {
  try {
    const response = await func;

    if (response.data.token) {
      token = response.data.token;
    }

    console.log(
      Date(),
      `${path(response)} :: ${response.status} :: ${
        response.statusText
      } :: ${JSON.stringify(response.data)}\n`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          Date(),
          `${path(error.response)} :: ${error.response.status} :: ${
            error.response.statusText
          } :: ${JSON.stringify(error.response.data)}\n`
        );
      }
    } else {
      console.error(Date(), "Error with the request:\n");
    }
  }
}

async function clientLogin() {
  call(
    axios.post(`${host}/client/login`, {
      usernameEmail: "prmpsmarty",
      // usernameEmail: "prmpsmart@gmail.com",
      password: "762590",
      isEscort: true,
    })
  );
}

async function clientSignup() {
  call(
    axios.post(`${host}/client/signup`, {
      firstName: "Miracle",
      lastName: "Peter",
      username: "prmpsmarty",
      email: "prmpsmart@mailinator.com",
      password: "762590",
    })
  );
}

async function escortLogin() {
  call(
    axios.post(`${host}/escort/login`, {
      usernameEmail: "prmpsmart",
      // usernameEmail: "prmpsmart@gmail.com",
      password: "762590",
      isEscort: true,
    })
  );
}

async function escortSignup() {
  call(
    axios.post(`${host}/escort/signup`, {
      workingName: "prmpsmart",
      email: "prmpsmart@gmail.com",
      password: "762590",
    })
  );
}

async function userLadyStar() {
  call(
    axios.post(
      `${host}/client/ladiesStars`,
      {
        workingName: "prmp",
        email: "prmpsmart@gmail.com",
        password: "762590",
      },
      { headers: { Authorization: "Bearer 6589c6d2d77ee6df1fce9eef" } }
    )
  );
}

// clientSignup();
// escortSignup();

async function seq() {
  await clientLogin();
  // await escortLogin();
  setTimeout(userLadyStar, 200);
}

seq();
