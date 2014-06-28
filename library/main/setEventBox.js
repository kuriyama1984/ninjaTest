(function(global, namespace) {
 
    var ns = mamsa.addNamespace(namespace);

    var setEventBox = function () {};

    // eventBox is 
    setEventBox.prototype = {
        data: null,
        context: null,
        create: function (mouseX, mouseY, viewRatio, callback) {

            for(var id in this.data){
                var data = this.data[id];

                // view create
                var ele = getComponentElements(data, viewRatio, this.context);

                // return 6 when illegall argment 
                if (ele === null) {return 6;}

                // over
                if (isOnSquare(mouseX, mouseY, ele)) {
                    setComponent(ele, data.text, '#FF0000');
                    callback.on(data.id);

                // usual
                } else {
                    setComponent(ele, data.text, '#0000FF');
                }
            }
        }
    };

    // get eventBox position
    var getComponentElements = function (data, viewRatio, context) {

        if (data) {
            x = data.x;
            y = data.y;
            s = data.s;
            text = data.text;
            color = data.color;
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
            ratio: sizeRatio,
            cxt: context
        };
    }

    // create comportnent of eventBox
    var setComponent = function (element, text, color) {

        // return initial value of context 
        if (element === null || !element.cxt) {
            return null;
        } else {
            context = element.cxt;
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