DELIMITER //
CREATE PROCEDURE GetCardNewsDetail(IN idcardnews INT)
BEGIN
    -- 페이지네이션된 데이터 반환
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
    where idcardnews = a.idcardnews;
END//

DELIMITER ;

