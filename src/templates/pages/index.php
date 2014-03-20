<?php
global $action;

$IC = new Item();
$itemtype = "slogan";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene front i:front">

<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): 
			$item = $IC->extendItem($item); ?>
		<li class="item item_id:<?= $item["item_id"] ?>"><?= $item["name"] ?></li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

	<ul class="actions">
		<li class="next">Næste</li>
		<li class="previous">Forrige</li>
	</ul>

</div>