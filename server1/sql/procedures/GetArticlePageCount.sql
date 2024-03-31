DELIMITER //
CREATE PROCEDURE GetArticlePageCount(IN pageSize INT)
BEGIN
    DECLARE totalRecords INT;
    DECLARE totalPages INT;

    -- article 테이블의 전체 항목 수 계산
    SELECT COUNT(*) INTO totalRecords FROM articles;

    -- 전체 페이지 수 계산
    SET totalPages = CEIL(totalRecords / pageSize);

    -- 페이지 수 반환
    SELECT totalPages AS pageCount;
END//
DELIMITER ;
