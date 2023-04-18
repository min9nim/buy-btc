import time
import base64
import hashlib
import hmac
import requests
import urllib.parse
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--api_key', help='Kraken API key')
parser.add_argument('--api_secret', help='Kraken API secret')
args = parser.parse_args()

api_key = args.api_key
api_secret = args.api_secret

print('\n==== args ====')
print('key: ' + api_key)
print('secret: ' + api_secret)


def kraken_request(endpoint, data, api_key, api_secret):
    # Step 1: Generate nonce
    nonce = int(time.time() * 1000)

    # Step 2: Prepare message
    postdata = urllib.parse.urlencode(data)

    # Step 3: Prepare signature
    encoded = (str(nonce) + postdata).encode()
    message = ('/0/private/' + endpoint +
               hashlib.sha256(encoded).hexdigest()).encode()

    secret_decoded = base64.b64decode(api_secret)
    signature = hmac.new(secret_decoded, message, hashlib.sha512)
    sig_digest = signature.digest()

    # Step 4: Prepare headers
    headers = {
        'API-Key': api_key,
        'API-Sign': sig_digest.hex()
    }

    # Step 5: Send request
    url = 'https://api.kraken.com/0/private/' + endpoint

    print("\n=== INPUT ===")
    print(url)
    print(headers)
    print(data)

    response = requests.post(url, headers=headers, data=data)

    return response.json()


def buy_btc(api_key, api_secret, amount):
    # Step 1: Get current price
    response = requests.get(
        'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD')
    response_json = response.json()
    last_trade_price = response_json['result']['XXBTZUSD']['c'][0]

    # Step 2: Place buy order
    data = {
        'pair': 'XXBTZUSD',
        'type': 'buy',
        'ordertype': 'limit',
        'price': last_trade_price,
        'volume': amount / last_trade_price,
        'oflags': 'fciq'
    }
    response = kraken_request('AddOrder', data, api_key, api_secret)

    print("\n=== OUTPUT ===")
    print(response)

    return response['result']['txid']


amount = 10
txid = buy_btc(api_key, api_secret, amount)
print('Bought {amount} BTC. Transaction ID: {txid}'.format(
    amount=amount, txid=txid))
