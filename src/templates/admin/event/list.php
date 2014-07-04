<?php
global $action;
global $IC;
global $itemtype;

$all_items = $IC->getItems(array("itemtype" => $itemtype, "order" => "published_at ASC"));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Events</h1>

	<ul class="actions i:actions">
		<?= $HTML->link("New event", "/admin/".$itemtype."/new", array("class" => "button primary key:n", "wrapper" => "li.new")) ?>
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
					<?= $HTML->link("Edit", "/admin/".$itemtype."/edit/".$item["id"], array("class" => "button", "wrapper" => "li.edit")) ?>
					<?= $HTML->deleteButton("Delete", "/admin/cms/delete/".$item["id"], array("js" => true)) ?>
					<?= $HTML->statusButton("Enable", "Disable", "/admin/cms/status", $item, array("js" => true)) ?>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No events.</p>
<?		endif; ?>
	</div>

</div>
