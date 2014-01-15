<?php

$action = $this->actions();

$IC = new Item();
$itemtype = "news";

$all_items = $IC->getItems(array("itemtype" => $itemtype, "order" => "status DESC"));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Journal</h1>

	<ul class="actions i:actions">
		<li class="new"><a href="/admin/<?= $itemtype ?>/new" class="button primary key:n">Create news post</a></li>
	</ul>

	<div class="all_items i:defaultList taggable filters">
<?		if($all_items): ?>
		<ul class="items">
<?			foreach($all_items as $item): 
				$item = $IC->getCompleteItem($item["id"]); ?>
			<li class="item item_id:<?= $item["id"] ?> image:<?= $item["image_landscape"] ?> variant:landscape height:100">
				<h3><?= $item["name"] ?></h3>
				<div class="description"><?= $item["description"] ?></div>
				<dl class="info">
					<dt class="client">Client or category</dt>
					<dd class="client"><?= $item["client"] ?></dd>
				</dl>

<?				if($item["tags"]): ?>
				<ul class="tags">
<?					foreach($item["tags"] as $tag): ?>
					<li><span class="context"><?= $tag["context"] ?></span>:<span class="value"><?= $tag["value"] ?></span></li>
<?					endforeach; ?>
				</ul>
<?				endif; ?>

				<ul class="actions">
					<li class="edit"><a href="/admin/<?= $itemtype ?>/edit/<?= $item["id"] ?>" class="button">Edit</a></li>
					<li class="delete">
						<form action="/admin/cms/delete/<?= $item["id"] ?>" class="i:formDefaultDelete" method="post" enctype="multipart/form-data">
							<input type="submit" value="Delete" class="button delete" />
						</form>
					</li>
					<li class="status">
						<form action="/admin/cms/<?= ($item["status"] == 1 ? "disable" : "enable") ?>/<?= $item["id"] ?>" class="i:formDefaultStatus" method="post" enctype="multipart/form-data">
							<input type="submit" value="<?= ($item["status"] == 1 ? "Disable" : "Enable") ?>" class="button status" />
						</form>
					</li>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No news items.</p>
<?		endif; ?>
	</div>

</div>
