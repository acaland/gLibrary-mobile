
$.idpsTableView.data = arguments[0].data;
var navGroup = arguments[0].navGroup;

function openIdpLoginWindow(e) {
	
	var login_url = "https://gridp.garr.it/ds/WAYF?entityID="+ Alloy.Globals.gateway + "shibboleth&action=selection&origin=";
	//idpsListWindow.setTitle("Back");
	var idpLoginWindow = Alloy.createController("IdpLoginWindow", {url: login_url + e.rowData.origin, navGroup: navGroup}).getView();
	navGroup.open(idpLoginWindow);
	idpLoginWindow.setTitle(e.rowData.title);
	idpLoginWindow.backButtonTitle = 'Back'
	//loginWindow.leftNavButton = Titanium.UI.createButton({title:'Back'});
	//Ti.API.info(e.rowData.origin);
	
	
}