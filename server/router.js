const fs = require('fs')
const path = require('path')
let express = require('express')
const db = require('./db')
let info = require('./info')
let router = express.Router()
router.post('/saveInfo', (req, res) => {
    res.info = info.saveInfo(req.body)
    setTimeout(() => {
        // res.status(400)
        res.send({
            'status': 1
        })
    }, 500)
})
router.get('/getInfo', (req, res) => {
    // res.info = info.saveInfo(req.body)
    setTimeout(() => {
        // res.status(400)
        res.send({
            'status': 1
        })
    }, 500)
})

module.exports = router;