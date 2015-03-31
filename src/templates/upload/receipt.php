<?php
global $slug;
global $slug_upload_receipt;

// $slug = ;
// @include("config/data-".$slug.".php");

//global $slug_upload_receipt;

// now is the time to clear session
$segment = session()->value("segment");
$dev = session()->value("dev");

session()->reset();


session()->value("segment", $segment);
session()->value("dev", $dev);

?>

<div class="scene receipt i:receipt">

	<h1>Tusind tak</h1>
	<p>Vi har nu modtaget din godkendte vælgererklæring.</p>
	<p class="regards">Med venlig hilsen,</p>
	<h2>Dukkepartiet</h2>

	<div class="close"><a href="javascript:window.close();">go back</a></div>

</div>