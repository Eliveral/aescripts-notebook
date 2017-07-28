//窗口
var win = new Window("palette", '重名/序列', [0,0,110,100]);
with(win){
	win.et_in = add( "edittext", [5,5,105,25], '1' );  //默认值
	win.bt_rn = add( "button", [5,30,105,57], '重命名' );
	win.bt_sq = add( "button", [5,60,105,87], '序列层' );
}
win.center();
win.show();
//获取当前选中的层
var thisComp,sl;
function selLayer(){
    thisComp=app.project.activeItem;
    if(!(thisComp instanceof CompItem)){
        alert("没有选中合成");
        return false;
    }else if(thisComp.selectedLayers.length<1){
        alert("没有选中层");
        return false;
    }else{
        sl=thisComp.selectedLayers;
        return true;
    }
}


//批量重命名&序列层
win.bt_rn.onClick=function(){
	if(selLayer()==true){
		app.beginUndoGroup("批量重命名");
		var tN=win.et_in.text;
		for(var i=0;i<sl.length;i++){
			sl[i].name=tN+(i+1);
	    }
	    app.endUndoGroup();
    }
}

win.bt_sq.onClick=function(){
	if(selLayer()==true){
		app.beginUndoGroup("序列层");
		var tF=win.et_in.text;
		var fd=thisComp.frameDuration;
		for(var i=0;i<sl.length;i++){
			sl[i].startTime+=i*tF*fd;
	    }
		app.endUndoGroup();
    }
}