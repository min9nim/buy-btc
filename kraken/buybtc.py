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
parser.add_argument('--amount', help='dolla amount')
parser.add_argument('--diff', help='diff on current price')

args = parser.parse_args()

print('\n' + time.strftime('%Y.%m.%d %H:%M:%S'))
print('\n==== args ====')
print('key: ' + args.api_key)
print('secret: ' + args.api_secret)
print('amount: ' + args.amount)
print('diff: ' + args.diff)

api_key = args.api_key
api_secret = args.api_secret
amount = float(args.amount)
diff = float(args.diff)

pair = 'XBTUSD'


def get_kraken_signature(urlpath, data, secret):

    postdata = urllib.parse.urlencode(data)
    encoded = (str(data['nonce']) + postdata).encode()
    message = urlpath.encode() + hashlib.sha256(encoded).digest()

    mac = hmac.new(base64.b64decode(secret), message, hashlib.sha512)
    sigdigest = base64.b64encode(mac.digest())
    return sigdigest.decode()


def kraken_request(endpoint, data, api_key, api_secret):
    sig = get_kraken_signature('/0/private/'+endpoint, data, api_secret)

    # Step 4: Prepare headers
    headers = {
        'API-Key': api_key,
        'API-Sign': sig
    }

    # Step 5: Send request
    url = 'https://api.kraken.com/0/private/' + endpoint

    print("\n=== INPUT ===")
    print(url)
    print(headers)
    print(data)

    response = requests.post(url, headers=headers, data=data)

    return response.json()


def buy_btc(api_key, api_secret, amount, diff):
    # Step 1: Get current price
    response = requests.get(
        'https://api.kraken.com/0/public/Ticker?pair='+pair)
    response_json = response.json()
    last_trade_price = float(response_json['result']['XXBTZUSD']['c'][0])
    price = last_trade_price + diff

    # Step 2: Place buy order
    data = {
        'nonce': str(int(time.time() * 1000)),
        'pair': pair,
        'type': 'buy',
        'ordertype': 'limit',
        'price': round(price, 2),
        'volume': round(amount / price, 8),
    }
    return kraken_request('AddOrder', data, api_key, api_secret)


result = buy_btc(api_key, api_secret, amount, diff)
print('\n==== OUTPUT ====')
print('Bought ${amount}.'.format(amount=amount))
print(result)
