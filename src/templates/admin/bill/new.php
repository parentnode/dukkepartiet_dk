<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New bill</h1>

	<ul class="actions">
		<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button">Back</a></li>
	</ul>

	<form action="/admin/cms/save/<?= $itemtype ?>" class="i:formDefaultNew labelstyle:inject" method="post" enctype="multipart/form-data">

		<fieldset>
			<?= $model->input("name") ?>
			<?= $model->input("bill", array("class" => "autoexpand")) ?>
		</fieldset>

		<ul class="actions">
			<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button key:esc">Back</a></li>
			<li class="save"><input type="submit" value="Save" class="button primary key:s" /></li>
		</ul>

	</form>

</div>