<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("mediae" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit introduction</h1>

	<?= $JML->editGlobalActions($item) ?>

	<div class="item i:defaultEdit item_id:<?= $item_id ?>">
		<h2>Introduction</h2>
		<p>Write the introduction text below. The introduction can also link to subpage, if so add a URL.</p>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("text", array("value" => $item["text"])) ?>
				<?= $model->input("url", array("value" => $item["url"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>


</div>
