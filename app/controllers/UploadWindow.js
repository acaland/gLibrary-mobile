$.progress.show();

function loadFromGallery() {
	Ti.Media.openPhotoGallery({
		success: function(e) {
			$.iv.image = e.media;
		}	
	});
}


function loadFromCamera() {
	Ti.Media.showCamera({
		success: function(e) {
			$.iv.image = e.media;
		}	
	});	
}

function startUpload() {
	if (!$.fileTxt.value) {
		alert("Inserire il nome del file");
		return;
	}
	$.uploadBtn.enabled = false;
	var filename = $.fileTxt.value.replace(/ /g, "_") + ".jpg";
	
	var url = "http://glibrary.ct.infn.it/dm/put/vo.indicate-project.eu/" + filename + 
		"/" + "infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/";
	Ti.API.info(url);
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var response = JSON.parse(xhr.responseText);
		Ti.API.info(JSON.stringify(response));
		if (response.status == "409") {
			alert(response.reason + ": file exists");
		}
		if (response.status == "307") {
			uploadFile(response.redirect);
		}
		Ti.API.info(JSON.stringify(response));
	};
	xhr.onerror = function(e) {
		alert(e);
		$.uploadBtn.enabled = true;
	};
	xhr.open("GET", url);
	xhr.send();
}

function uploadFile(url) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.info(xhr.responseText);
		var filename = $.fileTxt.value.replace(/ /g, "_") + ".jpg";
		var thumbFile = Ti.Filesystem.applicationDataDirectory + filename;
		var f = Ti.Filesystem.getFile(thumbFile);
		f.write($.iv.image.imageAsThumbnail(100, 1, 5));
		var newFile = Alloy.createModel("File", {
			"name": filename,
		    "size": $.iv.image.length,
		    "thumb": thumbFile,
		    "upload_date": new Date()
		});
		newFile.save();
		Alloy.Collections.File.add(newFile);	
		$.uploadBtn.enabled = true;
		$.fileTxt.value = "";
		$.iv.image = "/appicon.png";
		$.progress.value = 0;
	};
	xhr.onerror = function(e) {
		alert(e);
		$.uploadBtn.enabled = true;
	};
	xhr.onsendstream = function(e) {
		Ti.API.info(JSON.stringify(e));
		alert(JSON.stringify(e));
		$.progress.value = e.progress;
	};
	xhr.open("PUT", url);
	xhr.send($.iv.image);
}
