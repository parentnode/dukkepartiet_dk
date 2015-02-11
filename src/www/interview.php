<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->pageTitle("Dukke Partiet - Dukke møder");
$page->bodyClass("interview");


$page->page(array(
	"templates" => "pages/interview.php"
));
exit();

?>
