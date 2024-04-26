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
async function displayUserClasses(user) {
  const url = "http://localhost:3000/classes/get/" + user;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { classCount, classes } = await response.json();

    if (classCount == 0) {
      console.log("User has 0 Classes");
      return;
    }

    var table = document.getElementById("classes-table");

    classes.forEach(function (classInfo) {
      var row = document.createElement("tr");
      row.onclick = function () {
        window.location.href = "/pages/class.html?class=" + classInfo.class_id;
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
  } catch (error) {
    console.error(`Error inserting Classes ${error}`);
  }
}

//used primarily in ./pages/class.html on page load
async function displayClass(class_id) {
  var url = "http://localhost:3000/classes/class/" + class_id;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { class_title } = await response.json();
    document.getElementById("title").textContent = class_title;
  } catch (error) {
    console.error(`Error getting Class ${error}`);
  }

  const username = window.sessionStorage.getItem("user");

  url =
    "http://localhost:3000/grades/get/assignment-grades/" +
    username +
    "/" +
    class_id;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const assignments = await response.json();

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

      table.appendChild(row);
    });
  } catch (error) {
    console.error(`Error inserting Assignments ${error}`);
  }

  try {
    url =
      "http://localhost:3000/grades/get/category-grades/" +
      username +
      "/" +
      class_id;

    const categoriesRes = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const categories = await categoriesRes.json();
    renderCategories(categories);
  } catch (error) {
    console.error(`Error inserting Categories ${error}`);
  }

  url = "http://localhost:3000/classes/class/" + class_id + "/avg";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { grade } = await response.json();
    document.getElementById("grade").textContent = grade;
  } catch (error) {
    console.error(`Error inserting Class Average ${error}`);
  }
}

async function renderCategories(categories) {
  var table = document.getElementById("categories-table");

  for (const categoryInfo of categories) {
    var row = document.createElement("tr");

    var category = document.createElement("td");
    category.textContent = categoryInfo.category;
    row.appendChild(category);

    var points_earned = document.createElement("td");
    points_earned.textContent = categoryInfo.points_earned;
    row.appendChild(points_earned);

    var grade = document.createElement("td");
    grade.textContent = categoryInfo.grade;
    row.appendChild(grade);

    try {
      url =
        "http://localhost:3000/grades/get/category-grades/" +
        categoryInfo.class_id +
        "/" +
        categoryInfo.category +
        "/avg";

      const avgRes = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { grade } = await avgRes.json();
      var avg = document.createElement("td");
      avg.textContent = grade;
      row.appendChild(avg);
    } catch (error) {
      console.error(`Error getting Category Average ${error}`);
    }

    table.appendChild(row);
  }
}

//used primarily in index.html on authenticated page load
async function displayUserAssignments(user) {
  var user = window.sessionStorage.getItem("user");

  const url = "http://localhost:3000/assignments/get/" + user;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { assignmentCount, assignments } = await response.json();

    if (assignmentCount == 0) {
      console.log("User Has 0 Assignments");
      return;
    }

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
  } catch (error) {
    console.error(`Error inserting Assignments ${error}`);
  }
}
