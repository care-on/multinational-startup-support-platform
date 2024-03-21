CREATE PROCEDURE GetArticles(IN pageNumber INT, IN pageSize INT)
BEGIN
   DECLARE totalRecords INT;
    DECLARE totalPages INT;
    DECLARE offsetValue INT;
    SET offsetValue = (pageNumber - 1) * pageSize;

    -- 전체 항목의 개수 계산
    SELECT COUNT(*) INTO totalRecords FROM articles;

    -- 페이지네이션된 데이터 반환
    SELECT a.a_id, 
           a.a_title, 
           a.date_begin, 
           a.date_end, 
           a.agency, 
           a.tag,
           a.organization, 
           COALESCE(h.hit_count, 0) AS hit_count,
           COALESCE(l.like_count, 0) AS like_count
    FROM articles a
    LEFT JOIN (
        SELECT a_id, COUNT(*) AS hit_count
        FROM article_hit_log
        GROUP BY a_id
    ) h ON a.a_id = h.a_id
    LEFT JOIN (
        SELECT a_id, COUNT(*) AS like_count
        FROM article_like_log
        GROUP BY a_id
    ) l ON a.a_id = l.a_id
    LIMIT offsetValue, pageSize;
END//

DELIMITER ;
