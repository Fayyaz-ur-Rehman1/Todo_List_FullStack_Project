const express = require('express');
const path = require('path');
const app = express();
const port = 3004;

app.use(express.static(path.join(__dirname, 'routes')))
app.get("todoList", (req, res) => {
    res.sendFile(path.join(__dirname, 'routes','index.html'));
})
app.listen(port, () => {
    console.log(`this server is starting with port number ${port}`);
})