<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New event</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<fieldset>
			<?= $model->input("published_at") ?>
			<?= $model->input("name") ?>
			<?= $model->input("description", array("class" => "autoexpand")) ?>
			<?= $model->input("location") ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>

</div>
