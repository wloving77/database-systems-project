-- file for storing our stored procedures should we choose to use them

DELIMITER $$

-- this procedure automatically updates the total weight of a given assignment for a given course.
CREATE PROCEDURE UpdateAssignmentWeights(IN classId INT, IN category VARCHAR(255), IN newWeight FLOAT)
BEGIN
    UPDATE Assignments
    SET total_points = newWeight
    WHERE class_id = classId AND category = category;
END$$

DELIMITER ;
