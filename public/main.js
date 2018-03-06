		var index = 0;
		var picSrcs = ["https://wallpaperscraft.com/image/star_art_sky_night_people_silhouette_98142_1920x1080.jpg","https://wallpaperscraft.com/image/helix_nebula_space_stars_explosion_brilliance_97908_1920x1080.jpg"]
		
		$(".jumbotron button").on("click", function(){
			index++;
			index %= picSrcs.length;
			
			$(".bgmimick").fadeOut("1000", function(){
				$(this).attr("src", picSrcs[index]);
				$(this).fadeIn("1000");
			});				


		});