<?php
global $action;
global $IC;
global $itemtype;

$all_items = $IC->getItems(array("itemtype" => $itemtype, "order" => "position ASC"));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Actions</h1>

	<ul class="actions i:actions">
		<li class="new"><a href="/admin/<?= $itemtype ?>/new" class="button primary key:n">New action</a></li>
	</ul>

	<div class="all_items i:defaultList taggable filters sortable">
<?		if($all_items): ?>
		<ul class="items targets:draggable" data-save-order="/admin/<?= $itemtype ?>/updateOrder">
<?			foreach($all_items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="item draggable item_id:<?= $item["id"] ?>">
				<div class="drag"></div>
				<h3><?= $item["name"] ?></h3>

				<ul class="actions">
					<li class="edit"><a href="/admin/<?= $itemtype ?>/edit/<?= $item["id"] ?>" class="button">Edit</a></li>
					<li class="delete"></li>
					<li class="status <?= ($item["status"] == 1 ? "enabled" : "disabled") ?>"></li>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No actions.</p>
<?		endif; ?>
	</div>

</div>
