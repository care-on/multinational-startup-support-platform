DELIMITER //
CREATE PROCEDURE InsertAnswerAndRelation(IN content TEXT, IN qid INT)
BEGIN
    DECLARE answer_id INT;
    
    -- �亯 ����
    INSERT INTO answers (qid,content) VALUES (qid, content);
    SET answer_id = LAST_INSERT_ID();

    -- question_answer ���̺� ���� �߰�
    INSERT INTO question_answer (aid, qid) VALUES (answer_id, qid);
END//

DELIMITER ;