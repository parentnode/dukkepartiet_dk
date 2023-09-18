<?php
global $action;
global $IC;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "extend" => true));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Counters</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New counter")) ?>
	</ul>

	<div class="all_items i:defaultList filters sortable"<?= $HTML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li class="item draggable item_id:<?= $item["id"] ?>">
				<div class="drag"></div>
				<h3><?= $item["name"] ?></h3>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No counters.</p>
<?		endif; ?>
	</div>

</div>
