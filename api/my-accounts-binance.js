const allowCors = require('../src/utils/cors')
const handleError = require('../src/utils/handle-error')
const axios = require('axios')
const crypto = require('crypto')

const handler = async (req, res) => {
  const { accessKey, secretKey, currency } = req.query

  // Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your actual Binance API key and secret
  const API_KEY = accessKey
  const API_SECRET = secretKey

  // Function to create signature for Binance API
  function createSignature(queryString, apiSecret) {
    return crypto
      .createHmac('sha256', apiSecret)
      .update(queryString)
      .digest('hex')
  }

  // Function to get account information
  async function getAccountInfo() {
    try {
      const timestamp = Date.now()
      const queryString = `timestamp=${timestamp}`
      const signature = createSignature(queryString, API_SECRET)
      const response = await axios.get(
        'https://api.binance.com/api/v3/account',
        {
          headers: {
            'X-MBX-APIKEY': API_KEY,
          },
          params: {
            timestamp,
            signature,
          },
        },
      )
      return response.data
    } catch (error) {
      throw new Error(`Error getting account information: ${error.message}`)
    }
  }

  // Function to get BTC balance
  async function getBTCBalance() {
    try {
      const accountInfo = await getAccountInfo()
      const balances = accountInfo.balances
      const btcBalance = balances.find(asset => asset.asset === 'BTC')
      if (btcBalance) {
        return btcBalance.free
      } else {
        return '0' // If no BTC balance found, return 0
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Usage
  const balance = await getBTCBalance()

  res.json({ balance })
}

module.exports = allowCors(handleError(handler))
