CREATE TABLE Users(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL CHECK (username <> ''), --probably a security risk
    first_name VARCHAR(255),
    last_name VARCHAR(255 
);

CREATE TABLE Classes(
    class_title VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Assignments (
    assignment_id INT PRIMARY KEY,
    title VARCHAR(255),
    class_title INT,
    category VARCHAR(255),
    total_points FLOAT,
    UNIQUE (class_title, title),
    FOREIGN KEY (class_title) REFERENCES User_Classes(class_title)
);

CREATE TABLE User_Classes (
    username VARCHAR(255),
    class_title INT,
    PRIMARY KEY (username, class_title),
    FOREIGN KEY (username) REFERENCES Users(username),
    FOREIGN KEY (class_title) REFERENCES Classes(class_title)
);

CREATE TABLE User_Assignment_Grades (
    assignment_id INT,
    username VARCHAR(255),
    points_earned FLOAT,
    grade FLOAT,
    PRIMARY KEY (assignment_id, username),
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE User_Category_Grades (
    class_title INT,
    category VARCHAR(255),
    username VARCHAR(255),
    total_points FLOAT,
    points_earned FLOAT,
    grade FLOAT,
    PRIMARY KEY (class_title, category, username),
    FOREIGN KEY (class_title) REFERENCES Classes(class_title),
    FOREIGN KEY (category) REFERENCES Assignments(category),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Category_Average_Grades (
    class_title INT,
    category VARCHAR(255),
    grade FLOAT,
    PRIMARY KEY (class_title, category),
    FOREIGN KEY (class_title) REFERENCES Classes(class_title)
);

CREATE TABLE User_Class_Grades (
    class_title INT,
    username VARCHAR(255),
    grade FLOAT,
    PRIMARY KEY (class_title, username),
    FOREIGN KEY (class_title) REFERENCES Classes(class_title),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Class_Average_Grades (
    class_title INT PRIMARY KEY,
    grade FLOAT,
    FOREIGN KEY (class_title) REFERENCES Classes(class_title)
);


