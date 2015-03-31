<div class="scene receipt i:error">

	<h1>Der skete en fejl!</h1>

<?	if(message()->hasMessages(array("type" => "error"))): ?>
		<p class="errormessage">
<?		$messages = message()->getMessages(array("type" => "error"));
		message()->resetMessages();
		foreach($messages as $message): ?>
			<?= $message ?><br>
<?		endforeach;?>
		</p>
<?	endif; ?>

	<p>
		Det er vigtigt, at billedet svarer til den trykte vælgererklæring så godt som muligt. 
		Det vil sige, at alt information skal være læseligt.
	</p>

	<p>
		<a href="/upload">Prøv igen</a>.
	</p>

</div>