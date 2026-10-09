const { getDB } = require('../config/db');

async function createCollection(name, options = {}) {

    const db = getDB();
    return await db.createCollection(name, options);
}

async function insertOne(collectionName, document) {

    const db = getDB();

    return await db.collection(collectionName).insertOne(document);
}

async function createIndex(collectionName, field) {

    const db = getDB();
    return await db.collection(collectionName).createIndex({ [field]: 1 });
}

async function insertMany(collectionName, documents) {
    const db = getDB();

    return await db.collection(collectionName).insertMany(documents);
}

async function updateOne(collectionName, filter, update) {
    const db = getDB();
    return await db.collection(collectionName).updateOne(filter, update);
}

async function findOne(collectionName, filter) {
    const db = getDB();
    return await db.collection(collectionName).findOne(filter);
}


async function find(collectionName, filter) {
    const db = getDB();
    return await db.collection(collectionName).find(filter).toArray();
}

async function findSkipLimitSort(collectionName, filter, sort, skipValue, limitValue) {
    const db = getDB();
    return await db.collection(collectionName).find(filter).sort(sort).skip(skipValue).limit(limitValue).toArray();
}
 
async function aggregate(collectionName, pipeline) {
    const db = getDB();
    return await db.collection(collectionName).aggregate(pipeline).toArray();
}

module.exports = {
    createCollection,
    insertOne,
    insertMany,
    findOne,
    updateOne,
    createIndex,
    find,
    findSkipLimitSort,
    aggregate
};
