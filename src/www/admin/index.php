<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();

$page->pageTitle("the Janitor @ e-Types")
?>
<? $page->header(array("type" => "admin")) ?>

<div class="scene front">
	<h1>e-Types Admin</h1>
</div>

<? $page->footer(array("type" => "admin")) ?>