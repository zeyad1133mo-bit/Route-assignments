const mysql = require("mysql2/promise");
const DB_NAME = "Store";

async function initDb() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345",
        port: 3306,
    });

    await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`,
    );

    await connection.query(`USE ${DB_NAME}`);
    connection.end();

    const pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "12345",
        database: DB_NAME,
        port: 3306,
    });

    // Supplier
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Suppliers
        (
            SupplierID INT PRIMARY KEY AUTO_INCREMENT,
            SupplierName VARCHAR(100) NOT NULL,
            ContactNumber VARCHAR(15)
        )
    `);

    // Product
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Products
        (
            ProductID INT PRIMARY KEY AUTO_INCREMENT,
            ProductName VARCHAR(100) NOT NULL,
            StockQuantity INT NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            SupplierID INT,
            FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
        )
    `);

    const [productColumns] = await pool.query(`\n    SHOW COLUMNS FROM Products LIKE 'Category'\n`);

    if (productColumns.length === 0) {
        await pool.query(`
        ALTER TABLE Products
        ADD COLUMN Category VARCHAR(50)
    `);
    }


    await pool.query(`
        CREATE TABLE IF NOT EXISTS Sales
        (
            SaleID INT PRIMARY KEY AUTO_INCREMENT,
            ProductID INT,
            QuantitySold INT NOT NULL,
            SaleDate DATE NOT NULL,
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        )
    `);

    const [salesColumns] = await pool.query(`
    SHOW COLUMNS FROM Sales LIKE 'TotalAmount'
`);

    if (salesColumns.length === 0) {
        await pool.query(`
            ALTER TABLE Sales
                ADD COLUMN TotalAmount DECIMAL(10, 2)
        `);
    }
    return pool;
};

module.exports = initDb;
