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
      const ip = await axios
        .get('https://echo-api.vercel.app/api/')
        .then(res => res.data.headers['x-real-ip'])
      throw new Error(`${ip}: ${error.message}`)
    }
  }

  const result = await getAccountInfo()

  res.json(result)
}

module.exports = allowCors(handleError(handler))
