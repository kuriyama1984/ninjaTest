(function(global, namespace) {
 
    var ns = mamsa.addNamespace(namespace);

    var setEventBox = function () {};
    var pupUpSize = 1;
    var pupUpX = 0;
    var pupUpY = 0;
    var context = null;
    var popUps = [];

    // eventBox is compornent of map which show events or purpose
    setEventBox.prototype = {
        data: null,
        context: null,
        popUp: null,
        // popUp: Object.create(mamsa.setPopUp.prototype),
        init: function (handler) {
            // this.popUp = Object.create(mamsa.setPopUp.prototype)

            this.popUp = Object.create(mamsa.setPopUp.prototype, {
                context: {
                    value: this.context,
                    writable: true,
                    configurable: true,
                    enumerable: true
                }
            });
            this.create(-1, -1, 1, handler);

        },
        create: function (mouseX, mouseY, viewRatio, handler) {

            context = this.context;
            handler.isOnSquare = false;

            for (var id in this.data) {
                var data = this.data[id];

                // view create
                var ele = getComponentElements(data, viewRatio);

                // return 6 when illegall argment 
                if (ele === null) {return 6;}

                // over
                if (isOnSquare(mouseX, mouseY, ele)) {
                    handler.on(data.id);
                    handler.isOnSquare = true;
                    setComponent(ele, data.text, '#FF0000');
                    this.popUp.show(data, viewRatio, handler, mouseX, mouseY);

                // usual
                } else {
                    setComponent(ele, data.text, '#0000FF');
                }
            }

            for (var i = 0; i < popUps.length; i++) {
                popUps[i].show(null, viewRatio, handler);
            }


        },
        AddPopUp: function (mouseX, mouseY, viewRatio, handler) {
            pupUpX = mouseX;
            pupUpY = mouseY;
            // var data = this.data[handler.id];
            if (handler.isOnSquare) {

                createPopUp(this.data[handler.id], context).show(null, viewRatio, handler, mouseX, mouseY);
            }
        }

    };

    // get eventBox position
    var getComponentElements = function (data, viewRatio) {

        if (data) {
            var x = data.x;
            var y = data.y;
            var s = data.s;
            var text = data.text;
            var color = data.color;
        }

        // set size change sizeRatio
        var sizeRatio = viewRatio ? viewRatio * s : s;

        // difine text and squere width
        var textWidth = context.measureText(text).width;
        var squareWidth = textWidth + 20;

        // return position
        return {
            // initial x and y
            xTrans: x,
            yTrans: y,

            // square position
            xLeft: (-1 * (squareWidth / 2) + x) * sizeRatio,
            xCenter: x * sizeRatio,
            xRight: ((squareWidth / 2) + x) * sizeRatio,
            yTop: (-15 + y) * sizeRatio,
            yCenter: y * sizeRatio,
            yBottom: (15 + y) * sizeRatio,

            // width text and square
            wText: textWidth,
            wSuare: squareWidth,

            // ratio and context
            ratio: sizeRatio
        };
    }

    // create comportnent of eventBox
    var setComponent = function (element, text, color) {

        // return initial value of context 
        if (element === null) {
            return null;
        } else {
            sizeRatio = element.sizeRatio;
            xTrans = element.xTrans;
            yTrans = element.yTrans;
            wSuare = element.wSuare;
            wText = element.wText;
        }

        // change size
        context.scale(sizeRatio, sizeRatio);
        context.translate(xTrans, yTrans);

        // drow square
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.strokeRect(-1 * (wSuare / 2), -15, wSuare, 30);

        // drow text
        context.fillStyle = "#000000";
        context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
        context.fillText(text,   -1 * (wText / 2), 8);

        // recover size
        context.translate(-1 * xTrans, -1 * yTrans);
        context.scale(1 / sizeRatio, 1 / sizeRatio);
    };

    // create comportnent of eventBox
    var createPopUp = function (dataObj, ctx) {

        var popUpObj = Object.create(mamsa.setPopUp.prototype, {
            data: {
                value: dataObj,
                writable: true,
                configurable: true,
                enumerable: true
            },
            context: {
                value: ctx,
                writable: true,
                configurable: true,
                enumerable: true
            }
        });

        // popUpObj.init();
        popUps.push(popUpObj);
        return popUpObj;
    };

    // return maximum length of width
    var widthText = function (textArray, context) {

        var widthMax = 0;
        for (var i = 0; i < textArray.length; i++) {

            // select longger width
            var textWidth = context.measureText(textArray[i]).width;
            if (widthMax < textWidth) {
                widthMax = textWidth;
            }
        }

        return widthMax;
    };

    // divide text to segments
    var splitText = function (text) {

        return text.split('¥n');
    };

    // check mouse on the square
    var isOnSquare = function (mouseX, mouseY, position) {

        if (position.xLeft <= mouseX && mouseX <= position.xRight &&
            position.yTop <= mouseY && mouseY <= position.yBottom) {
            return true;
        }
        return false;
    };

   ns.prototype = setEventBox.prototype;

}(this, "mamsa.setEventBox"));