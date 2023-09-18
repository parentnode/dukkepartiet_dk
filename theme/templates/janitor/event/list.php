<?php
global $action;
global $IC;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "published_at DESC", "extend" => true));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Events</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New event")) ?>
	</ul>

	<div class="all_items i:defaultList filters"<?= $HTML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item item_id:<?= $item["id"] ?>">
				<h3><?= $item["name"] ?></h3>
				<dl class="info">
					<dt class="published_at">Published at</dt>
					<dd class="published_at"><?= date("Y-m-d H:i", strtotime($item["published_at"])) ?></dd>
				</dl>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No events.</p>
<?		endif; ?>
	</div>

</div>
