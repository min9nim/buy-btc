# buy-btc
업비트 api 포팅

## 비트코인 시장가 매수

url
```
POST https://buy-btc.vercel.app/api/buy-btc
```

request
```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
    "price": "10000"
  }
}
```

<br/>

## 비트코인 지정가 매수

url
```
POST https://buy-btc.vercel.app/api/buy-btc
```

request
```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
    "side": "bid",
    "volume": "0.00014",
    "price": "72000000",
    "ord_type": "limit"
  }
}
```


## Ref
https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0
