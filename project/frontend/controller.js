// load components from html files
function loadComponent(componentUrl, containerId) {
  fetch(componentUrl)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

// handle login user
function handleFormSubmit(event) {
  event.preventDefault();

  var form = event.target;

  // Check form validity
  if (!form.checkValidity()) {
    event.stopPropagation();
  } else {
    // Get the username and entered password
    var username = form.querySelector("#input-username").value;
    var enteredPassword = form.querySelector("#input-password").value;
    var errorMsg = document.getElementById("error-message");

    // Perform AJAX request to get user data
    axios
      .get("http://localhost:3000/user/get/" + username)
      .then(function (response) {
        var user = response.data;

        // can add hashing later once the test data has actual hashes
        //   const hashedPassword = crypto
        //     .createHash("sha256")
        //     .update(enteredPassword)
        //     .digest("hex");

        if (user && user.password_hash === enteredPassword) {
          // Set user in localStorage
          window.localStorage.setItem("user", username);
          console.log("Successfully logged in");
          location.reload();
        } else {
          errorMsg.innerHTML = "Incorrect password";
          errorMsg.style.display = "block";
        }
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
        errorMsg.innerHTML = "No user with that username";
        errorMsg.style.display = "block";
      });
  }
  errorMsg.style.display = "none";
  form.classList.add("was-validated");
}

// logout user
function handleLogout() {
  window.localStorage.removeItem("user");
  location.reload();
}
