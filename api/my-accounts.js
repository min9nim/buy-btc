const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const axios = require('axios')

const handler = async (req, res) => {
  const {data: myIp} = await axios({
    method: 'get',
    url: 'https://echo-api.vercel.app/api',
  })
  console.log('myIp', myIp)

  const { accessKey, secretKey, healthCheck } = req.body

  if(healthCheck){
    res.json(myIp)
    return
  }

  const result = await request({
    method: 'get',
    path: '/v1/accounts',
    accessKey,
    secretKey,
  })

  res.json(result)
}

module.exports = allowCors(handler)
