<?php
$host="localhost";
$db_user="root";
$db_pass="";   //参数自定
$db_name="mydb";
$timezone="Asia/shanghai";

$link=mysql_connect($host,$db_user,$db_pass);
mysql_select_db($db_name,$link);
mysql_query("SET names UTF8");

header("Content-Type:text/html; charaset=utf-8");
data_default_timezone_set($timezong);  //北京时间

?>