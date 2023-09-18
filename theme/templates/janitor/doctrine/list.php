<?php
global $action;
global $IC;
global $itemtype;

$items = $IC->getItems(array("itemtype" => $itemtype, "order" => "position ASC", "extend" => true));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Doctrines</h1>

	<ul class="actions">
		<?= $JML->listNew(array("label" => "New doctrine")) ?>
	</ul>

	<div class="all_items i:defaultList filters sortable"<?= $HTML->jsData() ?>>
<?		if($items): ?>
		<ul class="items">
<?			foreach($items as $item): ?>
			<li class="item draggable item_id:<?= $item["id"] ?>">
				<div class="drag"></div>
				<h3><?= $item["name"] ?></h3>

				<?= $JML->listActions($item) ?>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No doctrins.</p>
<?		endif; ?>
	</div>

</div>
