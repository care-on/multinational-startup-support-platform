DELIMITER //
CREATE PROCEDURE GetCardNewPageCount(IN pageSize INT)
BEGIN
    DECLARE totalRecords INT;
    DECLARE totalPages INT;

    -- article ���̺��� ��ü �׸� �� ���
    SELECT COUNT(*) INTO totalRecords FROM cardnews;

    -- ��ü ������ �� ���
    SET totalPages = CEIL(totalRecords / pageSize);

    -- ������ �� ��ȯ
    SELECT totalPages AS pageCount;
END//
DELIMITER ;