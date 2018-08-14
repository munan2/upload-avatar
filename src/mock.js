const Mock = require('mockjs')
const info = require('./mock/info.json')
Mock.mock('/api/getInfo', options => {
    return Mock.mock(info)
})