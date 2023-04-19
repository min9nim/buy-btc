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
    currency = 'KRW',
  } = req.query

  if (!accessKey || !secretKey) {
    res.json({ message: 'accessKey & secretKey is required' })
  }

  const result = await request({
    method: 'get',
    path: '/v1/deposits',
    body: {
      currency,
      page,
      limit,
      order_by: orderBy,
    },
    accessKey,
    secretKey,
  })

  const total_amount = result
    .filter(item => item.state === 'ACCEPTED')
    .reduce((acc, item) => acc + Number(item.amount), 0)

  res.json({ total_amount, result })
}

module.exports = allowCors(handleError(handler))
