const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const axios = require('axios')

const handler = async (req, res) => {
  const myIp = await axios({
    method: 'get',
    url: 'https://echo-api.vercel.app/api',
  })
  console.log('myIp', myIp)

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
