DELIMITER //
CREATE PROCEDURE GetArticlePageCount(IN pageSize INT)
BEGIN
    DECLARE totalRecords INT;
    DECLARE totalPages INT;

    -- article ���̺��� ��ü �׸� �� ���
    SELECT COUNT(*) INTO totalRecords FROM articles;

    -- ��ü ������ �� ���
    SET totalPages = CEIL(totalRecords / pageSize);

    -- ������ �� ��ȯ
    SELECT totalPages AS pageCount;
END//
DELIMITER ;
