const file = require("mysql2")
const thefile = file.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ramaz2012@!!',
    database: 'myprojcodes'
})
thefile.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Successfully connected!")
    }
})
const http = require("http")
const express = require("express")
const {Server} = require("socket.io")
const app = express()
app.use(express.static("thefolder"))
const server = http.createServer(app)
const io = new Server(server)
io.on("connection", (socket) => {
    socket.on("add", (number) => {
        thefile.query("INSERT INTO points(number) VALUES(?);", [number], (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Added", result)
            }
        })
    })
})
const PORT = process.env.PORT || 10000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
})
