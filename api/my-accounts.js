const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')

const handler = async (req, res) => {
  const { accessKey, secretKey } = req.body

  const result = await request({
    method: 'get',
    path: '/v1/accounts',
    accessKey,
    secretKey,
  })

  res.json(result)
}

module.exports = allowCors(handler)
