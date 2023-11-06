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

## 비트코인 가격 구간별 매수금액 설정

url

```
POST https://buy-btc.vercel.app/api/buy-btc-diff
```

예시) 비트코인 가격이,<br/>
3천만원 이하면 5만원치 매수<br/>
35백만원 이하면 4만원치 매수<br/>
40백만원 이하면 3만원치 매수<br/>
45백만원 이하면 2만원치 매수<br/>
해당 사항 없으면 기본 1만원치 매수<br/>

request

```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
    "side": "bid",
    "krw_volume": "10000",
    "~30000000": "50000",
    "~35000000": "40000",
    "~40000000": "30000",
    "~45000000": "20000",
    "diff": "-10000"
  }
}
```

<br/>

## 비트코인 fear & greed 지수 반영 매수

<a href="https://alternative.me/crypto/">
    <img style="width: 400px;" src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" />
<a>
> fear & greed 지수는 매일 09시에 업데이트.

<br/>
<br/>

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

<br/>
<br/>
<br/>
<br/>

# 크라켄 거래소에서 자동매수

endpoint

```
POST https://buy-btc.vercel.app/api/buy-btc-kraken
```

예시) 비트코인 가격이,<br/>
$25k 이하면 $50 매수<br/>
$27k 이하면 $30 매수<br/>
해당 사항 없으면 기본 $10 매수<br/>
(diff 는 $10 만큼 적은 금액으로 매수 주문)

request payload

```json
{
  "accessKey": "xxx",
  "secretKey": "xxx",
  "body": {
    "usd_volume": "10",
    "~25000": "50",
    "~27000": "30",
    "diff": "-10"
  }
}
```

## 23년 11월 6일 업데이트

기존 proxy 서버 호스팅이 23.11.17 부터 계약 종료됨에 따라 기존 서버(`61.111.254.203`)는 더 이상 사용이 불가합니다.

오늘부터 새롭게 지원 가능한 서버는 아래와 같습니다.

- 새로운 서버 ip: `115.140.124.99`
- 지원 가능 api `POST https://buy-btc.vercel.app/api/buy-btc-diff-v2`
  - 나머지 api 는 모두 지원 종료 예정
