const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

let users = [
    {firstName: 'Daria', lastName: "DariaSurname", email: "daria@gmail.com", isActive: true},
    {firstName: 'Sofiia', lastName: "SofiiaSurname", email: "sofiia@gmail.com", isActive: false},
    {firstName: 'Jane', lastName: "JaneSurname", email: "jane@gmail.com", isActive: false},
    {firstName: 'Carl', lastName: "CarlSurname", email: "carl@gmail.com", isActive: true},
    {firstName: 'James', lastName: "JamesSurname", email: "james@gmail.com", isActive: false},
    {firstName: 'Maria', lastName: "MariaSurname", email: "maria@gmail.com", isActive: true},
    {firstName: 'Lisa', lastName: "LisaSurname", email: "lisa@gmail.com", isActive: false},
    {firstName: 'Cassie', lastName: "CassieSurname", email: "Cassie@gmail.com", isActive: false},
    {firstName: 'Melissa', lastName: "MelissaSurname", email: "melissa@gmail.com", isActive: true},
    {firstName: 'Ryan', lastName: "RyanSurname", email: "ryan@gmail.com", isActive: false},
];



app.get('/users', (req, res) => {
    res.json(users);
});


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter((user, index) => index !== id);
    res.send('User deleted successfully');
});

app.put('/users/:id', (req, res) => {
    const id =  parseInt(req.params.id);
    users[id] = req.body;
    res.send({"id": id, "user": req.body });
});

app.listen(port, () => console.log(`Listening on port ${port}`));