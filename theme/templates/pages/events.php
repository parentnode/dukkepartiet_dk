<?php
global $action;

$IC = new Items();
$itemtype = "event";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC", "extend" => true));
?>
<div class="scene i:events events red">
	<h1>Kalender</h1>

<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): ?>
		<li class="item">
			<h3><a href="/kalender/<?= $item['item_id'] ?>"><?= $item["name"] ?></a></h3>
			<dl class="info">
				<dt class="published_at">Tidspunkt</dt>
				<dd class="published_at"><?= date("d.m.y", strtotime($item["published_at"])) ?></dd>
				<dt class="location">Sted</dt>
				<dd class="location"><?= preg_replace("/-/", "<br>", $item["location"]) ?></dd>
			</dl>
			<div class="description">
				<p><?= $item["name"] ?></p>
			</div>
		</li>
<?		endforeach; ?>
	</ul>
<?	endif; ?>

</div>