var net = require('net');

Ti.API.info("lastLogin: " + net.lastLogin);
Ti.API.info("shibCookie:" + net.shibCookie);
Ti.API.info("username:" + net.username);

$.index.open();
$.downloadWin.getView().currentTab = $.index.activeTab;

 
function loadLoginWindow() {
	if (OS_IOS) {
		var loginWindow = Alloy.createController("LoginWindow").getView();
		loginWindow.open();
	} else {
		var federetionListWindow = Alloy.createController("federationList").getView();
		federetionListWindow.fullscreen = false;
		federetionListWindow.open();
	}
}

if (net.shibCookie) {
	if (new Date() > new Date(net.lastLogin + 3600000)) {
		loadLoginWindow();
	} else {
		net.loggedIn = true;
		Ti.App.fireEvent("set:login", {username: net.username});
		Ti.API.info("già loggato ");
	}
} else {
	loadLoginWindow();
}



exports.close = function() {
	//Other cleanups here.
	$.index.close();
}