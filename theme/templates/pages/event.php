<?php
global $action;

$IC = new Items();
$itemtype = "event";

$item_id = $action[0];
$item = $IC->getItem(array("id" => $item_id, "extend" => true));

// get previous and next from current item order
$items = $IC->getItems(array("count" => 1, "itemtype" => $itemtype, "status" => 1, "order" => "published_at DESC"));
$next = $IC->getNext($item_id, array("items" => $items));
$prev = $IC->getPrev($item_id, array("items" => $items));
?>
<div class="scene events i:event red">

	<ul class="items">
		<li class="item">
			<h3><?= $item["name"] ?></h3>
			<dl class="info">
				<dt class="published_at">Tidspunkt</dt>
				<dd class="published_at"><span class="date"><?= date("d.m.y", strtotime($item["published_at"])) ?></span> — <span class="time"><?= date("H:i", strtotime($item["published_at"])) ?></span></dd>
				<dt class="location">Sted</dt>
				<dd class="location"><?= $item["location"] ?></dd>
			</dl>
			<div class="description">
				<p><?= $item["description"] ?></p>
			</div>
		</li>
	</ul>

	<ul class="actions">
<? if($next): ?><li class="previous"><a href="/kalender/<?= $next[0]["id"] ?>">Forrige</a></li><? endif; ?>
<? if($prev): ?><li class="next"><a href="/kalender/<?= $prev[0]["id"] ?>">Næste</a></li><? endif; ?>
	</ul>

	<div class="close"><a href="/kalender">go back</a></div>

</div>
