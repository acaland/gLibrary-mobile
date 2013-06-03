var firstLoad = true;

var net = require('net');

$.wv.url = arguments[0].url
if (OS_IOS) {
	var loginWindow = arguments[0].navGroup.parentWin;
} else {
	$.IdpLoginWindow.parentWin = arguments[0].parentWin;
}

function hideWv(e) {
	$.wv.hide();
}

function authenticate(e) {

	//Ti.API.info("into load event");
	Ti.API.info("Loaded: " + e.url);
	//Ti.API.info(JSON.stringify(wv.getCookiesForURL(e.url)));
	//loadingInd.hide();
	// log the user out

	var net = require('net');
	Ti.API.info("firstLoad: " + firstLoad);
	Ti.API.info("net.loggedId: " + net.loggedIn);
	Ti.API.info("net.shibCookie: " + net.shibCookie );
	if (firstLoad || net.loggedIn) {
		
		//alert(firstLoad + ":" + net.shibCookie);
		//Ti.API.info("logging out before logging in: " + net.shibCookie);
		//$.wv.evalJS("document.cookie=" + net.shibCookie + "'; expires=Thu, 01-Jan-70 00:00:01 GMT;';");
		//Ti.API.info(wv.evalJS("document.cookie"));
		//net.shibCookie == "";
		//Ti.App.Properties.setString("shibCookie", "");
		firstLoad = false;
		return;
	} else {
		//alert(net.shibCookie);
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
					net.shibCookie = shibCookie;
					if (OS_IOS) {
						loginWindow.close();
					} else {
						$.IdpLoginWindow.parentWin.parentWin.close();
						$.IdpLoginWindow.parentWin.close();
						$.IdpLoginWindow.close();

					}

					//net.setCookie(shibCookie);
					//loginSplitWindow.close();
					var net = require('net');
					net.apiCall(shibCookie, Alloy.Globals.gateway + "/" + "api/login/", function(response) {
						Ti.API.info("logged in");
						//alert("logged as " + response.cn);
						var currentUser = response.cn;
						net.username = currentUser;
						//userInfoLabel.text = "Logged as: "  + response.cn;
						//Ti.App.Properties.setString("username", currentUser);
						Ti.App.fireEvent("set:login", {
							username : currentUser
						});
						Ti.API.info(currentUser);
					});
					net.loggedIn = true;

					//mainSplitWindow.open();
					//populateRepos();
					break;
				}
			}
		}
	}
}