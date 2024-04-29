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

async function handleAssignmentAdd(event) {
  event.preventDefault();

  const form = event.target;

  let errorMsg = document.getElementById("error-message");

  if (!form.checkValidity()) {
    errorMsg.innerHTML = "Please Fill Out All Fields with Correct Values";
    errorMsg.style.display = "block";
    return;
  }

  const assignmentName = document.getElementById("input-assignment-name").value;
  const assignmentCategory = document.getElementById(
    "input-assignment-category"
  ).value;
  const assignmentTotalPoints = document.getElementById(
    "total-assignment-points"
  ).value;
  const classID = document.getElementById("hiddenClassID").value;
  const username = window.sessionStorage.getItem("user");

  //to be changed upon deployment, oh god help me
  const url = "http://localhost:3000/assignments/addAssignment";

  const postData = {
    username: username,
    class_id: classID,
    assignment_title: assignmentName,
    assignment_category: assignmentCategory,
    total_points: assignmentTotalPoints,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (response.ok) {
    console.log("Assignment Successfully added for class!");
    location.reload();
  } else {
    console.log(
      "Failed to add assignment to class, possible duplicate or invalid name"
    );
  }
}

async function handleAssignmentEvent(event) {
  const target_id = event.target.id;

  if (target_id == "add-assignment-button") {
    const gradeForm = document.getElementById("assignment-grade-add-form");
    const assignmentForm = document.getElementById("assignment-add-form");
    gradeForm.style.display = "none";
    assignmentForm.style.display = "block";
  } else if (target_id == "add-grade-button") {
    const gradeForm = document.getElementById("assignment-grade-add-form");
    const assignmentForm = document.getElementById("assignment-add-form");
    gradeForm.style.display = "block";
    assignmentForm.style.display = "none";
  }
}

async function handleGradeAdd(event) {
  event.preventDefault();
  const form = event.target;

  const errorMsg = document.getElementById("error-message");

  if (!form.checkValidity()) {
    errorMsg.innerHTML = "Please Fill Out All Fields";
    errorMsg.style.display = "block";
    return;
  }

  const user = window.sessionStorage.getItem("user");

  const url = "http://localhost:3000/assignments/addGrade";

  const assignmentID = document.getElementById("input-assignment-id").value;
  const pointsEarned = document.getElementById("input-points-earned").value;
  const grade = document.getElementById("input-grade").value;

  const postData = {
    username: user,
    assignment_id: assignmentID,
    points_earned: pointsEarned,
    grade: grade,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log(`Grade Successfully added for class: ${class_id}!`);
    } else {
      console.log(`Error adding grade for ${class_id}`);
    }
  } catch (error) {
    console.error(error);
  }
}
