const express = require('express')// this imports express so we can use it

const server = express();

//middleware

server.use(express.json());

let people = [
    {
        id: 1,  
        name: "Eddie Munster",
        bio: "weird monster kid"
    },
    {
        id: 2,  
        name: "Barney Fife",
        bio: "inept deputy" 
    },
    {
        id: 3,
        name: "Tyrion Lanaster",
        bio: "drunken badass"
    }
]

//endpoints

server.get('/api/users', (req, res) => {
    if(people){
    res.status(200).json(people)
    }else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.post('/api/users', (req, res) => {
    const personInfo = req.body;
    if(personInfo.name && personInfo.bio){
    people.push(personInfo);
    res.status(201).json(people);
    }else {res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const person = people.find(person => person.id == id);
    
    if (person){
        res.status(200).json(person);
    }else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

const port = 5000;//sets server port to 5000 (used to be 3000 in React)
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`))//runs console log when server starts