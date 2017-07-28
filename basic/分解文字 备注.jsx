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

//分解文字
app.beginUndoGroup("拆文");
if(selLayer()==true){
    var right=true;
    var a=0;
	for(var i=0;i<sl.length;i++){
		if(sl[i] instanceof TextLayer){
			fff(sl[i]);
		}else{
            right=false;
            a++;
         }
    }
    if(right==false)
    {
        //alert("手贱点到非文字层了我跟你说");
        var r=confirm("手贱点到"+a+"个" + '\n' + "非文字层了我跟你说");//不在循环内跳出alert  但是可以返回一个判断值  存在改变值时候  再循环结束时执行alert
        
        if(r==true)//   这里是双等于号  ==  不是赋值！！
        {alert("乖","star sky");}
        else 
        {
          //alert ("不乖哦", "victory");
           var name;
          name=prompt("是否保留该层","CG")  
          if(name!=null&&name!=""&&name!="Eliveral")
          {alert("嘿"+name+"皮痒啦")}  
         }; //个人添加测试   int型输出 var变量  需要"+a+"才行了
       }
    }
app.endUndoGroup();

function fff(layer){
	var thisText=layer('ADBE Text Properties')('ADBE Text Document').value.toString();//（雾）将循环内的单层文字层转移给thisText;   thisText.length  文字长度  （雾）只是获取内容  用于命名 （）字符串长度来判断拆分循环次数 获取内容用于对应长度命名
	for(var t=0;t<thisText.length;t++){
     // for(int t=0;t<thisText.length;t++){
          
	//for(var t=thisText.length;t>=0;t--){

		//dl=layer.duplicate();      //复制选中层  拷贝   直接生成层   
         var dl=layer.duplicate();  //写法错误
		dl.name=thisText.substr(t,1);       //（雾）substring   一共多少个中的第几个    并不是 text的名字  而是text的内容 （）t本身就为第几个，1是从第几个开始的持续为1的选中   
		var ani=dl('ADBE Text Properties')('ADBE Text Animators').addProperty('ADBE Text Animator');  //空的动画属性节    再加入 动画属性中的透明
		var opa=ani('ADBE Text Animator Properties').addProperty('ADBE Text Opacity');//addProperty90只包括加入的最后一个分支     但是之前的分支需要表现出来    
		opa.setValue(0);//（）所有属性归0    opa(1).setvalue=0?
         
      //  opa(9).setValue(100)为错;
		var sel=ani('ADBE Text Selectors').addProperty('ADBE Text Expressible Selector'); //选择器中的
		sel(2).expression="selectorValue*(textIndex != "+(t+1)+")";//生成的顺序   不为t+1个字的  的opa属性都是0   只有t+1不是
       // sel(2).expression="selectorValue*(textIndex != "(t+1)")";
	}
    if(app.version>="10"){layer.label=14}  //标签  CS4之前没有功能    version=10   CS5  label(标签) 
	layer.enabled=false;//眼睛关闭  不显示
}