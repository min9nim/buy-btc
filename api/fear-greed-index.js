const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')

const handler = async (req, res) => {
    const result = await axios({
        method: 'post',
        url: 'https://alternative.me/api/crypto/fear-and-greed-index/history',
        data: {days: 100}
    })
    res.json(result.data)
}

module.exports = allowCors(handleError(handler))
