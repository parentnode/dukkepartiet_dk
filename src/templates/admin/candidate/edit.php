<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item = $IC->getCompleteItem(array("id" => $action[1]));
$item_id = $item["id"];
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit candidate</h1>

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
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("area", array("value" => $item["area"])) ?>
				<?= $model->input("link", array("value" => $item["link"])) ?>
				<?= $model->input("responsibilities", array("class" => "autoexpand", "value" => $item["responsibilities"])) ?>
				<?= $model->input("background", array("class" => "autoexpand", "value" => $item["background"])) ?>
			</fieldset>

			<ul class="actions">
				<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button key:esc">Back</a></li>
				<li class="save"><input type="submit" value="Update" class="button primary key:s" /></li>
			</ul>

		</form>
	</div>

	<h2>Media</h2>
	<div class="media i:addMedia">
		<p>Image must be jpg or png.</p>

		<form action="/admin/cms/update/<?= $item_id ?>" class="i:formAddMedia labelstyle:inject" method="post" enctype="multipart/form-data">
			<fieldset>
				<?= $model->input("files") ?>
			</fieldset>

			<ul class="actions">
				<li class="save"><input type="submit" value="Add image" class="button primary" /></li>
			</ul>

		</form>

		<ul class="media">
			<li class="image">
				<h4>Image</h4>
<?		if($item["files"]): ?>
				<img src="/images/<?= $item["id"] ?>/160x.<?= $item["files"] ?>">
<?		else: ?>
				<img src="/images/0/missing/160x.png">
<?		endif; ?>
			</li>
		</ul>

	</div>

</div>
