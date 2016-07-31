var getUser = function() {
	var currentEmail = $('meta[name=viewedProfile]').attr("content");
	return currentEmail;
};
$(document).ready(function(){
	$( '#submit' ).click(function() {
		event.preventDefault();
		var selectedValue = $('input[name=rating]:checked').val();
		var text = $("#commentText").val();
		var currentEmail = getUser();
		console.log(currentEmail);
		console.log(selectedValue);
		console.log(text);
		if (selectedValue != undefined && text != ""){
			var send = new Object();    
			send.currentEmail = currentEmail;
			send.rating = selectedValue;
			send.content = text;

			var sendData= JSON.stringify(send);

			$.ajax({
				url:'/submitComment',
				type:"POST",
				contentType: "application/json",
				dataType:"text",
				data:sendData
			}).done(function(data){
				alert(data);
				location.replace("/user/" + currentEmail);
			});
		}
		else{
			alert("Please have both a rating and a comment before you can submit your review");
		}




	});
});
