<?php
global $action;

$IC = new Items();
$itemtype = "doctrine";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => true));
?>
<div class="scene program i:program red">
	<h2>Program</h2>

<?	if($items): ?>
	<ul class="items i:carousel">
<?		foreach($items as $item): ?>
		<li class="item">
			<p><?= $item["doctrine"] ?></p>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>