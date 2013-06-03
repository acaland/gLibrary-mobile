//Alloy.Collections.File.fetch();

var net = require('net');

function downloadFile(e) {
	var url = "http://glibrary.ct.infn.it/dm/vo.indicate-project.eu/infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + e.rowData.title;
	Ti.API.info(url);
	var viewer = Alloy.createController("WebViewer", {
		url : url
	}).getView();
	viewer.title = e.rowData.title;
	$.DownloadWindow.currentTab.open(viewer);
}

function openDetail(e) {
	var item = Alloy.Collections.Demo.at(e.index);
	
	var detailWin = Alloy.createController("ItemDetailWindow", item).getView();
	detailWin.currentTab = $.DownloadWindow.currentTab;
	$.DownloadWindow.currentTab.open(detailWin);
}

function logout() {
	var net = require('net');
	net.loggedIn = false;
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

Ti.App.addEventListener("set:login", function(e) {
	//alert("open fired");
	Ti.API.info("|" + e.username + "|");
	$.username.text = e.username;
});

$.DownloadWindow.addEventListener("focus", function(e) {
	//net.apiCall(Alloy.Globals.gateway + "glibrary/glib/aginfra/Entries/Demo/", function(response) {
	net.apiCall("http://glibrary.ct.infn.it/django/glib/aginfra/Entries/Demo/", function(response) {
		//alert(response.records.length);
		if (response.records.length > 0) {
			//Ti.API.info(JSON.stringify(response.records));
			var records = response.records;
			Alloy.Collections.Demo.reset();
			for (var i = 0; i < records.length; i++) {
				var thumbdata = records[i]["/aginfra/Thumbs:Data"];
				var thumbnail = Ti.Utils.base64decode(thumbdata);
				records[i].Thumbnail = thumbnail;
				var item = Alloy.createModel("Demo", records[i]);
				//Ti.API.info(JSON.stringify(item));
				Alloy.Collections.Demo.add(item);
			}
		}

	})
});
