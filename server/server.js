const fs = require('fs')
const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
let router = require('./router')
app.use(bodyParser.json()) //解析json类型的请求体
app.use(router) 
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../Learning/index.html'));
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Listen port:3000...")
});