<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("action");
$page->pageTitle("Dukke Partiet - Videoer");


$page->page(array(
	"templates" => "pages/video.php"
));
exit();

?>