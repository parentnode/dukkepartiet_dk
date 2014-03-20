<?php
global $action;
global $IC;
global $itemtype;
global $model;
?>
<div class="scene defaultNew">
	<h1>New slogan</h1>

	<ul class="actions">
		<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button">Back</a></li>
	</ul>

	<form action="/admin/cms/save/<?= $itemtype ?>" class="i:formDefaultNew labelstyle:inject" method="post" enctype="multipart/form-data">

		<p>Give the slogan a meaningful name, press <em>save</em> and upload your image.</p>
		<fieldset>
			<?= $model->input("name") ?>
		</fieldset>

		<ul class="actions">
			<li class="cancel"><a href="/admin/<?= $itemtype ?>/list" class="button key:esc">Back</a></li>
			<li class="save"><input type="submit" value="Save" class="button primary key:s" /></li>
		</ul>

	</form>

</div>
