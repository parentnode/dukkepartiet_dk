<?php
global $action;

$IC = new Item();
$itemtype = "vision";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>
<div class="scene i:scene vision blue">
	
	<h1>Dukkepartiets vision</h1>

	<div class="container">
<?	if($items): ?>
		<ul>
<?		foreach($items as $item): 
				$item = $IC->extendItem($item); ?>
			<li><?= $item["vision"] ?></li>
<?		endforeach; ?>
		</ul>
<?	endif; ?>
	</div>

</div>