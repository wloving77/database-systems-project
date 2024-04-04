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

    var form = event.target;

    // Check form validity
    if (!form.checkValidity()) {
      return;
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
            // Set user in sessionStorage
            window.sessionStorage.setItem("user", username);
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
  },

  // logout user
  async handleLogout() {
    window.sessionStorage.removeItem("user");
    location.reload();
  },
};
