<?php

$action = $this->actions();

$IC = new Item();
$itemtype = "news";

$model = $IC->typeObject($itemtype);

$item = $IC->getCompleteItem($action[1]);
$item_id = $item["id"];
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit news</h1>

	<ul class="actions">
		<?= $HTML->link("Back", "/janitor/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<div class="status i:defaultEditStatus item_id:<?= $item["id"] ?>">
		<ul class="actions">
			<?= $HTML->statusButton("Enable", "Disable", "/janitor/admin/items/status", $item, array("js" => true)) ?>
		</ul>
	</div>

	<div class="item i:defaultEdit">
		<?= $model->formStart("/janitor/admin/items/update/".$item_id, array("class" => "labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("published_at", array("value" => $item["published_at"])) ?>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("client", array("value" => $item["client"])) ?>
				<?= $model->input("type", array("value" => $item["type"])) ?>
				<?= $model->input("description", array("class" => "autoexpand", "value" => $item["description"])) ?>
				<?= $model->input("article", array("class" => "autoexpand", "value" => $item["article"])) ?>
			</fieldset>

			<ul class="actions">
				<?= $model->link("Back", "/janitor/".$itemtype."/list", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
				<?= $model->submit("Update", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
			</ul>

		<?= $model->formEnd() ?>
	</div>

	<h2>Tags</h2>
	<div class="tags i:defaultTags item_id:<?= $item_id ?>">
		<?= $model->formStart("/janitor/admin/items/update/".$item_id, array("class" => "labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("tags") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("Add tag", array("class" => "primary", "wrapper" => "li.save")) ?>
			</ul>
		<?= $model->formEnd() ?>

		<ul class="tags">
<?		if($item["tags"]): ?>
<?			foreach($item["tags"] as $index => $tag): ?>
			<li class="tag">
				<span class="context"><?= $tag["context"] ?></span>:<span class="value"><?= $tag["value"] ?></span>
			</li>
<?			endforeach; ?>
<?		endif; ?>
		</ul>
	</div>

	<h2>Media</h2>
	<div class="media i:addMedia ">
		<p>Portrait, Square and Landscape required. Optional videos in same proportions.</p>

		<?= $model->formStart("/janitor/admin/items/update/".$item_id, array("class" => "upload labelstyle:inject")) ?>
			<fieldset>
				<?= $model->input("files") ?>
			</fieldset>

			<ul class="actions">
				<?= $model->submit("Add image", array("class" => "primary", "wrapper" => "li.save")) ?>
			</ul>
		<?= $model->formEnd() ?>

		<ul class="media">
			<li class="image portrait">
				<h4>Portrait</h4>
<?		if($item["image_portrait"]): ?>
				<img src="/images/<?= $item["id"] ?>/portrait/x100.<?= $item["image_portrait"] ?>">
<?		else: ?>
				<img src="/images/0/missing/76x100.png">
<?		endif; ?>
			</li>

			<li class="image square">
				<h4>Square</h4>
<?		if($item["image_square"]): ?>
				<img src="/images/<?= $item["id"] ?>/square/x100.<?= $item["image_square"] ?>">
<?		else: ?>
				<img src="/images/0/missing/100x100.png">
<?		endif; ?>
			</li>

			<li class="image landscape">
				<h4>Landscape</h4>
<?		if($item["image_landscape"]): ?>
				<img src="/images/<?= $item["id"] ?>/landscape/x100.<?= $item["image_landscape"] ?>">
<?		else: ?>
				<img src="/images/0/missing/160x100.png">
<?		endif; ?>
			</li>
		</ul>

		<ul class="media">
			<li class="video portrait<?= $item["video_portrait"] ? " i:video" : "" ?>">
				<h4>Portrait</h4>
<?		if($item["video_portrait"]): ?>
				<a href="/videos/<?= $item["id"] ?>/video_portrait/x100.<?= $item["video_portrait"] ?>">video</a>
<?		else: ?>
				<img src="/images/0/missing/76x100.png">
<?		endif; ?>
			</li>

			<li class="video square<?= $item["video_square"] ? " i:video" : "" ?>">
				<h4>Square</h4>
<?		if($item["video_square"]): ?>
				<a href="/videos/<?= $item["id"] ?>/video_square/x100.<?= $item["video_square"] ?>">video</a>
<?		else: ?>
				<img src="/images/0/missing/100x100.png">
<?		endif; ?>
			</li>

			<li class="video landscape<?= $item["video_landscape"] ? " i:video" : "" ?>">
				<h4>Landscape</h4>
<?		if($item["video_landscape"]): ?>
				<a href="/videos/<?= $item["id"] ?>/video_landscape/x100.<?= $item["video_landscape"] ?>">video</a>
<?		else: ?>
				<img src="/images/0/missing/160x100.png">
<?		endif; ?>
			</li>

		</ul>

	</div>

</div>
