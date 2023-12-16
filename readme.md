## Endpoints

- /login
  - method: `post`
  - body
    ```py
    username_email: str
    password: str
    ```
- /register
  - method: `post`
  - body
    ```py
    first_name: str
    last_name: str
    username: str
    email: str
    password: str
    ```
- /recover_password
  - method: `post`
  - body
    ```py
    email: str
    ```
- /change_password
  - method: `post`
  - body
    ```py
    password: str
    ```
- /upgrade_pro
  - method: `post`
  - body
    ```py
    images: list[str]
    height: float
    country: str
    birthday: str
    hair_color: str
    gender: str
    ```
- /find_escorts
  - method: `post`
  - body
    ```py
    name: str
    username: float
    looking_for: str
    age_start: int
    age_end: int
    distance: int
    gender: str
    ```
- /profile

  - method: `get`
  - reponse

    ```py
    personal_details: {
        gender: str
        sexuality: str
        age: int
        nationality: str
    }
    physical_details: {
        chest: str
        waist: str
        hips: str
        ethnicity: str
        hair_colour: str
        height: int
        weight: int
        eye_colour: str
        genetalia: str
        cup_size: str
        breast_implant: str
        body_type: str
        body_art: str
    }
    languages: list[str]
    booking_notes: list[str]
    location: {
        incall: str
        outcall: {
            location: str
            i_travel_to: str
        }
    }
    price: {
        incall: {
            hour_1: float
            hour_2: float
            hour_2: float
        }
        outcall: {
            hour_1: float
            hour_2: float
            hour_2: float
        }
    }
    availability: {
      monday: all
      tueday: all
      wednesday: all
      thurday: all
      friday: all
      saturday: all
      dunurday: all

    }
    ```
