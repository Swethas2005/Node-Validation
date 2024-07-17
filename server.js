const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom validation middleware
const validateRequestBody = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    const isNumber = (value) => typeof value === 'number';
    const isString = (value) => typeof value === 'string';
    const isArrayofStrings = (value) => Array.isArray(value) && value.every(isString);

    if (!isNumber(ID) || !isString(Name) || !isNumber(Rating) ||
        !isString(Description) || !isString(Genre) || !isArrayofStrings(Cast)) {
        return res.status(400).send("bad request. some data is incorrect.");
    }

    next();
};

// POST route
app.post('/', validateRequestBody, (req, res) => {
    res.status(200).send("data received");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
