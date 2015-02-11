<?php
global $action;

$IC = new Items();
$itemtype = "action";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC", "extend" => array("mediae" => true)));
?>
<div class="scene i:action action blue">
	<h2>Aktioner</h2>

<?	if($items): ?>
	<ul class="items">
<?		foreach($items as $item): ?>
		<li class="item image_id:<?= $item["item_id"] ?> image_format:<?= $item["mediae"] ? $item["mediae"]["main"]["format"] : "" ?>">
			<h3><?= $item["name"] ?></h3>
			<p><?= $item["description"] ?></p>
			<a href="<?= $item["link"] ?>"><?= $item["link"] ?></a>
		</li>
<?		endforeach; ?>
		<li class="more"><a href="http://www.youtube.com/channel/UCWHykjLjMYGVjugW0PYsg5w" target="_blank">flere film her</a></li>
	</ul>
<?	else: ?>
	<p class="no_videos">Her kan du snart se videoer fra vores aktioner.</p>
<?	endif; ?>

</div>