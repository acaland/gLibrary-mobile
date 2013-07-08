var net = require('net');

Ti.API.info("lastLogin: " + net.lastLogin);
Ti.API.info("shibCookie:" + net.shibCookie);
Ti.API.info("username:" + net.username);

$.index.open();
//$.downloadWin.getView().currentTab = $.index.activeTab;

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
		//Ti.App.fireEvent("set:login", {
		$.username.text =  "Logged as: " + net.username;
		//});
		Ti.API.info("già loggato ");
	}
} else {
	loadLoginWindow();
}

Ti.App.addEventListener('loggedIn', function(e) {
	
	loadTypeList();
	$.username.text = "Logged as: " + e.username;
});

function loadTypeList() {
	Ti.API.info("focused");
	if (net.loggedIn) {
		var url = Alloy.Globals.gateway + 'glibrary/mountTree/' + Alloy.Globals.repository + "/?node=";
		net.apiCall(url + "0" , function(response) {
			//Ti.API.info(response);
			//alert(response);
			var data = [];
			for (var i = 0; i < response.length; i++) {
				var type = {};
				type.title = response[i].text;
				type.isLeaf = response[i].leaf;
				type.name = String(response[i].id);
				type.leftImage = "Folder-Add.png";
				type.height = 60;
				if (!type.isLeaf) {
					net.apiCall(url + response[i].id, function(response) {
						//Ti.API.info(response);
						for (var j = 0; j < response.length; j++) {
							var row = Ti.UI.createTableViewRow();
							row.add(Ti.UI.createLabel({
								text : response[j].text,
								left : 100,
								font : {
									fontSize : 18
								}
							}));
							row.add(Ti.UI.createImageView({
								image : "folder.png",
								width : 50,
								left : 50
							}));
							row.id = "" + response[j].id;
							row.name = response[j].text;
							row.path = response[j].path;
							row.visibleAttrs = response[j].visibleAttrs;
							row.hasChild = true;
							row.height = 60;
							var previousRow = $.typesTableView.getIndexByName(type.name);
							$.typesTableView.insertRowAfter(previousRow, row);
						}
					});
				}
				type.path = response[i].path;
				type.hasChild = true;
				//typesTableView.appendRow(type);
				data.push(type);
			}
			$.typesTableView.setData(data);
			$.repo.title = Alloy.Globals.repository;
			//typesWindow.title = e.row.children[0].text;
			//repoNav.open(typesWindow);
		});
	}
}

function loadEntries(e) {
	Ti.API.info(e.rowData.path);
	var entryBrowser = Alloy.createController("entryBrowserWindow", {path: e.rowData.path, name: e.rowData.name, visibleAttrs: e.rowData.visibleAttrs}).getView();
	entryBrowser.navGroup = $.mainNavGroup;
	$.mainNavGroup.open(entryBrowser);
}

function logout() {
	
	//net.loggedIn = false;
	net.lastLogin = Ti.App.Properties.setDouble("lastLogin", 0);
	net.username = Ti.App.Properties.setString("username", "none");    
	var path = Titanium.Filesystem.applicationDataDirectory;
	var searchKey = path.search('Documents');
	path = path.substring(0, searchKey);
	path = path + 'Library/Cookies/';
	//alert(path);
	var f = Ti.Filesystem.getFile(path + "Cookies.binarycookies");
	f.deleteFile();
	var loginWindow = Alloy.createController("LoginWindow").getView();
	loginWindow.open();
}

exports.close = function() {
	//Other cleanups here.
	$.index.close();
}