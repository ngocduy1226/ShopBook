const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const { request, application } = require('express');
const session = require('express-session');
const productsRouter = require('./app/routes/product.route');
const accountsRouter = require('./app/routes/account.route');
const brandsRouter = require('./app/routes/brand.route');


const ApiError = require('./app/api-error');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const oneDay = 1000 * 60 * 60 * 24;
app.use(cors());
app.use(express.json());
app.use(session({
    secret: "lamngocduy2001@gmail.com",
    saveUninitialized: true,
    cookie: {maxAge : oneDay},
    resave: false
}))


app.get("/", (req, res) => {
    res.json({ message: "Welcome to product book application." });
});

app.use("/api/products",productsRouter);
app.use("/api/accounts/", accountsRouter);

app.use("/api/brands/", brandsRouter);


// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu
    // Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;