<?php

$action = $this->actions();

$IC = new Item();
$itemtype = "news";

$all_items = $IC->getItems(array("itemtype" => $itemtype, "order" => "status DESC"));
?>
<div class="scene defaultList <?= $itemtype ?>List">
	<h1>Journal</h1>

	<ul class="actions i:actions">
		<?= $HTML->link("New news post", "/admin/".$itemtype."/new", array("class" => "button primary key:n", "wrapper" => "li.new")) ?>
	</ul>

	<div class="all_items i:defaultList taggable filters">
<?		if($all_items): ?>
		<ul class="items">
<?			foreach($all_items as $item): 
				$item = $IC->getCompleteItem($item["id"]); ?>
			<li class="item item_id:<?= $item["id"] ?> image:<?= $item["image_landscape"] ?> variant:landscape height:100">
				<h3><?= $item["name"] ?></h3>
				<div class="description"><?= $item["description"] ?></div>
				<dl class="info">
					<dt class="client">Client or category</dt>
					<dd class="client"><?= $item["client"] ?></dd>
				</dl>

<?				if($item["tags"]): ?>
				<ul class="tags">
<?					foreach($item["tags"] as $tag): ?>
					<li><span class="context"><?= $tag["context"] ?></span>:<span class="value"><?= $tag["value"] ?></span></li>
<?					endforeach; ?>
				</ul>
<?				endif; ?>

				<ul class="actions">
					<?= $HTML->link("Edit", "/admin/".$itemtype."/edit/".$item["id"], array("class" => "button", "wrapper" => "li.edit")) ?>
					<?= $HTML->deleteButton("Delete", "/admin/cms/delete/".$item["id"], array("js" => true)) ?>
					<?= $HTML->statusButton("Enable", "Disable", "/admin/cms/status", $item, array("js" => true)) ?>
				</ul>
			 </li>
<?			endforeach; ?>
		</ul>
<?		else: ?>
		<p>No news items.</p>
<?		endif; ?>
	</div>

</div>
