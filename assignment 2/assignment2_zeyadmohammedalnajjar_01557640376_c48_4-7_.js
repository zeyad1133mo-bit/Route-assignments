
const path = require("path");
const fs = require("fs");
// os is model byde ma3lomat aan el system
const os = require("os");
// to compress files we use zlib module
const zlib = require("zlib");
const EventEmitter = require("events");
// Q1
function getCurrentFileDir() {
    return {
        // global var
        file: __filename,
        dir: __dirname
    }
}

console.log(getCurrentFileDir());

console.log("============");
// Q2


function getFileName(filePath) {
    return path.basename(filePath);
}
console.log(getFileName("assignments/assignment 1/bouns.js"));

console.log("============");

// Q3 

function buildPath(obj) {
    return path.format(obj);
}
console.log(buildPath({
    dir: "/folder",
    name: "app",
    ext: ".js"
}));
console.log("============");

// Q4
function fileExt(filePath) {
    return path.extname(filePath);

}
console.log(fileExt("/docs/readme.md"));
console.log("============");
// Q5
function pathParse(filePath) {
    const p = path.parse(filePath);
    return {
        name: p.name,
        ext: p.ext
    };
}
console.log(pathParse("/home/app/main.js"))
console.log("============");


// Q6
function isAbso(filePath) {
    return path.isAbsolute(filePath);
}
console.log(isAbso("/home/user/file.txt"));
console.log("============");

// Q7
function joinPath(...filePath) {
    return path.join(...filePath);
}
console.log(joinPath("srs", "component", "app.js"));

console.log("============");

// Q8

function resolvePath(filePath) {
    return path.resolve(filePath);
}
console.log(resolvePath("./ass.js"));
console.log("============");


// Q9

function joinTwoPaths(f1, f2) {
    return path.join(f1, f2);
}
console.log(joinTwoPaths("folder1", "folder/file.txt"));
console.log("============");

// Q10


function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log("Error deleting file");
            return;
        }
        console.log("File deleted successfully");
    })
}

console.log(deleteFile("./file.txt"));
console.log("============");

// Q11

function createFolder(folderName) {
    fs.mkdir(folderName, (err) => {

        return "Folder created successfully";

    });
};
console.log(createFolder("testFolder"));
console.log("============");
// Q12

const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
    console.log("Welcome event triggered");
});
eventEmitter.emit("start");

console.log("============");
// Q13
const emitter = new EventEmitter();
emitter.on("login", (username) => {
    console.log(`User logged in: ${username}`);
});
emitter.emit("login", "zeyad");
console.log("============");

// Q14
function readFile(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log(data);
}
readFile("./notes.txt");
console.log("============");
// Q15

function writeAsync(filePath, data) {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.log("Error writing to file");
            return;
        }
        console.log(" file saved successfully");
    });
}


writeAsync("./async.txt", "Async save");
// Q16

function checkIfExists(filePath) {
    return fs.existsSync(filePath);
}
console.log(checkIfExists("./notes.txt"));



// Q17

function getSystemInfo() {
    return {
        platform: os.platform(),
        arch: os.arch(),

    }
}
console.log(getSystemInfo());




// Q18
const readstream = fs.createReadStream("./big.txt", { encoding: "utf-8" });
readstream.on("data", (chunk) => {
    console.log(chunk);
});
readstream.on("end", () => {
    console.log("Finished Reading");
});



// Q19


const readStream = fs.createReadStream("./source.txt");
const writeStream = fs.createWriteStream("./dest.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied using streams");

});



// Q20
const readStream = fs.createReadStream("./data.txt");
const writeStream = fs.createWriteStream("./data.txt.gz");
const gzip = zlib.createGzip();
readStream.pipe(gzip).pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File compressed successfully");
});






