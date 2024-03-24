DELIMITER //

CREATE PROCEDURE GetAnswersByQuestionId(IN question_id INT)
BEGIN
    SELECT a.aid, 
           a.uid, 
           a.content, 
           a.created_date, 
           a.updated_date,
           COALESCE(l.likes, 0) AS like_count
    FROM answers a
    JOIN questions_answers qa ON a.aid = qa.aid
    LEFT JOIN (
        SELECT aid, COUNT(*) AS likes
        FROM answer_like_log
        GROUP BY aid
    ) l ON a.aid = l.aid
    WHERE qa.qid = question_id
    AND a.deleted_date IS NULL;
END//

DELIMITER ;
