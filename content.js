InboxSDK.load('1', 'sdk_FYP-SSLChain_1241528717').then(function(sdk){
	sdk.Compose.registerComposeViewHandler(function(composeView){
		composeView.addButton({
			title: "Test Button",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			//iconUrl: 'Lock-Lock-icon.png',
			onClick: function(event){
				event.composeView.insertTextIntoBodyAtCursor('It Works!');
				var recipient = event.composeView.getToRecipients();
				console.log(recipient[0].emailAddress);
			},
		});
	});
});
