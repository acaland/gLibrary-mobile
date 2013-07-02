var replicas = arguments[0];

for (var i = 0; i < replicas.length; i++) {
	var ann = Titanium.Map.createAnnotation({
		latitude : replicas[i].lat,
		longitude : replicas[i].lng,
		title : replicas[i].name,
		pincolor : Titanium.Map.ANNOTATION_RED,
		animate : true,
		leftButton : 'storage.png'
	});

	if (replicas[i].enabled == "1") {
		//Ti.API.info(response[i].enabled);
		ann.pincolor = Titanium.Map.ANNOTATION_GREEN;
		ann.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE;
		ann.link = replicas[i].link;
		$.mapview.selectAnnotation(ann);

	}
	//$.mapview.entryID = e.rowData.id;
	$.mapview.addAnnotation(ann);

}

function downloadReplica(e) {
	if (e.clicksource == 'rightButton') {
		Ti.API.info(e.annotation.link);
		var url = Alloy.Globals.gateway + e.annotation.link.split('=')[1].slice(1, -7);
		Ti.API.info(url);
		var fileType = url.substring(url.length - 3);
		var webView = Alloy.createController("WebViewer", {url:url}).getView();
		$.replicaWindow.navGroup.open(webView);
	}
}
