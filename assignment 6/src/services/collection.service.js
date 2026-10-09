const collectionRepository = require('../repositories/collection.repository');

async function createCollection() {
    const options = {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: {
                        bsonType: "string",
                        minLength: 1
                    }
                }
            }
        }
    }

    return await collectionRepository.createCollection('books', options);

}
async function createAuthor() {
    const author = {
        name: "George Orwell",
        nationality: "British"
    }
    return await collectionRepository.insertOne('authors', author);
}

async function createLogsCollection() {
    const options = {
        capped: true,
        size: 1024 * 1024,
    }
    return await collectionRepository.createCollection('logs', options);

}


async function createBooksTitleIndex() {
    return await collectionRepository.createIndex("books", "title");
}


async function insertBook(bookData) {
    return await collectionRepository.insertOne('books', bookData);
}

async function insertManyBooks(booksData) {
    return await collectionRepository.insertMany('books', booksData);
}


async function insertLog(logData) {
    const log = {
        ...logData,
        createdAt: new Date()
    };
    return await collectionRepository.insertOne('logs', log);
}
async function updateFutureBook() {
    return await collectionRepository.updateOne('books',
        { title: "Future" },
        { $set: { year: 2022 } });
}


async function findBookByTitle(title) {
    return await collectionRepository.findOne('books', { title });
}

async function findBooksByYearRange(from, to) {
    return await collectionRepository.find('books', {
        year: { $gte: from, $lte: to }
    });
}

async function findBooksByGenre(genre) {
    return await collectionRepository.find('books', { genres:genre });
}
async function getBookSkipLimit(){
    return await collectionRepository.findSkipLimitSort('books', {},{year:-1},2,3);
}


async function findBooksWithIntegerYear() {
    return await collectionRepository.find('books', {
        year: { $type: "int" }
    });
}

async function findBooksExcludingGenres() {
    return await collectionRepository.find('books', {
        genres: { $nin: ["Horror", "Science Fiction"] }
    });
}


async function aggregateBooksAfter2000() {
    const pipeline = [
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } }
    ];
    return await collectionRepository.aggregate('books', pipeline);
}

async function aggregateBooksProjection() {
    const pipeline = [
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } }
    ];
    return await collectionRepository.aggregate('books', pipeline);
}

async function aggregateBooksUnwindGenres() {
    const pipeline = [
        { $unwind: "$genres" }
    ];
    return await collectionRepository.aggregate('books', pipeline);
}

async function aggregateBooksWithLogs() {
    const pipeline = [
        {
            $lookup: {
                from: "logs",
                localField: "title",
                foreignField: "bookTitle",
                as: "bookLogs"
            }
        }
    ];
    return await collectionRepository.aggregate('books', pipeline);
}
module.exports = { 
    createCollection, 
    createAuthor, 
    createLogsCollection, 
    createBooksTitleIndex,
    insertBook,
    insertManyBooks, 
    insertLog, 
    updateFutureBook,
    findBookByTitle ,
    findBooksByYearRange,
    findBooksByGenre,
    getBookSkipLimit,
    findBooksWithIntegerYear,
    findBooksExcludingGenres,
    aggregateBooksAfter2000,
    aggregateBooksProjection,
    aggregateBooksUnwindGenres,
    aggregateBooksWithLogs
};