const collectionService = require('../services/collection.service');

async function createBooksCollection(req, res) {
    try {
        await collectionService.createCollection();
        res.status(201).json({
            message: 'Collection created successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating collection'
        });
    }
}

async function createAuthor(req, res) {

    try {
        const result = await collectionService.createAuthor();
        res.status(201).json({
            message: 'Author created successfully',
            authorId: result.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating author'
        });
    }
}

async function createLogsCollection(req, res) {
    try {
        await collectionService.createLogsCollection();

        res.status(201).json({
            message: "Logs capped collection created successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create logs collection",
            error: error.message
        });
    }
}

async function createBooksTitleIndex(req, res) {
    try {
        const indexName = await collectionService.createBooksTitleIndex();

        res.status(201).json({
            message: "Books title index created successfully",
            indexName
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create books title index",
            error: error.message
        });
    }
}

async function insertBook(req, res) {
    try {
        const result = await collectionService.insertBook(req.body);

        res.status(201).json({
            message: "Book inserted successfully",
            bookId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to insert book",
            error: error.message
        });
    }
}
async function insertManyBooks(req, res) {
    try {
        const result = await collectionService.insertManyBooks(req.body);
        res.status(201).json({
            message: "Books inserted successfully",
            insertedCount: result.insertedCount
        });



    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to insert books",
            error: error.message
        });
    }
}
async function insertLog(req, res) {
    try {
        const result = await collectionService.insertLog(req.body);

        res.status(201).json({
            message: "Log inserted successfully",
            logId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to insert log",
            error: error.message
        });
    }
}

async function updateFutureBook(req, res) {
    try {
        const result = await collectionService.updateFutureBook();

        res.status(200).json({ message: "Future Book updated successfully", modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update Future Book",
            error: error.message
        });
    }
}

async function findBookByTitle(req, res) {
    try {
        const title = req.query.title;
        const book = await collectionService.findBookByTitle(title);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to find book",
            error: error.message
        });
    }
}
async function findBooksByYearRange(req, res) {
    try {
        const from = Number(req.query.from);
        const to = Number(req.query.to);

        const books = await collectionService.findBooksByYearRange(from, to);

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to find books",
            error: error.message
        });
    }
}
async function findBooksByGenre(req, res) {
    try {
        const genre = req.query.genre;
        const books = await collectionService.findBooksByGenre(genre);
        res.status(200).json({
            count: books.length,
            books
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to find books by genre",
            error: error.message
        });
    }
}

async function getBookSkipLimit(req, res) {
    try {
        const books = await collectionService.getBookSkipLimit();
        res.status(200).json({
            count: books.length,
            books
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get books",
            error: error.message
        });
    }
}
async function findBooksWithIntegerYear(req, res) {
    try {
        const books = await collectionService.findBooksWithIntegerYear();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to find books",
            error: error.message
        });
    }
}


async function findBooksExcludingGenres(req, res) {
    try {
        const books = await collectionService.findBooksExcludingGenres();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to find books",
            error: error.message
        });
    }
}


async function aggregateBooksAfter2000(req, res) {
    try {
        const books = await collectionService.aggregateBooksAfter2000();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to aggregate books",
            error: error.message
        });
    }
}

async function aggregateBooksProjection(req, res) {
    try {
        const books = await collectionService.aggregateBooksProjection();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to aggregate books",
            error: error.message
        });
    }
}

async function aggregateBooksUnwindGenres(req, res) {
    try {
        const books = await collectionService.aggregateBooksUnwindGenres();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to aggregate books",
            error: error.message
        });
    }
}



async function aggregateBooksWithLogs(req, res) {
    try {
        const books = await collectionService.aggregateBooksWithLogs();

        res.status(200).json({
            count: books.length,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to aggregate books",
            error: error.message
        });
    }
}
module.exports = { createBooksCollection, createAuthor, createLogsCollection, createBooksTitleIndex, insertBook, insertManyBooks, insertLog, updateFutureBook, findBookByTitle, findBooksByYearRange, findBooksByGenre, getBookSkipLimit ,findBooksWithIntegerYear, findBooksExcludingGenres, aggregateBooksAfter2000, aggregateBooksProjection, aggregateBooksUnwindGenres, aggregateBooksWithLogs};