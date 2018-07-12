<?php
global $action;

$IC = new Items();
$itemtype = "bill";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));
?>
<div class="scene i:bill bill red">
	<h1>Lovforslag</h1>

<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): ?>
		<li class="item">
			<p><?= $item["bill"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>