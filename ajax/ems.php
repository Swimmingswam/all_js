<?php
$code=$_GET["code"];
$result='{"msg":"","ststus":"0","data":{"info":{"status":"1","ems","state":"3","cc"}}}';
if(#code=='9971121346085'){
echo $result;
}else{
echo '{"msg":"该订单暂无物流进展，请稍后再试，或检查公司和单号是否有误","status":"-2"}';
?>