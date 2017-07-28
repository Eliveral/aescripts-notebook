        for (i = app.project.numItems; i > 0; i--) {     //删除处理  重复操作影响    
          x = app.project.item(i);
          if (x.name == "NewComp") {// 遍历项目  若存在该名合成  删除  
            x.remove();
          }
        }
        var myComp = app.project.items.addComp("NewComp", 1920, 1080, 1, 5, 30);//1是像素宽高比 5秒 30帧每秒
        myComp.openInViewer();   
        thisSolid = myComp.layers.addSolid([0, 0, 0], "NewSolid", myComp.width, myComp.height, 1);
        thisAdjust = myComp.layers.addSolid([0, 0, 0], "NewAdjust", myComp.width, myComp.height, 1);
        thisAdjust.adjustmentLayer = true;
        thisLight = myComp.layers.addLight("NewLight", [0, 0]);
        lightTypeArr = [LightType.PARALLEL, LightType.SPOT, LightType.POINT, LightType.AMBIENT];
        thisLight.lightType = lightTypeArr[0]; //四种灯光类型,数组下标从0到3都可以.
        thisCamera = myComp.layers.addCamera("NewCamera", [0, 0]);
        thisPointText = myComp.layers.addText();
        thisPointText.name = "NewPointText";//文字层分为直接创建的点文字以及一个矩形范围内的boxtext()
        thisBoxText = myComp.layers.addBoxText([400, 200]);
        thisBoxText.name = "NewBoxText";
        thisShapeLayer = myComp.layers.addShape();
        thisShapeLayer.name = "NewShapeLayer";
        thisNull = myComp.layers.addNull();
        thisNull.name = "NewNull";
        thisNull.moveToBeginning();
        thisCamera.moveBefore(myComp.layer(2));
        tempNull = myComp.layers.addNull();
        tempNull.remove();

        if (thisSolid.property("ADBE Effect Parade").canAddProperty("ADBE Ramp")) {
          thisRamp = thisSolid.property("ADBE Effect Parade").addProperty("ADBE Ramp");
          thisRamp(2).setValue([0.5, 0.5, 0.5]);
        }

        newMask = thisAdjust.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
        maskShape = newMask(1).value;
        maskShape.vertices = [
          [1000, 500],
          [1000, 800],
          [500, 800],
          [800, 1000]
        ];
        maskShape.inTangents = [
          [100, 5],
          [0, 0],
          [0, 0],
          [0, 0]
        ];
        newMask(1).setValue(maskShape);

        newGroup = thisShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        newGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
        stroke = newGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
        stroke(3).setValue([0, 0, 0]);
        shape = newGroup.property("ADBE Vectors Group").property(1);
        shapeValue = shape(2).value;
        shapeValue.vertices = [
          [1000, 500],
          [1000, 800],
          [500, 800],
          [800, 1000]
        ];
        shapeValue.inTangents = [
          [100, 5],
          [0, 0],
          [0, 0],
          [0, 0]
        ];
        shapeValue.closed = true;
        shape(2).setValue(shapeValue);
        thisShapeLayer.property("ADBE Transform Group")("ADBE Position").setValue([540, 50, 0]);

        thisPointText.selected = true;
        thisBoxText.selected = true;
        firstText = thisPointText.property("ADBE Text Properties")("ADBE Text Document");
        firstValue = firstText.value;
        firstValue.text = "First value";
        firstText.setValue(firstValue);
        firstText = thisBoxText.property("ADBE Text Properties")("ADBE Text Document");
        firstValue = firstText.value;
        firstValue.text = "Second value";
        firstText.setValue(firstValue);

        function cmd(theCommand) {
          app.executeCommand(app.findMenuCommandId(theCommand));
        }
        cmd("Stroke");