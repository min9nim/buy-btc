const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')

const handler = async (req, res) => {
  const { days = 100 } = req.query
  const result = await axios({
    method: 'post',
    url: 'https://alternative.me/api/crypto/fear-and-greed-index/history',
    data: { days },
  })
  res.json(result.data)
}

module.exports = allowCors(handleError(handler))
