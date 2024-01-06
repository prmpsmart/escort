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

async function call(func, v = false) {
  try {
    const response = await func;

    if (response.data.token) {
      token = response.data.token;
    }

    if (v)
      console.log(
        Date(),
        `${_path(response)} :: ${response.status} :: ${
          response.statusText
        } :: ${JSON.stringify(response.data)}\n`
      );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          Date(),
          `${_path(error.response)} :: ${error.response.status} :: ${
            error.response.statusText
          } :: ${JSON.stringify(error.response.data)}\n\n`
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
  return call(
    axios.post(`${host}/login`, {
      usernameEmail: "client1",
      // usernameEmail: "client1@gmail.com",
      password: "762590",
    }),
    ...arguments
  );
}

async function escortLogin() {
  return call(
    axios.post(`${host}/login`, {
      // usernameEmail: "escort1",
      usernameEmail: "nana@yahoo.com",
      // usernameEmail: "escort1@gmail.com",
      // password: "762590",
      password: "12345678",
      isEscort: true,
    })
  );
}
async function clientSignup() {
  return call(
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
  return call(
    axios.post(`${host}/admin/login`, {
      usernameEmail: "prmpsmart",
      // usernameEmail: "prmpsmart@gmail.com",
      password: "prmpsmart",
      isEscort: true,
    })
  );
}

async function escortSignup() {
  return call(
    axios.post(`${host}/escort/signup`, {
      workingName: "nana",
      email: "nana@yahoo.com",
      password: "12345678",
    })
  );
}

async function ladiesStar() {
  return call(
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
  return call(
    axios.get(`${host}/admin/packages`, {
      headers: { Authorization: "Bearer 658cff8e0f3bf0029df3d766" },
      params: { name: 7 },
    })
  );
}

async function package() {
  return call(
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
  return call(
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

  return call(
    axios.post(
      `${host}/escort/addImage`,
      { images },
      {
        headers: { Authorization: "Bearer 6591b08e5a2a0208d1544520" },
      }
    )
  );
}

async function escortProfile() {
  const profile = {
    modelName: "Alice",
    country: "United States",
    city: "New York",
    image: fileToBase64("C:/Users/USER/Pictures/Bracelets/4 bracs.jpg"),
    description: "Experienced model with a passion for fashion.",
    profileType: "Fashion",
    age: 25,
    weight: 130,
    height: 5.8,
    availableFor: "Photo shoots, Runway, Events",
    breastSize: 34,
    breastType: "Natural",
    nationality: "American",
    travel: "Available for travel",
    languages: ["English", "Spanish"],
    tatoo: "No",
    piercing: "No",
    isPornStar: false,
    services: "Modeling, Fashion Consultation",
    meetingWith: "Clients, Designers",
    cellPhones: ["123-456-7890", "987-654-3210"],
  };

  return call(
    // axios.post(`${host}/escort/profile/`, profile, {
    //   headers: {
    //     Authorization: "Bearer 658d97609b33e98dd870d760",
    //     // "content-type": "application/json",
    //   },
    // }),
    axios.get(`${host}/escort/profile`, {
      headers: { Authorization: "Bearer 658d97609b33e98dd870d760" },
    }),1
  );
}
// clientSignup();
// escortSignup();

async function seq() {
  // escortSignup();
  escortLogin().then((v) => {
    console.log(v.token);

    setTimeout(escortProfile, 500);
  });
}

seq();