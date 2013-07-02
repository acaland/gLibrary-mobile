var path = arguments[0].path;
var typeName = arguments[0].name;

var net = require('net');
var repoName = Alloy.Globals.repository;

//$.activityIndicator.show();
net.apiCall(Alloy.Globals.gateway + "/glibrary/glib" + path, function(response) {
	//Ti.API.info(response);
	var data = [];
	//Ti.API.info(response.records);
	for (var i = 0; i < response.records.length; i++) {
		//Ti.API.info(response.records[i]);
		var row = Ti.UI.createTableViewRow({
			height : 100
		});
		//Ti.API.info(response.records[i]);
		row.metadata = response.records[i];
		var title = response.records[i].FileName;
		row.add(Ti.UI.createLabel({
			text : title,
			left : 90,
			font : {
				fontSize : 16,
				fontWeight : "bold"
			}
		}));
		row.hasChild = true;
		row.add(Ti.UI.createImageView({
			left : 10,
			width : 60,
			borderRadius: 5,
			height: 80,
			image : Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
		}));
		row.id = response.records[i][path + ":FILE"];
		//Ti.API.info(row.id);
		data.push(row);
	}
	$.activityIndicator.hide();
	//Ti.API.info(data);
	//$.browserWindow.title = e.row.children[0].text;
	$.entryBrowserWindow.title = typeName;
	$.itemBrowserTableView.setData(data);
	$.itemBrowserTableView.show();
}); 



function showMetadata(e) {
	var entryDetailWindow = Alloy.createController("entryDetailWindow", {id: e.rowData.id, metadata: e.rowData.metadata}).getView();
	$.entryBrowserWindow.navGroup.open(entryDetailWindow);
	entryDetailWindow.navGroup = $.entryBrowserWindow.navGroup;
}
