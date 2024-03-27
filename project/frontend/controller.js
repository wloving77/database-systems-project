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
    return;
  }

  // Get the username and entered password
  var username = form.querySelector("#input-username").value;
  var enteredPassword = form.querySelector("#input-password").value;

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
        console.log("Passwords do not match.");
      }
    })
    .catch(function (error) {
      console.error("Error fetching user data:", error);
    });
}

// validate input -- not working
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// logout user
function handleLogout() {
  window.localStorage.removeItem("user");
  location.reload();
}
