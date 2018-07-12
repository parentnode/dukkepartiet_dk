<?php
global $action;
global $model;


$forward_url = getVar("forward_url");
if($forward_url) {
	session()->value("login_forward", $forward_url);
}


$username = stringOr(getPost("username"));
?>
<div class="scene login i:login">
	<h1>Login</h1>

	<?= $model->formStart("?login=true", array("class" => "labelstyle:inject")) ?>

		<? if(message()->hasMessages()): ?>
		<div class="messages">
		<?
		$all_messages = message()->getMessages();
		message()->resetMessages();
		foreach($all_messages as $type => $messages):
			foreach($messages as $message): ?>
			<p class="<?= $type ?>"><?= $message ?></p>
			<? endforeach;?>
		<? endforeach;?>
		</div>
		<? endif; ?>

		<fieldset>
			<?= $model->input("username", array("required" => true, "value" => $username)); ?>
			<?= $model->input("password", array("required" => true)); ?>
		</fieldset>

		<ul class="actions">
			<?= $model->submit("Log in", array("class" => "primary", "wrapper" => "li.login")) ?>
		</ul>
	<?= $model->formEnd() ?>

</div>