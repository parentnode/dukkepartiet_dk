<?php

$signature_id = getVar("signature_id");
$values = array();

$info = file(PRIVATE_FILE_PATH."/declarations/".$signature_id);
if($info) {
	foreach($info as $variable) {
		if(strpos($variable, "=")) {
			list($name, $value) = explode("=", trim($variable));
			$values[$name] = $value;
		}
	}
}
else {

$values["name"] = "a";
$values["address1"] = "a";
$values["address2"] = "a";
$values["postal"] = "a";
$values["city"] = "a";
$values["municipality"] = "a";
$values["cpr_1"] = "a";
$values["cpr_2"] = "a";

$values["date_data"] = "a";	
$values["signature_data"] = "a";

//	exit();
	
}

$name            = $values["name"];
$address1        = $values["address1"];
$address2        = $values["address2"];
$postal          = $values["postal"];
$city            = $values["city"];
$municipality    = $values["municipality"];
$cpr_1           = $values["cpr_1"];
$cpr_2           = $values["cpr_2"];

$date_data       = $values["date_data"];
$signature_data  = $values["signature_data"];


?>
<!DOCTYPE html>
<html lang="DA">
<head>
	<!-- (c) & (p) e-types.com, 2013 //-->
	<!-- All material protected by copyrightlaws, as if you didnt know //-->
	<title>Vælgererklæring</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="viewport" content="initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<script type="text/javascript" src="/js/lib/seg_desktop_include.js"></script>
	<style type="text/css">
		body {font-size: 12px; font-family: Arial; margin: 0;}
		div#page {width: 900px; padding: 675px 0 0; background: transparent url(/img/temp_standardvaelgererklaering_2390.png) no-repeat left 170px; background-size: 100% auto;}

		div.form {height: 580px; overflow: hidden; position: relative;}

		div.form * {font-size: 12px;}
		div.form div {position: absolute; overflow: hidden;}
		div.name {left: 85px; top: 149px;}
		div.address1 {left: 85px; top: 187px;}
		div.address2 {left: 85px; top: 220px;}
		div.postal {left: 129px; top: 257px;}
		div.postal span {float: left; padding: 0 14px 0 0; width: 12px;}
		div.city {left: 250px; top: 259px;}
		div.municipality {left: 580px; top: 203px;}
		div.cpr_1 {left: 465px; top: 173px;}
		div.cpr_1 span {float: left; padding: 0 22px 0 0; width: 12px;}
		div.cpr_2 {left: 701px; top: 173px;}
		div.cpr_2 span {float: left; padding: 0 22px 0 0; width: 12px;}


		div.date {top: 293px; left: 70px;
/*			background: red;*/
		}
		canvas.date {width: 151px; height: 25px;}

		div.signature {top: 278px; left: 380px;
/*			background: red;
*/		}
		canvas.signature {width: 250px; height: 41px;}

/*
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
*/

	</style>
</head>

<body>

<div id="page">

	<div class="form">
		<div class="name"><?= $name ?></div>
		<div class="address1"><?= $address1 ?></div>
		<div class="address2"><?= $address2 ?></div>
		<div class="postal"><span><?= implode("</span><span>", str_split($postal)) ?></span></div>
		<div class="city"><?= $city ?></div>
		<div class="municipality"><?= $municipality ?></div>
		<div class="cpr_1"><span><?= implode("</span><span>", str_split($cpr_1)) ?></span></div>
		<div class="cpr_2"><span><?= implode("</span><span>", str_split($cpr_2)) ?></span></div>

		<div class="date">
			<canvas class="date"></canvas>
		</div>
		<div class="signature">
			<canvas class="signature"></canvas>
		</div>
	</div>

</div>


<script type="text/javascript">

	// var date_paths = JSON.parse(("<?= $date_data ?>").replace(/\\/g, ""));
	// var signature_paths = 

	var canvas_signature = u.qs("canvas.signature");

	canvas_signature.width = canvas_signature.offsetWidth;
	canvas_signature.height = canvas_signature.offsetHeight;
	canvas_signature._context = canvas_signature.getContext("2d");
	canvas_signature._context.strokeStyle = "#ee191b";
	canvas_signature._context.lineWidth = 0.5;
	canvas_signature.paths = JSON.parse(decodeURIComponent("<?= $signature_data ?>").replace(/\\/g, ""));


	var canvas_date = u.qs("canvas.date");

	canvas_date.width = canvas_date.offsetWidth;
	canvas_date.height = canvas_date.offsetHeight;
	canvas_date._context = canvas_date.getContext("2d");
	canvas_date._context.strokeStyle = "#ee191b";
	canvas_date._context.lineWidth = 0.5;
	canvas_date.paths = JSON.parse(decodeURIComponent("<?= $date_data ?>").replace(/\\/g, ""));



	// repeat drawing in signature field
	canvas_signature._repeat = function(event) {
		var i, draw;

		this._context.beginPath();

		for(i = 0; i < this.paths.paths.length-1; i++) {
			if(this.paths.paths[i]) {

				this._context.moveTo(this.paths.x_paths[i], this.paths.y_paths[i]);
				this._context.lineTo(this.paths.x_paths[i+1], this.paths.y_paths[i+1]);

				this._context.strokeStyle = this.paths.paths[i];
				this._context.stroke();
			}
			else {
				this._context.closePath();
				if(i < this.paths.paths.length-2) {
					this._context.beginPath();
				}
			}
		}
	}

	// repeat drawing in date field
	canvas_date._repeat = function(event) {
		var i, draw;

		this._context.beginPath();

		for(i = 0; i < this.paths.paths.length-1; i++) {
			if(this.paths.paths[i]) {

				this._context.moveTo(this.paths.x_paths[i]/0.88, this.paths.y_paths[i]/0.88);
				this._context.lineTo(this.paths.x_paths[i+1]/0.88, this.paths.y_paths[i+1]/0.88);

				this._context.strokeStyle = this.paths.paths[i];
				this._context.stroke();
			}
			else {
				this._context.closePath();
				if(i < this.paths.paths.length-2) {
					this._context.beginPath();
				}
			}
		}
	}

	canvas_date._repeat();
	canvas_signature._repeat();
	

//	u.xInObject(JSON.parse(date_date));
	// draw signature

</script>

</body>
</html>