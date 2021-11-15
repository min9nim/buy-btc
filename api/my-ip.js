const allowCors = require('../src/utils/cors')
const axios = require('axios')

const handler = async (req, res) => {
    const result = await axios({
        method: 'get',
        url: 'https://echo-api.vercel.app/api',
    })
    res.json(result.data)
}

module.exports = allowCors(handler)
