<html>
<body>
<?php
$username=$_GET["username"];
$password=$_GET["password"];
$flag=1;
if($flag===1){
echo "�û���".$username."|����".$password;
}else{
echo 0;
}
<script>
parent.document.getElementById("showInfo").innerHTML="ע��ɹ�";
</script>




?>
</body>
</html>