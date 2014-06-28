(function(global, namespace) {
 
    var ns = mamsa.addNamespace(namespace);

    // ページの読み込みが完了したら処理をする
    window.addEventListener("load", function() {

        var canvasObj = mamsa.canvas.init();

        // 2Dコンテキストの取得
        ctx = canvasObj.getContext("2d");

        // move event
        canvasObj.addEventListener("mousemove", function(e) {

            // background
            mamsa.canvas.back();

            // get mouse position
            var mousePosition = getMousePosition(e);

            eventBox.create(mousePosition.x, mousePosition.y, 1, callback);

        }, true);

        // get mouse position
        var getMousePosition = function (e) {
            var clickX = (e.clientX) ? e.clientX : e.pageX;
            var clickY = (e.clientY) ? e.clientY : e.pageY;
            var rect = e.target.getBoundingClientRect();
            return {x: clickX - rect.left, y: clickY - rect.top};
        };

        var callback = {
            on: function (id) {
                console.log('callback ' + id);
            }
        };

        // background
        mamsa.canvas.back();

		mamsa.canvas.circle(100, 100, 30, 1, Math.atan2(20, 20)/Math.PI*180, 1, "hellow", "#0000FF");


		// mamsa.canvas.eventBox(200, 200, 1, 'this is test', '#0000FF');
		// mamsa.canvas.eventBox(100, 100, 2, 'あいうえお', '#0000FF');
		// mamsa.canvas.eventBox(200, 260, 1, 'this is test　ああああああああああ', '#0000FF');
		// mamsa.canvas.eventBox(200, 290, 1, '', '#0000FF');

        var dataObj = {
            id001: {
                id: '001',
                x: 300,
                y: 100,
                s: 1,
                text: 'test aaaa',
                color: '#0000FF'
            },
            id002: {
                id: '002',
                x: 300,
                y: 200,
                s: 1,
                text: 'test bb あああ',
                color: '#FF0000'
            }
        }

		var eventBox = Object.create(mamsa.setEventBox.prototype, {
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
		// console.log(eventBox);
		eventBox.create(-1, -1, 1, callback);
        //eventBox.create(mouseX, mouseY, viewRatio, callback);

    }, true);

}(this, "mamsa.map"));