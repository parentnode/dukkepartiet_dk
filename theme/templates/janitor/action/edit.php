<?php
global $action;
global $IC;
global $itemtype;
global $model;

$item_id = $action[1];
$item = $IC->getItem(array("id" => $item_id, "extend" => array("mediae" => true)));
?>
<div class="scene defaultEdit <?= $itemtype ?>Edit">
	<h1>Edit action</h1>

	<?= $JML->editGlobalActions($item) ?>

	<?= $JML->editSingleMedia($item, array("variant" => "main", "label" => "Image")) ?>

	<div class="item i:defaultEdit item_id:<?= $item_id ?>">
		<h2>Action</h2>
		<?= $model->formStart("update/".$item["id"], array("class" => "labelstyle:inject")) ?>

			<fieldset>
				<?= $model->input("name", array("value" => $item["name"])) ?>
				<?= $model->input("link", array("value" => $item["link"])) ?>
				<?= $model->input("description", array("class" => "autoexpand", "value" => $item["description"])) ?>
			</fieldset>

			<?= $JML->editActions($item) ?>

		<?= $model->formEnd() ?>
	</div>

</div>
