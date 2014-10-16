<?php
global $action;

$IC = new Item();
$itemtype = "interview";

$items = $IC->getItems(array("itemtype" => $itemtype, "status" => 1, "order" => "position ASC"));
?>


<?
function get_youtube_views($video_ID) {
	$JSON = file_get_contents("https://gdata.youtube.com/feeds/api/videos?q={$video_ID}&alt=json");
	$JSON_Data = json_decode($JSON);
	$views = $JSON_Data->{'feed'}->{'entry'}[0]->{'yt$statistics'}->{'viewCount'};
	return $views;
}
?>
			<div class="scene interview i:interview blue">
				
				<div class="introduction">
					<p>lorem ipsum</p>
				</div>
				

				<h3>Kandidater</h3>

<?			if($items): ?>
				<ul class="items">
<?			foreach($items as $item): 
						$item = $IC->extendItem($item); ?>

					<li class="item">
						<?
							$url = $item["url"];
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3><?= $item["name"] ?></h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>
						<a href="<?= $url ?>"><?= $id ?></a>
					</li>

<?				endforeach; ?>
				</ul>
				
<?			endif; ?>

				<div class="youtube">
					<div class="close"></div>
					<div class="player"></div>
				</div>

			</div>