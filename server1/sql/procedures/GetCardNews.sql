DELIMITER //
CREATE PROCEDURE GetCardNews(IN pageNumber INT, IN pageSize INT)
BEGIN
   DECLARE totalRecords INT;
    DECLARE totalPages INT;
    DECLARE offsetValue INT;
    SET offsetValue = (pageNumber - 1) * pageSize;

    -- ��ü �׸��� ���� ���
    SELECT COUNT(*) INTO totalRecords FROM cardnews;

    -- ���������̼ǵ� ������ ��ȯ
    SELECT a.idcardnews, 
           a.title, 
           a.content,
           a.release_date, 
           COALESCE(h.hit_count, 0) AS hit_count,
           COALESCE(l.like_count, 0) AS like_count
    FROM cardnews a
    LEFT JOIN (
        SELECT idcardnews, COUNT(*) AS hit_count
        FROM cardnews_hit_log
        GROUP BY idcardnews
    ) h ON a.idcardnews = h.idcardnews
    LEFT JOIN (
        SELECT idcardnews, COUNT(*) AS like_count
        FROM cardnews_like_log
        GROUP BY idcardnews
    ) l ON a.idcardnews = l.idcardnews
    LIMIT offsetValue, pageSize;
END//

DELIMITER ;
