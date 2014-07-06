(function(global, namespace) {
 
    var ns = mamsa.addNamespace(namespace);

    var setPopUp = function () {};
    var pupUpSize = 1;
    var context = null;

    // popUp is compornent of map which show events or purpose
    setPopUp.prototype = {
        data: null,
        context: null,
        pupUpX: 0,
        pupUpY: 0,
        show: function (data, viewRatio, handler, mouseX, mouseY) {

            if (data !== null) {
                this.data = data;
            }

            context = this.context;

            this.pupUpX = mouseX ? mouseX: this.pupUpX;
            this.pupUpY = mouseY ? mouseY: this.pupUpY;

            createPopUp(this.data, pupUpSize, this.pupUpX, this.pupUpY);
        }
    };

    // create comportnent of eventBox
    var createPopUp = function (data, pupUpSize, pupUpX, pupUpY) {



        var sizeRatio = pupUpSize;
        var xTrans = pupUpX + 10;
        var yTrans = pupUpY;

        var texts = splitText(data.popUpText);
        var textWidth = widthText(texts, context);

        // change size
        context.scale(sizeRatio, sizeRatio);
        context.translate(xTrans, yTrans);

        // drow square gradation
        var grad  = context.createLinearGradient(0, 0, 0, texts.length * 12 + 16);
        grad.addColorStop(0,'#F5F5F5');
        grad.addColorStop(0.8,'#F5F5F5');
        grad.addColorStop(1,'#C0C0C0');
        context.fillStyle = grad;
        context.fillRect(0, 0, textWidth + 20, texts.length * 12 + 16);

        // drow text
        context.fillStyle = "#000000";
        context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
        for (var i = 0; i < texts.length; i++) {
            context.fillText(texts[i], 8, 20 + (12 * i));
        }

        // recover size
        context.translate(-1 * xTrans, -1 * yTrans);
        context.scale(1 / sizeRatio, 1 / sizeRatio);
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

   ns.prototype = setPopUp.prototype;

}(this, "mamsa.setPopUp"));