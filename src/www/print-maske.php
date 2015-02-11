<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->pageTitle("Dukke Partiet - Print maske");
$page->bodyClass("mask");


$page->page(array(
	"templates" => "pages/mask.php"
));
exit();

?>
