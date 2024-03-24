DELIMITER //
CREATE PROCEDURE GetAnswerDetailsById(IN answerId INT)
BEGIN
    SELECT * FROM answers where aid = answerId;
    
END//

DELIMITER ;