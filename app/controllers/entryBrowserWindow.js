var path = arguments[0].path;
var typeName = arguments[0].name;

var net = require('net');
var repoName = Alloy.Globals.repository;

net.apiCall(Alloy.Globals.gateway + "/glibrary/glib" + path, function(response) {
	//Ti.API.info(response);
	var data = [];
	//Ti.API.info(response.records);
	for (var i = 0; i < response.records.length; i++) {
		//Ti.API.info(response.records[i]);
		var row = Ti.UI.createTableViewRow({
			height : 100
		});
		if (repoName === "myTestRepo")
			var title = response.records[i].name
		else
			var title = response.records[i].FileName;
		row.add(Ti.UI.createLabel({
			text : title,
			left : 130,
			font : {
				fontSize : 20,
				fontWeight : "bold"
			}
		}));
		row.hasChild = true;
		row.add(Ti.UI.createImageView({
			left : 5,
			width : 100,
			image : Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
		}));
		row.id = response.records[i][path + ":FILE"];
		//Ti.API.info(row.id);
		data.push(row);
	}
	//Ti.API.info(data);
	//$.browserWindow.title = e.row.children[0].text;
	$.entryBrowserWindow.title = typeName;
	$.itemBrowserTableView.setData(data);
}); 