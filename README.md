This is the front end for my final year project, submitted as part of the B.A. (Mod) Computer Science degree, Trinity College Dublin, April 2016.

This is a simple Chrome extension using InboxSDK to plug into Gmail, and Nodejs to act as middleware between the back-end and the extension.

Special thanks to the InboxSDK  team (https://www.inboxsdk.com/) for making my life significantly easier and stress-free.

#Installation & Use

Firstly, nodejs is required. To install nodejs, run the following commands:

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo npm install -g npm
```

Next, run `make install` within the root directory - this will install the dependencies required for the nodejs server.

To install the Chrome extension, navigate to `Tools` > `Extensions`. Ensure that Developer Mode is enabled on the top right. Then, click `Load unpacked extension...` and select the root folder for this project.

A valid InboxSDK API key is needed (it's currently tied to my email account). To request one, use the link on this page https://www.inboxsdk.com/docs/, and replace the key on line 1 in `content.js` in the function `InboxSDK.load('1', <API KEY>).then(function(sdk){...}`.

All certificates are hard-coded at the moment. You should generate a new (self-signed) X.509 Certificate; you can run the following command:

`openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365`

To run the extension, simply open Gmail on the registered email address and the API will automatically (buttons should appear in the compose view).

To run the intermediate server, open a terminal window and run `nodejs server/IntermediateServer.js`

Ensure that the back-end is running, also.
