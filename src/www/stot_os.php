<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("support_us");
$page->pageTitle("Dukke Partiet - Støt os");


$page->page(array(
	"templates" => "pages/support_us.php"
));
exit();

?>
