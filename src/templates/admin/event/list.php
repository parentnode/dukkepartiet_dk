<?php
global $action;
global $IC;
global $itemtype;

$all_items = $IC->getItems(array("itemtype" => $itemtype, "order" => "published_at ASC"));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Events</h1>

	<ul class="actions i:actions">
		<li class="new"><a href="/admin/<?= $itemtype ?>/new" class="button primary key:n">New event</a></li>
	</ul>

	<div class="all_items i:defaultList taggable filters">
<?		if($all_items): ?>
		<ul class="items">
<?			foreach($all_items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= $item["name"] ?></h3>
				<dl class="info">
					<dt class="published_at">Published at</dt>
					<dd class="published_at"><?= date("Y-m-d H:i", strtotime($item["published_at"])) ?></dd>
				</dl>

				<ul class="actions">
					<li class="edit"><a href="/admin/<?= $itemtype ?>/edit/<?= $item["id"] ?>" class="button">Edit</a></li>
					<li class="delete"></li>
					<li class="status <?= ($item["status"] == 1 ? "enabled" : "disabled") ?>"></li>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No events.</p>
<?		endif; ?>
	</div>

</div>
