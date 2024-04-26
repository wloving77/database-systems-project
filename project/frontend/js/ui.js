// helper function for performing a simple get request on the provided url and returning json data
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Rethrow to handle specifics outside
  }
}

/* index.html functions */
// render user classes on the home page
async function displayUserClasses(user) {
  const url = "http://localhost:3000/classes/get/" + user;
  const { classCount, classes } = await fetchData(url);

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
}

// render user assignments on the home page
async function displayUserAssignments(user) {
  var user = window.sessionStorage.getItem("user");
  const url = "http://localhost:3000/assignments/get/" + user;
  const { assignmentCount, assignments } = await fetchData(url);

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
}

/* class.html functions */
// render the class info on the class page
async function displayClass(class_id) {
  // get the class title
  var url = "http://localhost:3000/classes/class/" + class_id;
  const { class_title } = await fetchData(url);
  document.getElementById("title").textContent = class_title;

  // get the classes associated with the user
  const username = window.sessionStorage.getItem("user");
  url =
    "http://localhost:3000/grades/get/assignment-grades/" +
    username +
    "/" +
    class_id;
  const assignments = await fetchData(url);
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

  // get the category average grades
  url =
    "http://localhost:3000/grades/get/category-grades/" +
    username +
    "/" +
    class_id;
  const categories = await fetchData(url);
  renderCategories(categories);

  // get the class average grade
  url = "http://localhost:3000/classes/class/" + class_id + "/avg";
  const { grade } = await fetchData(url);
  document.getElementById("grade").textContent = grade;
}

// render class categories on the class page
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

    var catGrade = document.createElement("td");
    catGrade.textContent = categoryInfo.grade;
    row.appendChild(catGrade);

    url =
      "http://localhost:3000/grades/get/category-grades/" +
      categoryInfo.class_id +
      "/" +
      categoryInfo.category +
      "/avg";
    const { grade } = await fetchData(url);
    var avg = document.createElement("td");
    avg.textContent = grade;
    row.appendChild(avg);

    table.appendChild(row);
  }
}
