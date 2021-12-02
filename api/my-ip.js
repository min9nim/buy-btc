const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')

const handler = async (req, res) => {
    const result = await axios({
        method: 'get',
        url: 'https://echo-api.vercel.app/api',
    })
    res.json(result.data)
}

module.exports = allowCors(handleError(handler))
