const express = require('express')
const app = express()
const port = 80

app.post('/buy-btc', async (req, res) => {
    const { accessKey, secretKey, body } = req.body

    const result = await request({
        method: 'post',
        path: '/v1/orders',
        body: {
            market: 'KRW-BTC',
            side: 'bid',

            /* 지정가 */
            // volume: '0.0001442',
            // price: '60000000.0',
            // ord_type: 'limit',

            /* 시장가 매수 */
            volume: null,
            price: '10000',
            ord_type: 'price',
            ...body,
        },
        accessKey,
        secretKey,
    })

    res.json(result)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
