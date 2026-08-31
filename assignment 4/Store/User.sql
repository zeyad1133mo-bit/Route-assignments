CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY 'StoreManager123!';

SELECT User, Host
FROM mysql.user
WHERE User = 'store_manager';


GRANT SELECT, INSERT, UPDATE
      ON Store.*
          TO 'store_manager'@'localhost';

SHOW GRANTS FOR 'store_manager'@'localhost';

REVOKE UPDATE
    ON Store.*
    FROM 'store_manager'@'localhost';

SHOW GRANTS FOR 'store_manager'@'localhost';

GRANT DELETE
ON Store.Sales
TO 'store_manager'@'localhost';