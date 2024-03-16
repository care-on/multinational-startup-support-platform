
DELIMITER //

CREATE PROCEDURE GetAnswersByQuestionId(IN question_id INT)
BEGIN
    SELECT a.*
    FROM answers a
    JOIN questions_answers qa ON a.aid = qa.aid
    WHERE qa.qid = question_id
    AND a.deleted_date IS NULL;
END//

DELIMITER ;