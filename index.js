require('dotenv').config()
require('./dbMongoAtlas')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 3002
const morgan = require('morgan')
const routerRoutes = require('./routes/index.routes')
const ArrayProducts = require('./products/products.Array')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const opcionesMongoose = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.mongodb,
        mongoOptions: opcionesMongoose
    }),
    secret: 'DoudecimoEntregableCoderHouse2021',
    resave: false,
    saveUninitialized: false,
    rolling: true,
 /*    cookie: {
        maxAge: 600000
    } */
}))


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerRoutes)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

const msn = [];
const table = ArrayProducts;

io.on("connection", (socket) => {
    console.log("Usuario Conectado!");

    socket.emit("message_back", msn);
    socket.emit("message_back_table", table);
    socket.on("message_client", (data) => {
        console.log(data);
    });

    socket.on("message_client_table", (data) => {
        console.log(data);
    });

    socket.on("data_client", (data) => {
        msn.push(data);
        msn.reverse()
        /* socket.emit("message_back", msn); */
        io.sockets.emit("message_back", msn)
    });

    socket.on("data_client_table", (data) => {
        console.log('se ingresa a la table');
        table.push(data);
        /* socket.emit("message_back", msn); */
        io.sockets.emit("message_back_table", table)
    });
});

server.listen(port, () => {
    console.log('Servidor Andando en el puerto: ', port);
})
