

function queryDB(){
	event.preventDefault();

	const searchInput = document.querySelector('.search');
	let query = searchInput.value;
	const moviesURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&sort_by=popularity.desc&release_date.desc&query=" + query;	
	
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";

	const configURL = "https://api.themoviedb.org/3/configuration?api_key=" + apiKey;
	
	// get config path
 	let configPath = "";

 	fetch(configURL)
		.then(response=>response.json())
		.then(data=> {
			configPath = data.images.secure_base_url + "w92" ;
		});

	let title = "",
		imgURL = "",
		overview = "";

	// query movie database
	fetch(moviesURL)
	.then(response=>response.json())
	.then(data=>data.results.map(result=> {
			
			title = result.title;

			result.poster_path ?
				imgURL = configPath + result.poster_path :
				imgURL = "#";

			overview = result.overview;

		let html = '<li>' + '<img src="' + imgURL + '">' + title + '</li>';

		resultsList.innerHTML += html;
			
		}));

		
	}