var firstLoad = true;
var loggedIn = false;

$.wv.url = arguments[0].url
var loginWindow = arguments[0].navGroup.parentWin;

function authenticate(e) {

	//Ti.API.info("into load event");
	Ti.API.info("Loaded: " + e.url);
	//Ti.API.info(JSON.stringify(wv.getCookiesForURL(e.url)));
	//loadingInd.hide();
	if (firstLoad || loggedIn) {
		firstLoad = false;
	} else {
		Ti.API.info('check cookies');
		var raw_cookies = $.wv.evalJS("document.cookie");
		Ti.API.info("cookie: " + raw_cookies);
		if (raw_cookies.indexOf("_shibsession_") != -1) {
			Ti.API.info("ho trovato shibsession");
			var cookies = raw_cookies.split(";");
			for ( i = 0; i <= cookies.length - 1; i++) {
				Ti.API.info("cookie -> " + cookies[i]);
				if (cookies[i].indexOf("_shibsession_") != -1) {
					var shibCookie = cookies[i];
					Ti.API.info("Shibboleth Session:" + shibCookie);
					Ti.App.Properties.setString("shibCookie", shibCookie);
					loginWindow.close();
					//net.setCookie(shibCookie);
					//loginSplitWindow.close();

					/*apiCall(shibCookie, gateway + "/api/login/", function(response) {
					 Ti.API.info("logged in");
					 //alert("logged as " + response.cn);
					 currentUser = response.cn;
					 userInfoLabel.text = "Logged as: "  + response.cn;
					 Ti.API.info(currentUser);
					 }); */
					loggedIn = true;

					//mainSplitWindow.open();
					//populateRepos();
					break;
				}
			}
		}
	}
}