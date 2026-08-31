
SELECT
    p.ProductID,
    p.ProductName,
    COALESCE(SUM(s.QuantitySold), 0) AS TotalQuantitySold
FROM Products p
         LEFT JOIN Sales s
                   ON p.ProductID = s.ProductID
GROUP BY p.ProductID, p.ProductName;

SELECT
    ProductID,
    ProductName,
    StockQuantity
FROM Products
ORDER BY StockQuantity DESC
    LIMIT 1;


SELECT *
FROM Suppliers
WHERE SupplierName LIKE 'F%';


SELECT
    p.ProductID,
    p.ProductName,
    p.Price,
    p.StockQuantity
FROM Products p
         LEFT JOIN Sales s
                   ON p.ProductID = s.ProductID
WHERE s.ProductID IS NULL;


SELECT
    p.ProductName,
    s.QuantitySold,
    s.SaleDate
FROM Sales s
         JOIN Products p
              ON s.ProductID = p.ProductID;

