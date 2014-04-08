<?php
global $action;

$IC = new Item();
$itemtype = "bill";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene i:scene bill red">

	
	<h1>Lovforslag</h1>

<?	if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): 
			$item = $IC->extendItem($item); ?>
		<li class="item">
			<p><?= $item["bill"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>