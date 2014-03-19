<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$action = $page->actions();

$page->header();
?>

<div class="scene declaration i:declaration">
	<div class="form">
		<div class="name"><?= getVar("name") ?></div>
		<div class="address1"><?= getVar("address1") ?></div>
		<div class="address2"><?= getVar("address2") ?></div>
		<div class="postal"><span><?= implode("</span><span>", str_split(getVar("postal"))) ?></span></div>
		<div class="city"><?= getVar("city") ?></div>
		<div class="municipality"><?= getVar("municipality") ?></div>
		<div class="cpr_1"><span><?= implode("</span><span>", str_split(getVar("cpr_1"))) ?></span></div>
		<div class="cpr_2"><span><?= implode("</span><span>", str_split(getVar("cpr_2"))) ?></span></div>
	</div>

	<form name="approve" action="vaelgererklaering_print.php" method="post">
		<input type="hidden" name="approved" value="1">
		<input type="hidden" name="name" value="<?= getVar("name") ?>">
		<input type="hidden" name="address1" value="<?= getVar("address1") ?>">
		<input type="hidden" name="address2" value="<?= getVar("address2") ?>">
		<input type="hidden" name="postal" value="<?= getVar("postal") ?>">
		<input type="hidden" name="city" value="<?= getVar("city") ?>">
		<input type="hidden" name="municipality" value="<?= getVar("municipality") ?>">
		<input type="hidden" name="cpr_1" value="<?= getVar("cpr_1") ?>">
		<input type="hidden" name="cpr_2" value="<?= getVar("cpr_2") ?>">

		<ul class="actions">
			<li><input type="submit" value="Godkend"></li>
		</ul>
	</form>
</div>

<? $page->footer(); ?>