const axios = require("axios");

const host = "http://localhost:3000";

function path(response) {
  let s = response.config.url.split("/");
  return `/${s[s.length - 2]}/${s[s.length - 1]}`;
}

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
      } else {
        // console.log(error);
      }
    } else {
      console.error(Date(), "Error with the request:\n");
    }
  }
}

async function login() {
  call(
    axios.post(`${host}/login`, {
      usernameEmail: "prmpsmart9",
      // usernameEmail: "prmpsmarty",
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

// async function escortLogin() {
//   call(
//     axios.post(`${host}/escort/login`, {
//       usernameEmail: "prmpsmart",
//       // usernameEmail: "prmpsmart@gmail.com",
//       password: "762590",
//       isEscort: true,
//     })
//   );
// }

async function adminLogin() {
  call(
    axios.post(`${host}/admin/login`, {
      usernameEmail: "prmpsmart",
      // usernameEmail: "prmpsmart@gmail.com",
      password: "prmpsmart",
      isEscort: true,
    })
  );
}

async function escortSignup() {
  call(
    axios.post(`${host}/escort/signup`, {
      workingName: "prmpsmart9",
      email: "prmpsmart9@gmail.com",
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

async function packages() {
  call(
    axios.get(`${host}/admin/packages`, {
      headers: { Authorization: "Bearer 658cff8e0f3bf0029df3d766" },
      params: { name: 7 },
    })
  );
}

async function package() {
  call(
    axios.post(
      `${host}/admin/package`,
      {
        name: "Some Package",
        expressLimit: "560",
        showLimit: "44",
        uploadLimit: "10",
        validityPeriod: "5000",
        price: "67.90",
      },
      {
        headers: { Authorization: "Bearer 658cff8e0f3bf0029df3d766" },
      }
    )
  );
}

async function user() {
  call(
    axios.get(`${host}/admin/users`, {
      headers: { Authorization: "Bearer 658cff8e0f3bf0029df3d766" },
    })
  );
}

// clientSignup();
// escortSignup();

async function seq() {
  // await adminLogin();
  await login();
  await escortSignup();
  // await escortLogin();
  // setTimeout(userLadyStar, 200);
  // setTimeout(packages, 1000);
  // setTimeout(user, 1000);
}

seq();
