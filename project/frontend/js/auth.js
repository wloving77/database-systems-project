//helper function for performing a simple get request on the provided url and returning json data.
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Rethrow to handle specifics outside
  }
}

const auth = {
  async handleLogin(event) {
    event.preventDefault();

    const form = event.target;

    const errorMsg = document.getElementById("error-message");

    // Check form validity
    if (!form.checkValidity()) {
      errorMsg.innerHTML = "Please Fill Out All Fields";
      errorMsg.style.display = "block";
      return;
    }

    //prepare and send post request to backend, backend returns a valid username
    const username = form.querySelector("#input-username-login").value;
    const enteredPassword = form.querySelector("#input-password-login").value;

    const authData = {
      username: username,
      password: enteredPassword,
    };

    const url = "http://localhost:3000/user/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      errorMsg.innerHTML = responseData.error;
      errorMsg.style.display = "block";
      console.log(
        `Error Processing Login Request, Server Responded With ${response.status}`
      );
      return;
    }

    //set session storage:
    window.sessionStorage.setItem("user", responseData.username);
    errorMsg.style.display = "none";
    location.reload();
  },

  async handleSignup(event) {
    event.preventDefault();

    const form = event.target;

    const errorMsg = document.getElementById("error-message");

    if (!form.checkValidity()) {
      errorMsg.innerHTML = "Please Fill Out All Fields";
      errorMsg.style.display = "block";
      return;
    }

    //prepare and send post request to backend, backend returns a valid username
    const username = form.querySelector("#input-username-signup").value;
    const enteredPassword = form.querySelector("#input-password-signup").value;
    const enteredPasswordCheck = form.querySelector(
      "#input-password-check-signup"
    ).value;
    const first_name = form.querySelector("#input-firstname-signup").value;
    const last_name = form.querySelector("#input-lastname-signup").value;

    if (enteredPassword !== enteredPasswordCheck) {
      errorMsg.innerHTML = "Password and Confirm Password Must Match";
      errorMsg.style.display = "block";
      return;
    }

    const authData = {
      username: username,
      password: enteredPassword,
      first_name: first_name,
      last_name: last_name,
    };

    const url = "http://localhost:3000/user/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status == 409) {
      errorMsg.innerHTML =
        "User Already Exists, Please Choose a Different Username";
      errorMsg.style.display = "block";
      return;
    }

    if (!response.ok) {
      throw new Error(
        `Error Processing Signup Request, Server Responded With ${response.status}`
      );
    }

    const responseData = await response.json();

    //set session storage:
    window.sessionStorage.setItem("user", responseData.username);
    errorMsg.style.display = "none";
    location.reload();
  },

  // logout user
  async handleLogout() {
    window.sessionStorage.removeItem("user");
    location.reload();
  },
};

/* Packaging UI updates into a couple functions */

const uiAuth = {
  async handleAuthEvent(event) {
    const target_id = event.target.id;

    //modify modal based on login vs signup vs logout
    if (target_id == "profile_login") {
      const loginForm = document.getElementById("login-form");
      const signupForm = document.getElementById("signup-form");
      const modalTitle = document.getElementById("modal-title");
      const modalHeader = document.getElementById("modal-header");
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      modalTitle.innerHTML = "Login";
      modalHeader.innerHTML = "Please Enter your Username and Password";
    } else if (target_id == "profile_signup") {
      const loginForm = document.getElementById("login-form");
      const signupForm = document.getElementById("signup-form");
      const modalTitle = document.getElementById("modal-title");
      const modalHeader = document.getElementById("modal-header");
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      modalTitle.innerHTML = "Signup";
      modalHeader.innerHTML = "Please Choose a Username and Password";
    }

    return;
  },

  async updateUIForLoggedInUser(user) {
    const profileLogin = document.getElementById("profile_login");
    const profileLogout = document.getElementById("profile_logout");
    const profileSignup = document.getElementById("profile_signup");

    displayUserClasses(user);
    displayUserAssignments(user);

    //toggle visibility of login/logout/signup buttons
    profileLogin.style.display = "none";
    profileLogout.style.display = "block";
    profileSignup.style.display = "none";

    // Set the logged-in username in session storage and the input field
    const loggedInUser = window.sessionStorage.getItem("user");
    document.getElementById("username").value = loggedInUser;
  },

  async updateUIForLoggedOutUser() {
    const profileLogin = document.getElementById("profile_login");
    const profileLogout = document.getElementById("profile_logout");
    const profileSignup = document.getElementById("profile_signup");

    //toggle button visibility
    profileLogin.style.display = "block";
    profileSignup.style.display = "block";
    profileLogout.style.display = "none";
  },
};
