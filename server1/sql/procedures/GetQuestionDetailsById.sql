
CREATE PROCEDURE GetQuestionDetailsById(IN questionId INT)
BEGIN
    SELECT q.qid, 
           q.uid, 
           q.title, 
           q.content, 
           q.created_date, 
           q.updated_date,
           COALESCE(h.hit_count, 0) AS hit_count,
           COALESCE(l.like_count, 0) AS like_count
    FROM questions q
    LEFT JOIN (
        SELECT qid, COUNT(*) AS hit_count
        FROM question_hit_log
        GROUP BY qid
    ) h ON q.qid = h.qid
    LEFT JOIN (
        SELECT qid, COUNT(*) AS like_count
        FROM question_like_log
        GROUP BY qid
    ) l ON q.qid = l.qid
    WHERE q.qid = questionId AND q.deleted_date IS NULL;
END//

DELIMITER ;