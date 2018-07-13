<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();


$page->bodyClass("help_us");
$page->pageTitle("Dukke Partiet - Hjaelp os");


$page->page(array(
	"templates" => "pages/help_us.php"
));
exit();

?>
