function popCollect(obj){
function collectItems()
{
    this.name='CollectionFolder'
    }

collectItems.prototype.collect= function()
{
    var targets;
    try{targets=app.project.selection}
    catch(err){alert('请选择')}
    if(targets!=0)
    {
        var folder=app.project.items.addFolder(this.name);
        var equal=true;
        for (i=1;i<targets.length;i++)
        {
           var flag=(targets[i].parentFolder==targets[i-1].parentFolder)
           equal=flag
            }
        if (equal)
        {folder.parentFolder=targets[0].parentFolder}
        }
    for(i=0;i<targets.length;i++)
    {targets[i].parentFolder=folder}
    }
var UI=new collectItems ();
obj.pnl=obj.add ('panel', {x:10,y:10,width:180,height:70}, '当前名字为:'+UI.name,{alignChildren:'fill',orientation:'column'});
//this.pnl.typeIn=this.pnl.add('EditText',{x:15,y:15,width:150,height:30},undefined,{multiline:true})
obj.pnl.btn1=obj.pnl.add('Button',{x:15,y:15,width:65,height:28},'整理项目')
obj.pnl.btn2=obj.pnl.add('Button',{x:90,y:15,width:65,height:28},'更改设置')
//this.pnl.typeIn.onChange=function () {UI.name=this.text}
obj.pnl.btn1.onClick=function() {
    app.beginUndoGroup('整理')
    UI.collect ()
    app.endUndoGroup()
    }
obj.pnl.btn2.onClick=function() {
    UI.name=prompt (undefined, UI.name,'在此输入更改的名字')
    this.parent.text='当前名字为:'+UI.name
    }
}

popCollect(this)