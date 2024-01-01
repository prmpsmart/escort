const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Function to read a file and convert it to base64
function fileToBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  return fileData.toString("base64");
}

const host = "http://localhost:3000";

function _path(response) {
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
      `${_path(response)} :: ${response.status} :: ${
        response.statusText
      } :: ${JSON.stringify(response.data)}\n`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          Date(),
          `${_path(error.response)} :: ${error.response.status} :: ${
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

async function clientLogin() {
  call(
    axios.post(`${host}/login`, {
      usernameEmail: "client1",
      // usernameEmail: "client1@gmail.com",
      password: "762590",
    })
  );
}

async function escortLogin() {
  call(
    axios.post(`${host}/login`, {
      usernameEmail: "escort1",
      // usernameEmail: "escort1@gmail.com",
      password: "762590",
      isEscort: true,
    })
  );
}
async function clientSignup() {
  call(
    axios.post(`${host}/client/register`, {
      firstName: "Miracle",
      lastName: "Peter",
      username: "client1",
      email: "client1@mailinator.com",
      password: "762590",
    })
  );
}

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
      workingName: "escort1",
      email: "escort1@gmail.com",
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
      { headers: { Authorization: "Bearer 6591b08e5a2a0208d1544520" } }
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

async function addImage() {
  // Example: Read 5 image files and send them to the addImage endpoint
  const imageFilePaths = [
    "C:/Users/USER/Pictures/Bracelets/2 bracs.jpg",
    "C:/Users/USER/Pictures/Bracelets/4 bracs.jpg",
  ];

  const images = imageFilePaths.map((filePath) => ({
    filename: path.basename(filePath),
    data: fileToBase64(filePath),
  }));

  call(
    axios.post(
      `${host}/escort/addImage`,
      { images },
      {
        headers: { Authorization: "Bearer 6591b08e5a2a0208d1544520" },
      }
    )
  );
}

// clientSignup();
// escortSignup();

async function seq() {
  // await adminLogin();

  // clientLogin().then(async (value) => {
  //   await addImage();
  //   userLadyStar();
  // });

  // escortSignup().then((v) => {
  escortLogin().then((v) => {
    // addImage();
    // });
  });

  // setTimeout(addImage, 2000);
  // setTimeout(packages, 1000);
  // setTimeout(user, 1000);
}

seq();
