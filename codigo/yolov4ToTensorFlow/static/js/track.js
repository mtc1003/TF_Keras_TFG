window.onload = () => {
	$('#sendbutton').click(() => {
		$("#detecting").css("display", "block");
		videobox = $('#videobox')
		input = $('#videoinput')[0]
		if(input.files && input.files[0])
		{
			let formData = new FormData();
			formData.append('videos' , input.files[0]);
			$.ajax({
				url: "/track/detections", // fix this to your liking
				type:"POST",
				data: formData,
				cache: false,
				processData:false,
				contentType:false,
				error: function(data){
					$("#detecting").css("display", "none");
					console.log("upload error" , data);
					console.log(data.getAllResponseHeaders());
				},
				success: function(){
					let filename = $('input[type=file]').val().split('\\').pop();
					console.log(filename)
					let name = filename.replace(".mp4", "")
					filename = name + "_track" + ".mp4"
					let tarr = filename.split('/');   
					let file = tarr[tarr.length-1]; 
					console.log(file)
					let csv = file
					csv = csv.replace("mp4","csv")
					videobox.attr('src', '..//static//detections//' + file);
					$("#link").css("display", "block");
         			$("#download").attr("href", '..//static//detections//' + file);
					$("#csv").attr("href", '..//static//detections//' + csv);
					$("#detecting").css("display", "none");
					console.log("Fin deteccion")
				}
			});
		}
	});
};



function readUrl(input){
	videobox = $('#videobox')
	console.log("evoked readUrl")
	if(input.files && input.files[0]){
		let reader = new FileReader();
		reader.onload = function(e){		
			videobox.attr('src',e.target.result); 
			videobox.height(500);
			videobox.width(800);
		}
		reader.readAsDataURL(input.files[0]);
	}

	
}