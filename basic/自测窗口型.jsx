function buideUI(obj){                            //obj为Panel时，名字由文件名决定    为Window时  Window 自取名
    var myPanel;
    if(obj instanceof Panel) {
        myPanel=obj;
        }   //此处不是myPanel=Panel myPanel.add("button", [10, 10, 100, 30], "To ol #1");
        else{
        myPanel= new Window("palette","myScript", [0,0,200,120]); //window类型脚本需要中心以及显示函数才会出现 ，可以限制条件  满足条件才弹出
         myPanel.center();
         myPanel.show();}
    //var myPanel=(obj instanceof Panel)?obj:ew Window("palette","myScript", [0,0,200,120]);   写起来更容易    语法System.out.println(i==5?"输出为5":i==3?"成立":"都不相等");
    with(myPanel){    //panel内的内容   
        myPanel.st = add( "statictext", [10,6,60,26], '静态文本' );
       myPanel.et = add( "edittext", [60,6,195,26], '0' );
        myPanel.dl = add( "dropdownlist", [5,31,195,53], undefined, {items: ['选项1','选项2','选项3']} );
        myPanel.cb = add( "checkbox", [5,58,75,78], '复选框' );
       myPanel.bt = add( "button", [5,83,105,115], 'OK' );
    }
    return myPanel;       
}
var win=buideUI(this);   //this应该只有两类  Window或者Panel   函数内做好了区分选项   从此处开始调用，   从window处调用     会给buideUI一个值  用以判断是 Window还是 Panel   Panel不需要center show  会直接调用显示面板  但是window需要
                                      //那反推   给的值就在this 中    所以教程中原来的   obj直接判断instanceceof Panel 就很正常   若是  则将新Window 赋值给myPanel  正常显示buideUI  UI界面
