// helper function to load components from html files
function loadComponent(componentUrl, containerId) {
  fetch(componentUrl)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

//used primarily in index.html on authenticated page load
function displayUserClasses(user) {
  var user = window.sessionStorage.getItem("user");
  axios
    .get("http://localhost:3000/classes/get/" + user)
    .then(function (response) {
      var classes = response.data;

      var list = document.getElementById("classes-list");

      classes.forEach(function (classInfo) {
        var link = document.createElement("a");
        link.className = "list-group-item list-group-item-action";
        link.href = "./pages/class.html?class=" + classInfo.class_id;
        link.classList.add("list-group-item");
        link.textContent = classInfo.class_title;
        list.appendChild(link);
      });
    })
    .catch(function (error) {
      console.error("Error fetching classes data:", error);
    });
}

//used primarily in ./pages/class.html on page load
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

//used primarily in index.html on authenticated page load
function displayUserAssignments(user) {
  var user = window.sessionStorage.getItem("user");
  axios
    .get("http://localhost:3000/assignments/get/" + user)
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
