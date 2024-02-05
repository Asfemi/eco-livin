const express = require("express");
const {connectTomongo} = require("./db")

const app = express();
const PORT = 8000;

connectTomongo();







app.listen(PORT, () => {
    console.log(`http\\localhost:${PORT}`)
})