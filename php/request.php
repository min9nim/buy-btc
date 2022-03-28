<?php
// https://qjadud22.tistory.com/37

$method = $_SERVER["REQUEST_METHOD"];

$url = $method === "POST" ? $_POST['url'] : $_GET['url'];

$ch = curl_init();                                 //curl 초기화
curl_setopt($ch, CURLOPT_URL, $url);               //URL 지정하기
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    //요청 결과를 문자열로 반환
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함

/*
* TODO
*   post 방식 테스트
*   request header 그대로 전달
*/
if($method === "POST"){
    curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);       //POST data
    curl_setopt($ch, CURLOPT_POST, true);              //true시 post 전송
}

$response = curl_exec($ch);
curl_close($ch);

if($response){
    header('Content-type: application/json');
    echo $response;
}else{
    echo curl_getinfo($ch);
}
?>
