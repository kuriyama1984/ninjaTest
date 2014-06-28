(function(global, namespace) {

    var ns = mamsa.addNamespace(namespace);
    var context;
    var canvasObj;
    var globalRatio = 1;


	// get mouse position
    ns.getMousePosition = function (e) {
		var clickX = (e.clientX) ? e.clientX : e.pageX;
		var clickY = (e.clientY) ? e.clientY : e.pageY;
		var rect = e.target.getBoundingClientRect();
		return {x: clickX - rect.left, y: clickY - rect.top};
	};


    ns.init = function () {
        var ele = document.getElementById("status");
        // Canvasが使えるか調べる
        if (!window.HTMLCanvasElement) {
            ele.innerHTML = "Canvasが使用できません";
            return null;
        }
        // Canvasの要素
        canvasObj = document.getElementById("myCanvas");
        // 2Dコンテキストの取得
        context = canvasObj.getContext("2d");
        if (!context) {
            ele.innerHTML = "2Dコンテキストが取得できません";
            return null;
        }
        return canvasObj;
    };

    ns.back = function () {
        // 背景を描画する
        /* グラデーション領域をセット */
        var grad  = context.createLinearGradient(0, 0, 0, 1600);
        grad.addColorStop(0,'#FFFFE0');
        grad.addColorStop(0.3,'#FFFFFF');
        grad.addColorStop(0.7,'#FFFFFF');
        grad.addColorStop(1,'#FFFFE0');
        context.fillStyle = grad;
        context.fillRect(0,0, canvasObj.width, canvasObj.height);
    };

    ns.circle = function (x, y, r, stretch, rotate, s, text, color) {
        var ratio =  1;
        var fontsize = 10;
        // 円弧を描画する
        context.translate(x*s , y*s +100);
        context.rotate( rotate * Math.PI / 180 );
        context.scale(1, 1/stretch);
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.arc(0, -1*r*ratio*s, r*ratio*s, 0, 2 * Math.PI, true);
        context.stroke();
        context.scale(1, stretch);
        context.rotate( -1 * rotate * Math.PI / 180 );
        context.translate(-1*x*s , -1*y*s -100);
        var metrics = context.measureText(text);
        // 文字を描画する
        context.fillStyle = "#000000";
        context.font = "normal bold " + fontsize*s + "pt 'ＭＳ Ｐ明朝'";
        context.fillText(text , (x*s - metrics.width/2*s), y*s  + fontsize*s + 2 + 100);
    };

    ns.shikaku = function (x, y, s, text, color, width) {
        var ratio = 1;
        // 四角形を描画する
        context.strokeStyle = color;//色変更
        context.lineWidth = 2;
        context.strokeRect(x*s - (width*s*ratio - x*s)/2 , y*ratio*s + 125, width*ratio*s , 30*ratio*s);
        // 文字を描画する
        context.fillStyle = "#000000";
        context.font = "normal bold " + 10*ratio*s + "pt 'ＭＳ Ｐ明朝'";
        context.fillText(text, (10+x)*s - (width*s*ratio - (10+x)*s)/2 , (22+y)*ratio*s + 125);
    }



    ns.eventBox = function (x, y, s, text, color) {
        var ratio = globalRatio ? globalRatio * s : s;

        // change size
        context.scale(ratio, ratio);
        context.translate(x , y);

        // drow square
        var squereWidth = context.measureText(text).width + 20;
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.strokeRect(-1 * (squereWidth / 2), -15, squereWidth, 30);

        // drow text
        var textWidth = context.measureText(text).width + 20;
        context.fillStyle = "#000000";
        context.font = "normal bold " + 10 * "pt 'ＭＳ Ｐ明朝'";
        context.fillText(text,  8 -1 * (textWidth / 2), 8);

        // recover size
        context.translate(-x, -y);
        context.scale(1 / ratio, 1 / ratio);

        var squareXLeft = (-1 * (squereWidth / 2) + x) * ratio;
        var squareXRight = ((squereWidth / 2) + x) * ratio;
        var squareYTop = (-15 + y) * ratio;
        var squareYBottom = (15 + y) * ratio;

        // move event
        canvasObj.addEventListener("mousemove", function(e) {

        	// get mouse position
			var mousePosition = ns.getMousePosition(e);

        	// only when inside of eventBox
        	if (squareXLeft <= mousePosition.x && mousePosition.x <= squareXRight &&
        		squareYTop <= mousePosition.y && mousePosition.y <= squareYBottom) {
        		alert('call back');
        	}



        }, true);







    };



// util
    ns.getBitLength = function (str) {
	    var r = 0; 
	    for (var i = 0; i < str.length; i++) { 
	        var c = str.charCodeAt(i); 
	        // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff 
	        // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3 
	        if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) { 
	            r += 1; 
	        } else { 
	            r += 2; 
	        } 
	    } 
	    return r; 
	} 








	ns.text_background = function (x, y, s, text, width) {
		var ratio =  1;
		var fontsize = 10;
		var metrics = context.measureText(text);
		// 四角形を描画する（背景全体）
		context.fillStyle = '#FFFF33';
		context.fillRect(x*s - (width*s*ratio - x*s)/2 , y*ratio*s + 125, width*ratio*s , 30*ratio*s);
	}

	ns.line = function (x1, y1, x2, y2, color, validity) {
		var ratio1  = 1;
		var ratio2  = 1;
		var this_x1	= x1*size_change - (200*size_change*ratio1 - x1*size_change)/2 + 200*size_change*ratio1/2;
		var this_x2	= x2*size_change - (200*size_change*ratio2 - x2*size_change)/2 + 200*size_change*ratio2/2;
		var this_y1	= y1*ratio1*size_change + 125 + 30*ratio1*size_change;
		var this_y2	= y2*ratio2*size_change + 125;
		var this_xc = (this_x1 + this_x2) / 2 ;
		var this_yc = (this_y1 + this_y2) / 2 ;
		var ratio_c = 1;
		var this_xc2 = (this_xc - this_x1) / ratio_c + this_x1;
		var this_yc2 = (this_yc - this_y1) / ratio_c + this_y1;
		// ラインを描画する
		context.strokeStyle = color;
		context.fillStyle = "#EEFFFF";
		context.beginPath();
		context.moveTo(this_x1, this_y1);
		context.lineTo(this_x2, this_y2);
		context.stroke();
		if(validity=="n"){
			// 中心円を描画する
			context.beginPath();
			context.arc(this_xc2, this_yc2, 4, 0 * Math.PI / 180, 360 * Math.PI / 180, true);
			context.fillStyle = color; 
			context.fill();
		}
	}

	ns.circle_category = function (x, y, r, stretch, rotate, s, text) {
		var ratio =  1;
		// 円弧を描画する
		context.translate(x*s , y*s +125);
		context.rotate( rotate * Math.PI / 180 );
		context.scale(1, 1/stretch);
		context.beginPath();
		context.arc(0, -1*r*ratio*s, r*ratio*s, 0, 2 * Math.PI, true);
		
		var grad  = context.createRadialGradient( 0, 0, 0, 0, 0, (r*ratio*s)/stretch);
		/* グラデーション終点のオフセットと色をセット */
		grad.addColorStop(0,'#F0FFF5');
		grad.addColorStop(0.5,'#DFFFEA');
		grad.addColorStop(1,'#A6FFC2');
		/* グラデーションをfillStyleプロパティにセット */
		context.fillStyle = grad;
		context.fill();
		
		context.scale(1, stretch);
		context.rotate( -1 * rotate * Math.PI / 180 );
		context.translate(-1*x*s , -1*y*s -125);
		
		// 文字を描画する
		var fontsize = 20;
		var metrics = context.measureText(text);
		context.fillStyle = "#000000";
		context.font = "normal bold " + fontsize*s + "pt 'ＭＳ Ｐ明朝'";
		context.fillText(text , (x*s - metrics.width/2*s), y*s  + fontsize*s + 2 + 125);
	}

	ns.arrow = function (x, y, r, l, color, validity) {
		if(validity=="y"){
			var ratio = 1;
			// 矢印を描画する
			context.translate(x*size_change - (200*size_change*ratio - x*size_change)/2 + 200*size_change*ratio/2, y*ratio*size_change + 125 + 30*ratio*size_change/2);
			context.rotate( r * Math.PI / 180 );
			context.strokeStyle = color;
			context.fillStyle = "#EEFFFF"
			context.beginPath();
			context.moveTo(-8*ratio, -8*ratio*l);
			context.lineTo(-8*ratio, 0);
			context.lineTo(-16*ratio, 0);
			context.lineTo( 0, 8*ratio*l);
			context.lineTo(16*ratio,  0);
			context.lineTo(8*ratio,  0);
			context.lineTo(8*ratio, -8*ratio*l);
			context.closePath();
			context.fill();
			context.stroke();
			context.rotate( -r * Math.PI / 180 );
			context.translate(-x*size_change + (200*size_change*ratio - x*size_change)/2 - 200*size_change*ratio/2, -y*ratio*size_change - 125 - 30*ratio*size_change/2);
		}
	}

	ns.sizeName = function (file_name, top, left, ps_x, ps_y, pt_name,pt_name2, ps_id, pt_id, ps_explain) {
		var _top  = parseInt(top)  || 50;
		var _left = parseInt(left) || 50;
		var _ps_x = parseInt(ps_x) || 50;
		var _ps_y = parseInt(ps_y) || 50;
		while ( ps_explain.indexOf("<br />",0) != -1 )
		{
		  ps_explain=ps_explain.replace("<br />","\n");
		}
		var html = '<form name="form_change" action="./' + file_name + '" method="POST"  >'
			+ '<div name="flow_div" style="width:490px;">'
			+ 'x軸 <input name="ps_x" type="text" value="' + ps_x + '" size="5"/>　'
			+ 'y軸 <input name="ps_y" type="text" value="' + ps_y + '" size="5"/>　'
			+ 'text<input name="pt_name" type="text" value="' + pt_name + '" size="45"/>　'
			+ '<input name="ps_id" type="hidden" value="' + ps_id + '" size="45"/>'
			+ '<input name="pt_id" type="hidden" value="' + pt_id + '" size="45"/>'
			+ '<a href="javascript:location.reload();">[X]</a>'
			+ '<br />'
			+ 'ｶﾀｶﾅ<input name="pt_name2" type="text" value="' + pt_name2 + '" size="45"/>　'
			+ '<br />説明<textarea name="ps_explain" rows="1" cols="65">' + ps_explain + '</textarea>　'
			+ '<br />'
			+ '※このフローの文章を変更すると、異なるフロー全ての文章も変更されます。'
			+ '<input name="flow_submit" type="submit" value="修正"  />'
			+ '<input name="del_submit" type="submit" value="削除" onclick=\'return confirm("削除して、よろしいですか？");\' />'
			+ '</div>'
			+ '</form>';
		var div = document.createElement('div');
		div.innerHTML = html;
		div.id = 'multilinePrompt';
		div.style.opacity = '0.85';
		div.style.position = 'absolute';
		div.style.padding = '3px';
		div.style.backgroundColor = '#FFFF00';
		div.style.top = _top + 'px';
		div.style.left = _left + 'px';
		document.body.appendChild(div);
	}

	ns.explain = function (ps_explain, ex_x, ex_y, display) {
		var ps_explain2 = ps_explain.replace("&lt;br /&gt;", "<br />");
		if(display=="y"){
			document.getElementById('explain').innerHTML 	= ps_explain2;
			document.getElementById('explain').style.left	= ex_x + 20 + "px";
			document.getElementById('explain').style.top 	= ex_y + 230 + "px";
			document.getElementById('explain').style.width	= "300px";
			document.getElementById('explain').style.padding = '10px';
			document.getElementById('explain').style.backgroundColor = '#E0FFFF';
			document.getElementById('explain').style.opacity = '0.85';
		}else{
			document.getElementById('explain').innerHTML 	= "";
			document.getElementById('explain').style.left	= ex_x + 20 + "px";
			document.getElementById('explain').style.top 	= ex_y + 330 + "px";
			document.getElementById('explain').style.width	= "0px";
			document.getElementById('explain').style.padding = '0px';
			document.getElementById('explain').style.backgroundColor = '#FFFFFF';
			document.getElementById('explain').style.opacity = '0';
		}
	}

	ns.addFactor = function (file_name, top, left, pt_name, pt_name2, pt_explain, ps_id, pt_id, submit, validity, on_session) {
		if(validity=="y"){
			var _top  = parseInt(top)  || 50;
			var _left = parseInt(left) || 50;
			
			var html = '<form action="./' + file_name + '" method="POST">'
				+ '<div name="flow_div" style="width:480px;">';
			
			if(on_session=="n"){
				var html2 = '　検索してください';
			}else if(on_session=="y"){
				var html2 = '項目：' + pt_name + '　'
					+ 'ｶﾀｶﾅ：' + pt_name2 + '　'
					+ '<a href="./report_problem_stage.php">[X]</a>'
					+ '<br />説明：' + pt_explain + '　'
					+ '<br />※このフローの文章を変更すると、異なるフロー全ての文章も変更されます。'
					+ '<input name="pt_explain" type="hidden" value="' + pt_explain + '" />';
			}else if(on_session=="new"){
				var html2 = '項目<input name="pt_name" type="text" value="' + pt_name + '" size="30"/>　'
					+ 'ｶﾀｶﾅ<input name="pt_name2" type="text" value="' + pt_name2 + '" size="30"/>　'
					+ '<a href="javascript:location.reload();">[X]</a>'
					+ '<br />説明<textarea name="pt_explain" rows="1" cols="65">' + pt_explain + '</textarea>　'
					+ '<br />※このフローの文章を変更すると、異なるフロー全ての文章も変更されます。';
			}
				
			var html3 = '<input name="ps_id" type="hidden" value="' + ps_id + '" size="45"/>'
				+ '<input name="pt_id" type="hidden" value="' + pt_id + '" size="45"/>'
				+ '<input name="add_top"  type="hidden" value="' + _top  + '" />'
				+ '<input name="add_left" type="hidden" value="' + _left + '" />'
				+ '<input name="size_change" type="hidden" value="' + size_change + '" />';
				
			if(on_session=="n"){
				var html4 = '';
			}else if(on_session=="y"){
				var html4 = '<input name="add" type="submit" value="追加"/>';
			}else if(on_session=="new"){
				var html4 = '<input name="add_new" type="submit" value="追加"/>';
			}
				
			var html5 = '<br />'
				+ '　<input name="search_word" type="text" value="" size="45"/>　'
				+ '<input name="search" type="submit" value="検索"/>';
				+ '<br />';
				
			var html6 = ''
				// <?php if(isset($problem_thing_search[0]["pt_name"])){ ?>
				// 	<?php for($a=0;$a<count($problem_thing_search);$a++){ ?>
				// 		+ '<br />　<?php echo $problem_thing_search[$a]["pt_name"]; ?><input name="select[<?php echo $problem_thing_search[$a]["pt_id"]; ?>]" type="submit" value="選択"/>'
				// 	<?php } ?>
				// <?php } ?>
				// <?php if($open_add=="y"){ ?>
				// + '<br />　新規はこちら　⇒　<input name="select[new]" type="submit" value="新規追加"/>'
				// <?php } ?>
				// + '<br />';
				
			var html7 = '</div>'
				+'</form>';
				
			var div = document.createElement('div');
			div.innerHTML = html + html2 + html3 + html4 + html5 + html6 + html7;
			div.id = 'multilinePrompt';
			div.style.opacity = '0.85';
			div.style.position = 'absolute';
			div.style.padding = '3px';
			div.style.backgroundColor = '#FFFF00';
			div.style.top = _top + 'px';
			div.style.left = _left + 'px';
			document.body.appendChild(div);
		}
	}














}(this, "mamsa.canvas"));