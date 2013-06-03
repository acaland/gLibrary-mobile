$.index.open();
$.downloadWin.getView().currentTab = $.index.activeTab;


if (OS_IOS) {
	
	var loginWindow = Alloy.createController("LoginWindow").getView();
	loginWindow.open();
} else {
	
	var federetionListWindow = Alloy.createController("federationList").getView();
	federetionListWindow.fullscreen = false;
	federetionListWindow.open();
} 


exports.close = function() {
	//Other cleanups here.
	$.index.close();
}