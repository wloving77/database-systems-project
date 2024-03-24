USE projectDatabase;

CREATE TABLE Users(
    username VARCHAR(255) PRIMARY KEY CHECK (username <> ''),
    password_hash VARCHAR(255) NOT NULL CHECK (password_hash <> ''),
    first_name VARCHAR(255),
    last_name VARCHAR(255) 
);

CREATE TABLE Classes(
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_title VARCHAR(255) UNIQUE
);

CREATE TABLE User_Classes (
    username VARCHAR(255),
    class_id int,
    PRIMARY KEY (username, class_id),
    FOREIGN KEY (username) REFERENCES Users(username),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

CREATE TABLE Assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    class_id INT,
    category VARCHAR(255),
    total_points FLOAT,
    UNIQUE (class_id, title),
    FOREIGN KEY (class_id) REFERENCES User_Classes(class_id)
);

CREATE TABLE User_Assignment_Grades (
    assignment_id INT AUTO_INCREMENT,
    username VARCHAR(255),
    points_earned FLOAT,
    grade FLOAT,
    PRIMARY KEY (assignment_id, username),
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE User_Category_Grades (
    class_id INT,
    category VARCHAR(255),
    username VARCHAR(255),
    points_earned FLOAT,
    total_points FLOAT,
    grade FLOAT,
    PRIMARY KEY (class_id, category, username),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Category_Average_Grades (
    class_id INT,
    category VARCHAR(255),
    grade FLOAT,
    PRIMARY KEY (class_id, category),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

CREATE TABLE User_Class_Grades (
    class_id INT,
    username VARCHAR(255),
    grade FLOAT,
    PRIMARY KEY (class_id, username),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Class_Average_Grades (
    class_id INT PRIMARY KEY,
    grade FLOAT,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);


