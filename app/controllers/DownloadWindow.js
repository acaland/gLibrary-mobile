Alloy.Collections.File.fetch();

function downloadFile(e) {
	var url = "http://glibrary.ct.infn.it/dm/vo.indicate-project.eu/infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + e.rowData.title;
	Ti.API.info(url);
	var viewer = Alloy.createController("WebViewer", {
		url : url
	}).getView();
	viewer.title = e.rowData.title;
	$.DownloadWindow.currentTab.open(viewer);
}

function logout() {
	var loginWindow = Alloy.createController("LoginWindow").getView();
	loginWindow.open();
}
