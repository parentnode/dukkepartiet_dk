<?php
global $action;

$IC = new Items();
$itemtype = "vision";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));
?>
<div class="scene i:vision vision blue">
	<h1>Dukkepartiets vision</h1>

	<div class="container">
<?	if($items): ?>
		<ul>
<?		foreach($items as $item): ?>
			<li><?= $item["vision"] ?></li>
<?		endforeach; ?>
		</ul>
<?	endif; ?>
	</div>

</div>