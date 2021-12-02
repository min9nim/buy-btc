const allowCors = require('../src/utils/cors')
const request = require('../src/utils/req')
const handleError = require('../src/utils/handle-error')

const handler = async (req, res) => {
  const {
    accessKey,
    secretKey,
  } = req.query

  if(!accessKey || !secretKey){
    res.json({message: 'accessKey & secretKey is required'})
  }

  const result = await request({
    method: 'get',
    path: '/v1/accounts',
    accessKey,
    secretKey,
  })

  res.json(result)
}

module.exports = allowCors(handleError(handler))
