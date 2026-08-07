const http = require('http');
const fs = require('fs');
const url = require('url');


const server = http.createServer((req, res) => {
    //POST request to add a new user
    if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
            const found = users.find(user => user.email === newUser.email);
            if (found) {
                res.end(
                    JSON.stringify({ message: 'Email already exists' })
                );
                return;
            }
            newUser.id = users.length + 1;
            users.push(newUser);
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
            res.end(
                JSON.stringify({ message: 'User added successfully' })
            );


        });

    }


    //PATCH request to update a user by ID
    if (req.method === 'PATCH' && req.url === '/users') {
        const id = Number(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const updatedUser = JSON.parse(body);
            const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
            const index = users.findIndex(user => user.id === id);
            if (index === -1) {
                res.end(
                    JSON.stringify({ message: 'User not found' })
                );
                return;
            }
            users[index] = { ...users[index], ...updatedUser };
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
            res.end(
                JSON.stringify({ message: 'User updated successfully' })
            );
        });


    };
    //DELETE request to delete a user by ID

    if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = Number(req.url.split('/')[2]);
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            res.end(
                JSON.stringify({ message: 'User not found' })
            );
            return;
        }
        users.splice(index, 1);
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        res.end(JSON.stringify({ message: 'User deleted successfully' }));


    };
    //GET request to retrieve a user by ID
    if (req.method === 'GET' && req.url === '/users') {
        const id = Number(req.url.split('/')[2]);
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const user = users.find(user => user.id === id);
        if (!user) {
            res.end(
                JSON.stringify({ message: 'User not found' })
            );
            return;
        }
        res.end(JSON.stringify(user));

    }

});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
}); 