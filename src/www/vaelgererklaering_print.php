<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();

function quickGet($var) {
	return utf8_decode(getVar($var));
//	return urlencode(getVar($var));
}

if(getVar("approved") == "1") {


	$host = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]."?";

	$param = "name=".quickGet("name")."&";
	$param .= "address1=".quickGet("address1")."&";
	$param .= "address2=".quickGet("address2")."&";
	$param .= "postal=".quickGet("postal")."&";
	$param .= "city=".quickGet("city")."&";
	$param .= "municipality=".quickGet("municipality")."&";
	$param .= "cpr_1=".quickGet("cpr_1")."&";
	$param .= "cpr_2=".quickGet("cpr_2")."&";
	$param .= "print=1";

	$url = escapeshellarg($host . $param);
	
//	print_r($_SERVER);
 
	// Name of your output image
	$name = PUBLIC_FILE_PATH."/declarations/".time().".pdf";
 
	// Command to execute
	$command = "/srv/sites/wkhtmltopdf -s A4";
 
 	// --width 800
	// Putting together the command for `shell_exec()`
	$ex = "$command $url " . $name;

	print $ex;
	// Generate the image
	// NOTE: Don't forget to `escapeshellarg()` any user input!
	$output = shell_exec($ex);

	print "<br>".$output;
//	header();
	print "generate pdf";
}
else {
	
?>
<!DOCTYPE html>
<html lang="DA">
<head>
	<!-- (c) & (p) e-types.com, 2013 //-->
	<!-- All material protected by copyrightlaws, as if you didnt know //-->
	<title>Dukke Partiet - Vælgererklæring</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="viewport" content="initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<style type="text/css">
		body {margin: 0 auto; width: 850px; font-size: 12px; font-family: Arial;}
		div.form {width: 840px; height: 505px; overflow: hidden; position: relative;
			background: transparent url(/img/temp_standardvaelgererklaering_2480.png) no-repeat bottom left;
			background-size: 100% auto;
		}
		div.form div {position: absolute; overflow: hidden;}
		div.name {left: 85px; top: 132px;}
		div.address1 {left: 85px; top: 165px;}
		div.address2 {left: 85px; top: 197px;}
		div.postal {left: 130px; top: 227px;}
		div.postal span {float: left; padding: 0 15px 0 0;}
		div.city {left: 220px; top: 227px;}
		div.municipality {left: 520px; top: 179px;}
		div.cpr_1 {left: 428px; top: 152px;}
		div.cpr_1 span {float: left; padding: 0 21px 0 0;}
		div.cpr_2 {left: 634px; top: 152px;}
		div.cpr_2 span {float: left; padding: 0 21px 0 0;}
		ul {position: absolute; top: 495px; left: 85px;}
		<? if(getVar("print")) { ?>
			ul {display: none;}
		<? } ?>
	</style>
</head>

<body>

<div class="form">
	<div class="name"><?= getVar("name") ?></div>
	<div class="address1"><?= getVar("address1") ?></div>
	<div class="address2"><?= getVar("address2") ?></div>
	<div class="postal"><span><?= implode("</span><span>", str_split(getVar("postal"))) ?></span></div>
	<div class="city"><?= getVar("city") ?></div>
	<div class="municipality"><?= getVar("municipality") ?></div>
	<div class="cpr_1"><span><?= implode("</span><span>", str_split(getVar("cpr_1"))) ?></span></div>
	<div class="cpr_2"><span><?= implode("</span><span>", str_split(getVar("cpr_2"))) ?></span></div>
</div>

<form name="approve" action="vaelgererklaering_print.php" method="post">
	<input type="hidden" name="approved" value="1">
	<input type="hidden" name="name" value="<?= getVar("name") ?>">
	<input type="hidden" name="address1" value="<?= getVar("address1") ?>">
	<input type="hidden" name="address2" value="<?= getVar("address2") ?>">
	<input type="hidden" name="postal" value="<?= getVar("postal") ?>">
	<input type="hidden" name="city" value="<?= getVar("city") ?>">
	<input type="hidden" name="municipality" value="<?= getVar("municipality") ?>">
	<input type="hidden" name="cpr_1" value="<?= getVar("cpr_1") ?>">
	<input type="hidden" name="cpr_2" value="<?= getVar("cpr_2") ?>">

	<ul class="actions">
		<li><input type="submit" value="Godkend"></li>
	</ul>
</form>

</body>
</html>
<?
}
?>