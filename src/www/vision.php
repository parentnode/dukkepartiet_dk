<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("vision");
$page->pageTitle("Dukke Partiet - Vision");


$page->page(array(
	"templates" => "pages/vision.php"
));
exit();

?>
