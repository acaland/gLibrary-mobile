

$.index.open();
$.downloadWin.getView().currentTab = $.index.activeTab;

var loginWindow = Alloy.createController("LoginWindow").getView();
loginWindow.open();


 
exports.close = function() {
  //Other cleanups here.
  $.index.close();
}