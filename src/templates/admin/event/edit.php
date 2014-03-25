<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item = $IC->getCompleteItem(array("id" => $action[1]));
$item_id = $item["id"];
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit event</h1>

	<ul class="actions">
		<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button">Back</a></li>
	</ul>

	<div class="status i:defaultEditStatus item_id:<?= $item_id ?>">
		<ul class="actions">
			<li class="status <?= ($item["status"] == 1 ? "enabled" : "disabled") ?>"></li>
		</ul>
	</div>

	<div class="item i:defaultEdit item_id:<?= $item_id ?>">
		<form action="/admin/cms/update/<?= $item_id ?>" class="labelstyle:inject" method="post" enctype="multipart/form-data">

			<fieldset>
				<?= $model->input("published_at", array("value" => date("Y-m-d H:i", strtotime($item["published_at"])))) ?>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("description", array("class" => "autoexpand", "value" => $item["description"])) ?>
				<?= $model->input("location", array("value" => $item["location"])) ?>
			</fieldset>

			<ul class="actions">
				<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button key:esc">Back</a></li>
				<li class="save"><input type="submit" value="Update" class="button primary key:s" /></li>
			</ul>

		</form>
	</div>

</div>
