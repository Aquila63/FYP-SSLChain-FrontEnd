InboxSDK.load('1', 'sdk_FYP-SSLChain_1241528717').then(function(sdk){

	sdk.Compose.registerComposeViewHandler(function(composeView){

		var originalText;

		/*
		 * Encryption button within the Compose box
		 */

		composeView.addButton({
			title: "Encrypt",
			//Hotlinked since getURL() isn't working for me atm
			iconUrl: 'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Lock-Lock-icon.png',
			//iconUrl: chrome.extension.getURL('Lock-Lock-icon.png'),
			onClick: function(event){
				var recipient = event.composeView.getToRecipients();
				rEmail = recipient[0].emailAddress;
				var xhttp = new XMLHttpRequest();

				//This is executed when the client recieved a response from the server
				xhttp.onreadystatechange = function(){
				  if(xhttp.readyState == 4 && xhttp.status == 200){

				    var key = xhttp.responseText;
					var encrypt = new JSEncrypt();
					encrypt.setPublicKey(key);
					var emailBody = event.composeView.getTextContent();
					originalText = emailBody;
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
				xhttp.send(JSON.stringify({type:1, email:rEmail}));

			},
		});

		/*
		 * Decryption button within the Compose box
		 */

		composeView.addButton({
			title: "Decrypt",
			//Hotlinked since getURL() isn't working for me atm
			iconUrl: 'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Lock-Unlock-icon.png',
			onClick: function(event){
				//Restore the original text from the previous operation
				event.composeView.setBodyText(originalText);
			},
		});
	});


	/*
	 * Decryption button within the Thread view (i.e. a recieved email)
	 * Not persistent - has to be decrypted every time the page is refreshed 
	 */

	sdk.Conversations.registerMessageViewHandler(function(messageView){
		messageView.addToolbarButton({
			section: "MORE",
			title: "Decrypt",
			iconUrl: 'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/128/Lock-Unlock-icon.png',
			onClick: function(event){
				var body = messageView.getBodyElement()
				console.log(body);
				var textToDecrypt = body.innerText;
				var element = $(document).find('[class*="ii gt"] div');
				var xhttp = new XMLHttpRequest();
				var file = "/home/ciaran/fypkeys/genKey5.pem"
				//This is executed when the client recieved a response from the server
				xhttp.onreadystatechange = function(){
					if(xhttp.readyState == 4 && xhttp.status == 200){
						var key = xhttp.responseText;
						var decrypt = new JSEncrypt();
						decrypt.setPrivateKey(key);
						var decryptedText = decrypt.decrypt(textToDecrypt);
						console.log(decryptedText);
						//console.log(element);
						element.html(decryptedText);
					}
				};
				//New HTTP POST request
				xhttp.open("POST", "https://127.0.0.1:8080", true);
				xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
				xhttp.send(JSON.stringify({type:2, data:file}));
			},
		});
	});
});
