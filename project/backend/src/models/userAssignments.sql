SELECT uag.assignment_id, uag.username, uag.points_earned,
    uag.grade, a.title, c.class_title
FROM User_Assignment_Grades uag
JOIN Assignments a ON uag.assignment_id = a.assignment_id
JOIN Classes c ON c.class_id = a.class_id
WHERE uag.username = ?;
