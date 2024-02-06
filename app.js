const express = require("express");
const {connectTomongo} = require("./db")
const userRouter = require("./routes/user-routes")

const app = express();
const PORT = 8000;

// Connect to Mongo
connectTomongo();
app.use(express.json());


app.use("/api/user", userRouter)


app.listen(PORT, () => {
    console.log(`http\\localhost:${PORT}`)
})