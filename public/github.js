$(function(){
	var gusername;
	$("#gusername").focus();

	$("#searchform").submit(function(ev){
		ev.preventDefault();
		gusername = $("#gusername").val();

		$.getJSON('https://api.github.com/users/'+gusername).then(function(userData) {

			var avatar = userData.avatar_url;
			var user = userData.name || userData.login;
			var login = userData.login;
			var profileUri = userData.html_url;
			var numFollowing = userData.following;
			// var followingUri = userData.following_url;
			var numFollowers = userData.followers;
			// var followersUri = userData.followers_url;
			var numRepos = userData.public_repos;
			var reposApi = userData.repos_url;
			var userId = userData.id;
			console.log(userData);


			$("#cards").append(`
		    <div class="medium-6 columns">
		      <div class="box">
		        <div class="box-icon">
		          <img class="avatar" src="${avatar}" style="border-radius:50%;" />
		        </div>
		        <div class="info" id="${userId}">
		          <h4 class="text-center">${user}</h4>
		          <a href="${profileUri}" class="button aone" target="_blank">Profile</a>
							<a href="https://github.com/${login}/following" class="button atwo" target="_blank">Following (${numFollowing})</a>
							<a href="https://github.com/${login}/followers" class="button athree" target="_blank">Followers (${numFollowers})</a>

		          <a href="#" class="button afour" target="_blank" style="width:100%;" data-uri="${reposApi}">Public Repos (${numRepos})</a>

		          <ul class="repositories"></ul>

		        </div>
		      </div>
		    </div>`);

				$("#gusername").val('');


		  })

	});



	//get public repos
	$("div:gt(4)").on('click', 'a.button.afour', function(ev){
		ev.preventDefault();
		var reposUri = $(this).data('uri');
		var selectedA = $(this);
		console.log(selectedA);
		selectedA.next().empty();

		$.getJSON(reposUri).then(function(repos){

			// for (i in repos) {
			// 	selectedA.next().append(`<li><a href="${repos[i].html_url}" target="_blank">${repos[i].name}</a></li>`);
			// }

			$.each(repos, function(i, repo){
				selectedA.next().append(`<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);
			});

		})

	});




});
