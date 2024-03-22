const crypto = require('crypto')
const axios = require('axios')

// Function to create signature for Binance API
function createSignature(queryString, apiSecret) {
  return crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex')
}

// Function to get account information
async function getAccountInfo(accessKey, secretKey) {
  const timestamp = Date.now()
  const queryString = `timestamp=${timestamp}`
  const signature = createSignature(queryString, secretKey)
  const response = await axios.get('https://api.binance.com/api/v3/account', {
    headers: {
      'X-MBX-APIKEY': accessKey,
    },
    params: {
      timestamp,
      signature,
    },
  })

  return response.data.balances.filter(item => Number(item.free) > 0)
}

module.exports = (accessKey, secretKey) => getAccountInfo(accessKey, secretKey)
