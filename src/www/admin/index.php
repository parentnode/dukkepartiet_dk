<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();

$page->pageTitle("the Janitor @ Dukkepartiet")
?>
<? $page->header(array("type" => "admin")) ?>

<div class="scene front">
	<h1>Dukkepartiet Admin</h1>
</div>

<? $page->footer(array("type" => "admin")) ?>