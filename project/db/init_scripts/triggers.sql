-- Here we store commands that must automatically run in the event of an insert on another table. An example might be an inser to User_Assignment_Grades forcing a recalculation of the Class_Average_Grades as now there is a new grade.

DELIMITER $$

CREATE TRIGGER CalculateFinalGrade
AFTER INSERT ON User_Assignment_Grades
FOR EACH ROW
BEGIN
    DECLARE totalEarned FLOAT;
    DECLARE totalPossible FLOAT;
    DECLARE finalGrade FLOAT;
    DECLARE curClassId INT;

    -- Retrieve class_id using assignment_id from the newly inserted row
    SELECT a.class_id INTO curClassId FROM Assignments a WHERE a.assignment_id = NEW.assignment_id;

    -- Calculate total earned points and total possible points for the student in the class
    SELECT SUM(uag.points_earned), SUM(a.total_points)
    INTO totalEarned, totalPossible
    FROM Assignments a
    JOIN User_Assignment_Grades uag ON a.assignment_id = NEW.assignment_id
    WHERE a.class_id = curClassId AND uag.username = NEW.username;

    -- Calculate final grade as percentage
    SET finalGrade = (totalEarned / totalPossible) * 100;

    -- Update or insert final grade into User_Class_Grades
    INSERT INTO User_Class_Grades (class_id, username, grade)
    VALUES (curClassId, NEW.username, finalGrade)
    ON DUPLICATE KEY UPDATE grade = finalGrade;
END$$

DELIMITER ;
