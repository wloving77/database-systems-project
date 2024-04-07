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
}

// logout user
function handleLogout() {
  window.sessionStorage.removeItem("user");
  location.reload();
}

function displayUserClasses() {
  var username = window.sessionStorage.getItem("user");
  axios
    .get("http://localhost:3000/classes/get/" + username)
    .then(function (response) {
      var classes = response.data;

      var table = document.getElementById("classes-table");

      classes.forEach(function (classInfo) {
        var row = document.createElement("tr");
        row.onclick = function () {
          window.location.href = "/class.html?class=" + classInfo.class_id;
        };
        row.style.cursor = "pointer";

        var id = document.createElement("th");
        id.textContent = classInfo.class_id;
        row.appendChild(id);

        var title = document.createElement("td");
        title.textContent = classInfo.class_title;
        row.appendChild(title);

        var grade = document.createElement("td");
        grade.textContent = classInfo.grade;
        row.appendChild(grade);

        table.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error fetching classes data:", error);
    });
}

function displayClass(class_id) {
  axios
    .get("http://localhost:3000/classes/class/" + class_id)
    .then(function (response) {
      thisClass = response.data;

      document.getElementById("title").textContent = thisClass.class_title;
    })
    .catch(function (error) {
      console.error("Error fetching class data:", error);
    });
}

function displayUserAssignments() {
  var username = window.sessionStorage.getItem("user");
  axios
    .get("http://localhost:3000/assignments/get/" + username)
    .then(function (response) {
      var assignments = response.data;
      var table = document.getElementById("assignments-table");

      assignments.forEach(function (assignmentInfo) {
        var row = document.createElement("tr");

        var id = document.createElement("th");
        id.textContent = assignmentInfo.assignment_id;
        row.appendChild(id);

        var title = document.createElement("td");
        title.textContent = assignmentInfo.title;
        row.appendChild(title);

        var points_earned = document.createElement("td");
        points_earned.textContent = assignmentInfo.points_earned;
        row.appendChild(points_earned);

        var grade = document.createElement("td");
        grade.textContent = assignmentInfo.grade;
        row.appendChild(grade);

        var class_title = document.createElement("td");
        class_title.textContent = assignmentInfo.class_title;
        row.appendChild(class_title);

        table.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error fetching assignments data:", error);
    });
}
