<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New candidate</h1>

	<ul class="actions">
		<?= $model->link("Back", "/janitor/".$itemtype."/list", array("class" => "button", "wrapper" => "li.cancel")) ?>
	</ul>

	<?= $model->formStart("/janitor/admin/items/save/".$itemtype, array("class" => "i:formDefaultNew labelstyle:inject")) ?>
		<fieldset>
			<?= $model->input("name") ?>
			<?= $model->input("area") ?>
			<?= $model->input("link") ?>
			<?= $model->input("responsibilities", array("class" => "autoexpand")) ?>
			<?= $model->input("background", array("class" => "autoexpand")) ?>
		</fieldset>

		<ul class="actions">
			<?= $model->link("Back", "/janitor/".$itemtype."/list", array("class" => "button key:esc", "wrapper" => "li.cancel")) ?>
			<?= $model->submit("Save", array("class" => "primary key:s", "wrapper" => "li.save")) ?>
		</ul>
	<?= $model->formEnd() ?>

</div>
