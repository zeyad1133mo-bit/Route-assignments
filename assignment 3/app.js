

// Q1
// node.js can handle asynchronous without blocking the main thread

// Q2
// libuv mean liberary and it is a library that handles asynchronous I/O operations in Node.js. It provides an event-driven architecture and a thread pool to manage non-blocking I/O operations
//  allowing Node.js to perform tasks like file system operations
// network requests
//  and more without blocking the main execution thread

// Q3
// Node.js handles asynchronous operations by using the Event Loop and Libarary, when operations is start node not wait for it to complete instead it handled by the operating system or the Libuv Thread Pool when necessary when the operation is complete, a callback function is invoked to handle the result of the operation. This allows Node.js to continue executing other code while waiting for the asynchronous operation to finish, making it efficient and non-blocking.

// Q4
//Call Stack: place that keep tracking functions
//Event Loop: mechanism that allows Node.js to handle asynchronous operations
//Event Queue: collection of callbacks that are waiting to be executed

// Q5

//The Thread Pool is a group of threads managed by Libuv to handle some asynchronous operations. Its default size is 4 threads and it can be changed using




// Q6
// blocking code is code that stops the execution of other code until it completes, while non-blocking code allows other code to continue executing while waiting for an operation to finish. In Node.js, blocking code can lead to performance issues and slow down the application, while non-blocking code allows for better scalability and responsiveness.


// part 2


const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.post('/data', (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        const existingUser = users.find(user => user.email === req.body.email);
        if (existingUser) {
            res.status(400).send("Email already exists");
        }
        users.push(req.body);
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).send("Error saving user data");
            } else {
                res.status(200).send("User data saved successfully");
            }
        });
    });
res.json({ message: "User added successfully", user: req.body })

});


app.patch("/user/:id", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);

    });
    const user = users.find(user => user.id == req.params.id);
    if (!user) { return res.status(404).json({ message: "User not found" }); }
    user.name = req.body.name || user.name; user.age = req.body.age || user.age; user.email = req.body.email || user.email;
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).send("Error updating user data");
        } else {
            res.status(200).send("User data updated successfully");
        }

    });
    res.json({ message: "User updated successfully", user });

});


app.delete("/user/:id", (req, res) => {


    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error reading file"
            });
        }
        const users = JSON.parse(data);
        const index = users.findIndex(user => user.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: "User not found" });
        }
        users.splice(index, 1);

    });
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
            res.status(500).send("Error deleting user data");
        } else {
            res.status(200).send("User data deleted successfully");
        }

    });

});


function readUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
}
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}


app.get('/user/getByName', (req, res) => {
    const { name } = req.query;

    const users = readUsers();
    const user = users.find(user => user.name === name);

    if (!user) {
        return res.status(404).json({ message: 'User name not found.' });
    }

    res.json(user);
});

app.get('/user/filter', (req, res) => {
    const minAge = Number(req.query.minAge);

    const users = readUsers();
    const filtered = users.filter(user => user.age >= minAge);

    if (filtered.length === 0) {
        return res.status(404).json({ message: 'no user found' });
    }

    res.json(filtered);
});



app.get('/user', (req, res) => {
    const users = readUsers();
    res.json(users);
});



app.get('/user/:id', (req, res) => {
    const id = Number(req.params.id);

    const users = readUsers();
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});