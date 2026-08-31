const express = require('express');
const initDb = require('./DB');
const app = express();

app.use(express.json());

let pool;

initDb()
    .then((dbPool) => {
        pool = dbPool;
        console.log("Db connection successfully!");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });




//suppliers =================




app.post("/suppliers", async (req, res) => {

    try {
        const { SupplierName, ContactNumber } = req.body;
        const [result] = await pool.query(
            `
            INSERT INTO suppliers (SupplierName,ContactNumber)
            VALUES (?,?)
            `,
            [SupplierName, ContactNumber]
        );
        res.status(201).json({
            message: "Supplier created successfully",
            SupplierID: result.insertId,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating Supplier",
        });
    }
});

app.get("/suppliers", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM Suppliers"
        );

        res.json(rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.put("/suppliers/contact-number", async (req, res) => {
    try {
        await pool.query(`
            ALTER TABLE Suppliers
            MODIFY COLUMN ContactNumber VARCHAR(15)
        `);

        res.json({
            message: "ContactNumber changed to VARCHAR(15) successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});
app.get("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM Suppliers WHERE SupplierID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

app.put("/suppliers/:id", async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;
        const { id } = req.params;

        const [result] = await pool.query(
            `UPDATE Suppliers
             SET SupplierName = ?,
                 ContactNumber = ?
             WHERE SupplierID = ?`,
            [SupplierName, ContactNumber, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.json({
            message: "Supplier updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.delete("/suppliers/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM Suppliers WHERE SupplierID = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.json({
            message: "Supplier deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});




// Products ====================



app.post("/products", async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            `
            INSERT INTO Products
            (ProductName,Price,StockQuantity,SupplierID)
            VALUES (?,?,?,?)
            `,
            [ProductName, Price, StockQuantity, SupplierID]
        );
        res.status(201).json({
            message: 'Product Created Successfully',
            ProductID: result.insertId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "internal server error",
        });
    }
});


app.put("/products/product-name-required", async (req, res) => {
    try {
        await pool.query(`
            ALTER TABLE Products
            MODIFY COLUMN ProductName VARCHAR(100) NOT NULL
        `);

        res.json({
            message: "ProductName is now NOT NULL"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/products", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM Products"
        );

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });

    }

});
app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const [rows] = await pool.query(
            "SELECT * FROM Products WHERE ProductID = ?",
            [productId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});
app.put("/products/:id", async (req, res) => {

    try {
        const productId = req.params.id;
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            `UPDATE Products 
            SET ProductName = ?,
                Price = ?,
                StockQuantity = ?,
                SupplierID = ?
            WHERE ProductID = ?`,
            [ProductName, Price, StockQuantity, SupplierID, productId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product Updated Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "internal server error"
        })
    }
})


app.delete("/products/category", async (req, res) => {
    try {
        await pool.query(`
            ALTER TABLE Products
            DROP COLUMN Category
        `);

        res.json({
            message: "Category column removed successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});
app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM Products WHERE ProductID = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



//Sales ======================
app.post("/sales", async (req, res) => {
    try {
        const { ProductID, QuantitySold, SaleDate } = req.body;

        const [products] = await pool.query(
            `SELECT Price
             FROM Products
             WHERE ProductID = ?`,
            [ProductID]
        );

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const price = products[0].Price;

        const totalAmount = QuantitySold * price;

        const [result] = await pool.query(
            `INSERT INTO Sales
            (ProductID, QuantitySold, SaleDate, TotalAmount)
            VALUES (?, ?, ?, ?)`,
            [ProductID, QuantitySold, SaleDate, totalAmount]
        );

        res.status(201).json({
            message: "Sale recorded successfully",
            SaleID: result.insertId,
            TotalAmount: totalAmount
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});


app.get("/sales", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM Sales"
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/sales/product/:productId", async (req, res) => {
    try {
        const { productId } = req.params;

        const [rows] = await pool.query(
            `SELECT * FROM Sales
             WHERE ProductID = ?`,
            [productId]
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});