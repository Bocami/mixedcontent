var args = require('system').args;

if (args.length === 1) {
    console.log('Please specify the URL to an SSL page.');
    phantom.exit(1);
}

var url = 'https://' + args[1];

var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.18 Safari/537.36';

page.onResourceReceived = function (response) {
    if (response.stage == "start") {
        if (response.url.substr(0, 8) !== "https://" && response.url.substr(0, 5) !== "data:") {
            console.log("ALERT: The secure page " + url + " loaded an insecure asset " + response.url + " which may trigger warnings and hurt customer perception.");
            phantom.exit(2);
        }
    }
};

page.open(url, function(status) {
    if (status === "success") {
        console.log("All good!");
        phantom.exit(0);
    }
    else {
        console.log("Could not open " + url, status);
        phantom.exit(1);
    }
});