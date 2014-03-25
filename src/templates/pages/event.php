<?php
global $action;

$IC = new Item();
$itemtype = "event";

$item = $IC->getCompleteItem(array("id" => $action[0]));
$item_id = $item["id"];
?>
<div class="scene events red">

		<ul class="items">
			<li class="item">
				<h3><?= $item["name"] ?></h3>
				<dl class="info">
					<dt class="published_at">Tidspunkt</dt>
					<!--dd class="published_at"><?= date("d.m.y h:i", strtotime($item["published_at"])) ?></dd-->
					<dd class="published_at"><?= date("d.m.y", strtotime($item["published_at"])) ?></dd>
					<dt class="location">Sted</dt>
					<dd class="location"><?= $item["location"] ?></dd>
				</dl>
				<div class="description">
					<p><?= $item["name"] ?></p>
				</div>
			</li>
		</ul>


	</div>
</div>