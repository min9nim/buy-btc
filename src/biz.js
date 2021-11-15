const req = require('./utils/req')

async function accounts(){
    const result = await req({
        method: 'get',
        path: "/v1/accounts",
    })
    console.log(result)
}

async function chance(){
    const body = {
        market: 'KRW-BTC'
    }
    const result = await req({body, method: 'get', path:  "/v1/orders/chance"})

    console.log(result.data)
}

async function bid(){
    const body = {
        market: 'KRW-BTC',
        side: 'bid',
        volume: '0.0001442',
        price: '60000000.0',
        ord_type: 'limit',
    }

    const result = await req({body, method: 'post', path:  "/v1/orders"}).catch(e => console.log(e.response.data.error))

    console.log(result)
}

module.exports = {
    accounts,
    chance,
    bid
}
