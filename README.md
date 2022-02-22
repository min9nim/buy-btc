# buy-btc
업비트 주문하기 api 포팅

## Prerequisite
1. 업비트 api 키 발급시 `주문하기` 권한 필수
2. 허용 IP `61.111.254.203` 

 
<br/>

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

<br/>

## 비트코인 시장가 대비 매수

url
```
POST https://buy-btc.vercel.app/api/buy-btc-diff
```

예시1) 시장가보다 1만원 저렴하게 5만원어치 지정가 매수
request
```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
   "side": "bid",
    "krw_volume": "50000",
    "diff": "-10000"
  }
}
```

예시2) 시장가보다 2만원 비싸게 3만원어치 지정가 매도

request
```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
   "side": "ask",
    "krw_volume": "30000",
    "diff": "20000"
  }
}
```


<br/>

## 비트코인 fear & greed 지수 반영 매수

url
```
POST https://buy-btc.vercel.app/api/buy-btc-fear-greed-index
```

예시) 아래 조건에 따라 시장가 보다 10만원 적은 가격에 지정가 매수 주문.

fear & greed 지수가
1. 20 이하면 3만원어치 매수
1. 50 이하면 2만원어치 매수
1. 70 이하면 1만원어치 매수
1. 70 초과시 매수 안함

<a href="https://alternative.me/crypto/"><img style="width: 100px" src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" /><a>


request
```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
    "~20": "30000",
    "~50": "20000",
    "~70": "10000",
    "~100": "0",
    "diff": "-100000"
  }
}
```

<br/>

## Ref
https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0



