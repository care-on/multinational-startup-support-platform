DELIMITER //
CREATE PROCEDURE GetArticles()
BEGIN
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
where a_id = 168233;
END//

DELIMITER ;

