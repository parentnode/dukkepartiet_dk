<?
function get_youtube_views($video_ID) {
	$JSON = file_get_contents("https://gdata.youtube.com/feeds/api/videos?q={$video_ID}&alt=json");
	$JSON_Data = json_decode($JSON);
	$views = $JSON_Data->{'feed'}->{'entry'}[0]->{'yt$statistics'}->{'viewCount'};
	return $views;
}
?>			
			<div class="scene primeminister i:primeminister red" id="about">
				
				<!-- Primeminister -->
				<div class="introduction">
					<h2>Er du danmarks næste Statsministerkandidat?</h2>

					<p>Dukkepartiet søger kandidater til rollen som Danmarks næste statsministerkandidat. Derfor har vi brug for DIG. Send os en video og fortæl, hvorfor DU er Dukkepartiets kandidat <a href="/img/jobopslag.pdf">(se jobopslaget)</a>.</p>
 					
 					<p class="send"><a href="mailto:kontakt@dukkepartiet.dk">Indsend</a></p>

					<p>Optag din tale på computer eller smartphone og<br>send filen direkte til os. Du kan også uploade filen på Youtube og sende os linket.</p>
				</div>
				

				<h2>Kandidater</h2>
				<ul class="items">
					<li class="item">
						<?
							//$url = "http://www.youtube.com/watch?v=Q8TXgCzxEnw&feature=relate";
							$url = "https://www.youtube.com/watch?v=KL4g67IFptI";
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];

							//echo get_youtube_views( $my_array_of_vars['v'] );
							//echo "<p>Set ".get_youtube_views($id)." gange</p>";
							//echo '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />';
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3>Peter1 Hansen</h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>

						<a href="<?= $url ?>"><?= $id ?></a>
					</li>


					<li class="item">
						<?
							$url = "youtube.com/watch?v=Q8TXgCzxEnw";
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3>Peter1 Hansen</h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>
						<a href="<?= $url ?>"><?= $id ?></a>
					</li>

					<li class="item">
						<?
							$url = "https://www.youtube.com/watch?v=E9QeMrqE7u8";
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3>Peter1 Hansen</h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>
						<a href="<?= $url ?>"><?= $id ?></a>
					</li>

					<li class="item">
						<?
							$url = "https://www.youtube.com/watch?v=_1NGnVLDPog";
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3>Peter1 Hansen</h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>
						<a href="<?= $url ?>"><?= $id ?></a>
					</li>

					<li class="item">
						<?
							$url = "https://www.youtube.com/watch?v=dD_NdnYrDzY";
							parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
							$id = $my_array_of_vars['v'];
						?>
						<div class="image">
							<?= '<img src="http://img.youtube.com/vi/'.$id.'/0.jpg" />' ?>
						</div>
						<h3>Peter1 Hansen</h3>
						<p>Set <?= get_youtube_views($id) ?> gange</p>
						<a href="<?= $url ?>"><?= $id ?></a>
					</li>

					<!--li class="item">
						<h3>Peter7 Hansen</h3>
						<p>Set 3 gange</p>
						<a href="https://www.youtube.com/watch?v=Q8TXgCzxEnw">https://www.youtube.com/watch?v=Q8TXgCzxEnw</a>
					</li-->


				</ul>
				

				<div class="youtube">
					<div class="close"></div>
					<div class="player"></div>
				</div>

			</div>