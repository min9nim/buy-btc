const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require('querystring').encode

const server_url = 'https://api.upbit.com'

module.exports = async function ({ accessKey, secretKey, body, path, method }) {
  const query = queryEncode(body)
  const hash = crypto.createHash('sha512')
  const queryHash = hash.update(query, 'utf-8').digest('hex')

  const payload = {
    access_key: accessKey,
    nonce: uuidv4(),
    ...(body && {
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    }),
  }

  const token = sign(payload, secretKey)
  const result = await axios({
    method,
    url: server_url + path + (body ? '?' + query : ''),
    headers: { Authorization: `Bearer ${token}` },
  })

  return result.data
}
