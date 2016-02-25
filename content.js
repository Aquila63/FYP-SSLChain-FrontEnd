InboxSDK.load('1', 'sdk_FYP-SSLChain_1241528717').then(function(sdk){
	sdk.Compose.registerComposeViewHandler(function(composeView){
		composeView.addButton({
			title: "Test Button",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			//iconUrl: 'Lock-Lock-icon.png',
			onClick: function(event){
				var recipient = event.composeView.getToRecipients();
				rEmail = recipient[0].emailAddress;
				console.log("1");
				var xhttp = new XMLHttpRequest();

				//This is executed when the client recieved a response from the server
				xhttp.onreadystatechange = function(){
				  if(xhttp.readyState == 4 && xhttp.status == 200){

				    var key = xhttp.responseText;
					var encrypt = new JSEncrypt();
					encrypt.setPublicKey(key);
					var emailBody = event.composeView.getTextContent();
					var encryptedText = encrypt.encrypt(emailBody);
					event.composeView.setBodyText(encryptedText);
				  }
				};
				//New HTTP POST request
				xhttp.open("POST", "https://127.0.0.1:8080", true);
				//xhttp.open("POST", "http://127.0.0.1:2048", true);
				//Set the content type so that the server knows the data is formatted w/ JSON
				xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

				//Format the text in the form {email : "<email>"} and send
				xhttp.send(JSON.stringify({email:rEmail}));

			},
		});
	});
});
