-- THIS FILE POPULATES OUR DB WITH FAKE DATA FOR TESTING PURPOSES

use projectDatabase;

INSERT INTO Users (username, password_hash, first_name, last_name) VALUES
('jdoe', 'hash1', 'John', 'Doe'),
('asmith', 'hash2', 'Alice', 'Smith'),
('mbrown', 'hash3', 'Michael', 'Brown');

INSERT INTO Classes (class_title) VALUES
('Computer Science 101'),
('Mathematics 101'),
('Physics 101');

INSERT INTO User_Classes (username, class_id) VALUES
('jdoe', 1),
('jdoe', 2),
('asmith', 1),
('mbrown', 3);

INSERT INTO Assignments (title, class_id, category, total_points) VALUES
('Homework 1', 1, 'hwk', 100),
('Exam 1', 1, 'exam', 200),
('Project 1', 2, 'project', 150),
('Lab 1', 3, 'lab', 50);

INSERT INTO User_Assignment_Grades (assignment_id, username, points_earned, grade) VALUES
(1, 'jdoe', 90, 90),
(2, 'jdoe', 180, 90),
(1, 'asmith', 85, 85),
(3, 'jdoe', 140, 93);

INSERT INTO User_Category_Grades (class_id, category, username, points_earned, total_points, grade) VALUES
(1, 'hwk', 'jdoe', 90, 100, 90),
(1, 'exam', 'jdoe', 180, 200, 90),
(1, 'hwk', 'asmith', 85, 100, 85),
(2, 'project', 'jdoe', 140, 150, 93);

INSERT INTO Category_Average_Grades (class_id, category, grade) VALUES
(1, 'hwk', 87.5),
(1, 'exam', 90),
(2, 'project', 93);
-- (3, 'lab', 0) Nobody has actually completed the 'lab' category assignment.

INSERT INTO User_Class_Grades (class_id, username, grade) VALUES 
(1, 'jdoe', 90),
(1, 'asmith', 85),
(2, 'jdoe', 93);

INSERT INTO Class_Average_Grades (class_id, grade) VALUES 
(1, 88.75), 
(2, 93);
-- (3, 0) Nobody has actually completed the 'lab' category assignment.