
var net = require("net");
//net.retrieveIdpList("https://indicate-gw.consorzio-cometa.it/shibboleth", function(federations) {





var entityId = Alloy.Globals.gateway + "shibboleth";


net.retrieveIdpList(entityId, function(federations) {
	//Ti.API.info("federations:");
	//Ti.API.info(federations);
	var federationData = [];
	federationData[0] = {title: "All", hasChild: true}
	federationData[0].idps = [];
	for (var i=0; i < federations.length; i++) {
		federationData[0].idps = federationData[0].idps.concat(federations[i].idps);
		federationData[i+1] ={title: federations[i].name, idps: federations[i].idps, color: "black", hasChild: true};
	}
	federationData[0].idps.sort(function(a, b) {
 		var nameA=a.displayName.toLowerCase(), nameB=b.displayName.toLowerCase();
 		if (nameA < nameB) //sort string ascending
  			return -1; 
 		if (nameA > nameB)
  			return 1;
 		return 0; //default return value (no sorting)
	});
	$.federationsTableView.setData(federationData);
	//$.federationsTableView.selectRow(0);
	//$.federationsTableView.fireEvent('click', {rowData:federationData[0]});
});


function openIdpList(e) {
	//Ti.API.info("navGroup: " + JSON.stringify($.federationList.navGroup));
	var idpsData = [];
	//detailNav.open(idpsListWindow);
	for (var i=0; i<e.rowData.idps.length; i++) {
			idpsData[i] = {title: e.rowData.idps[i].displayName, origin: e.rowData.idps[i].origin, color: "black", hasChild: true}
	}
	
	if (OS_IOS) {
		var idpListWindow = Alloy.createController("IdpList", {data: idpsData, navGroup: $.federationList.navGroup}).getView();
		$.federationList.navGroup.open(idpListWindow);
	} else {
		var idpListWindow = Alloy.createController("IdpList", {data: idpsData, parentWin: $.federationList }).getView();
		idpListWindow.fullscreen = false;
		idpListWindow.open();
		
	}
	
}