const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const request = require('../src/utils/req-v2')

const handler = async (req, res) => {
  const {
    accessKey,
    secretKey,
    limit = 100,
    orderBy = 'desc',
    currency = 'KRW',
  } = req.query

  if (!accessKey || !secretKey) {
    res.json({ message: 'accessKey & secretKey is required' })
  }

  const [result1, result2] = await Promise.all([
    request({
      method: 'get',
      path: '/v1/deposits',
      body: {
        currency,
        page: 1,
        limit,
        order_by: orderBy,
      },
      accessKey,
      secretKey,
    }),
    request({
      method: 'get',
      path: '/v1/deposits',
      body: {
        currency,
        page: 2,
        limit,
        order_by: orderBy,
      },
      accessKey,
      secretKey,
    }),
  ])

  console.log({ res1Length: result1.length, res2Length: result2.length })

  const result = [...result2, ...result1]

  const total_amount = result
    .filter(item => item.state === 'ACCEPTED')
    .reduce((acc, item) => acc + Number(item.amount), 0)

  res.json({ total_amount: total_amount.toLocaleString('ko-KR'), result })
}

module.exports = allowCors(handleError(handler))
