const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const request = require('../src/utils/req')

const handler = async (req, res) => {
  const {
    accessKey,
    secretKey,
    limit = 100,
    page = 1,
    orderBy = 'desc',
    market = 'KRW-BTC',
    state = 'done',
  } = req.query

  if (!accessKey || !secretKey) {
    res.json({ message: 'accessKey & secretKey is required' })
  }

  const result = await request({
    method: 'get',
    path: '/v1/orders',
    body: {
      market,
      state,
      // states: ['done', 'cancel'],
      page,
      limit,
      order_by: orderBy,
    },
    accessKey,
    secretKey,
  })
  res.json(result)
}

module.exports = allowCors(handleError(handler))
