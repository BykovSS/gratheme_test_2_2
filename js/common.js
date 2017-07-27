'use strict';

window.addEventListener('load', function () {

	var br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	br_height = br_height - document.getElementsByTagName('h3')[0].offsetHeight;
	var koef = 1;
	var koord_obj = [br_width, br_height];
	var koord_car = [0, 0];
	var ugol = 0;
	document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width - 17) + ', ' + (br_height - 17));

	function RenderTrack() {
		if (document.getElementById('track')) {
			document.getElementById('track').parentElement.removeChild(document.getElementsByTagName('ellipse')[0]);
		}
		var ellipse = '<ellipse id="track" cx="' + koord_obj[0] * 0.5 * koef + '" cy="' + koord_obj[1] * 0.5 * koef + '" rx="' + koord_obj[0] * 0.45 * koef + '" ry="' + koord_obj[1] * 0.35 * koef + '" fill="none" stroke-width=7% stroke="yellowgreen" />';
		document.getElementsByTagName('svg')[0].innerHTML += ellipse;
		document.getElementById('track').addEventListener('click', function (event) {
			console.log(event);
		});
	}

	function RenderCar() {
		if (document.getElementById('car')) {
			document.getElementById('car').parentElement.removeChild(document.getElementsByTagName('g')[0]);
		}
		var car = '\n\t\t<g id="car" transform="rotate(' + ugol + ', ' + (koord_car[0] + koord_obj[0] * 0.04) + ', ' + (koord_car[1] + koord_obj[1] * 0.02) + ')">\n\t\t\t<circle cx=' + (koord_car[0] + koord_obj[0] * 0.08) + ' cy=' + (koord_car[1] + koord_obj[0] * 0.012) + ' r=' + koord_obj[0] * 0.004 + '  stroke=yellowgreen />\n\t\t\t<circle cx=' + (koord_car[0] + koord_obj[0] * 0.08) + ' cy=' + (koord_car[1] + koord_obj[0] * 0.028) + ' r=' + koord_obj[0] * 0.004 + ' stroke=yellowgreen />\n\t\t\t<rect x=' + koord_car[0] + ' y=' + koord_car[1] + ' rx=' + koord_obj[0] * 0.008 + ' width=' + koord_obj[0] * 0.08 + ' height=' + koord_obj[0] * 0.04 + ' fill=red stroke=black />\n\t\t\t<rect x=' + (koord_car[0] + koord_obj[0] * 0.012) + ' y=' + (koord_car[1] + koord_obj[0] * 0.008) + ' rx=' + koord_obj[0] * 0.005 + ' width=' + koord_obj[0] * 0.047 + ' height=' + koord_obj[0] * 0.024 + ' fill=blue stroke=black/>\n\t\t</g>';
		document.getElementsByTagName('svg')[0].innerHTML += car;

		var touchobj = void 0,
		    koord_start = void 0,
		    dist = void 0,
		    koord_car_x = void 0,
		    koord_car_y = void 0,
		    koord_start_last = void 0;

		document.getElementById('car').addEventListener('touchstart', function (event) {
			touchobj = event.changedTouches[0];
			koord_start = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			koord_start_last = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			koord_car_x = koord_car[0];
			koord_car_y = koord_car[1];
			event.preventDefault();
		});

		document.getElementById('car').addEventListener('touchmove', function (event) {
			touchobj = event.changedTouches[0];
			dist = [parseInt(touchobj.clientX) - koord_start[0], parseInt(touchobj.clientY) - koord_start[1]];
			var cos = (parseInt(touchobj.clientX) - koord_start_last[0]) / Math.sqrt((parseInt(touchobj.clientX) - koord_start_last[0]) * (parseInt(touchobj.clientX) - koord_start_last[0]) + (parseInt(touchobj.clientY) - koord_start_last[1]) * (parseInt(touchobj.clientY) - koord_start_last[1]));
			var acos_deg = Math.acos(cos) * 180 / Math.PI;
			if (parseInt(touchobj.clientY) <= koord_start_last[1]) {
				acos_deg = 360 - acos_deg;
			}
			// document.getElementById('dist').innerHTML = `${acos_deg}`;
			koord_start_last = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			koord_car = [koord_car_x + dist[0], koord_car_y + dist[1]];
			ugol = acos_deg;
			RenderCar();
			event.preventDefault();
		});
	}

	RenderCar();

	// RenderTrack();


	// let koord_poly = [];
	// let obj = document.getElementById('circle');
	// let points = [0, 1];
	// document.getElementsByTagName('svg')[0].setAttribute('viewBox', `0, 0, ${br_width-17}, ${br_height-17}`);
	// let count = Math.round(Math.random()*7+3);
	// for (let i=0; i<count; i++) {
	// 	if (i == 0) {
	// 		koord_poly[i] = {width: Math.random()*(br_width*0.1)+br_width*0.1, height: br_height*0.5};
	// 	}
	// 	else if (i == 1) {
	// 		koord_poly[i] = {width: Math.random()*(br_width*0.8)+br_width*0.1, height: Math.random()*(br_height*0.8)+br_height*0.1};
	// 	}
	// 	else {
	// 		do {
	// 		  koord_poly[i] = {width: Math.random()*(br_width*0.8)+br_width*0.1, height: Math.random()*(br_height*0.8)+br_height*0.1};
	// 		} while (((koord_poly[i-2].width - koord_poly[i-1].width)*(koord_poly[i].width - koord_poly[i-1].width) + (koord_poly[i-2].height - koord_poly[i-1].height)*(koord_poly[i].height - koord_poly[i-1].height))/(Math.sqrt((koord_poly[i-2].width - koord_poly[i-1].width)*(koord_poly[i-2].width - koord_poly[i-1].width) + (koord_poly[i-2].height - koord_poly[i-1].height)*(koord_poly[i-2].height - koord_poly[i-1].height))*Math.sqrt((koord_poly[i].width - koord_poly[i-1].width)*(koord_poly[i].width - koord_poly[i-1].width) + (koord_poly[i].height - koord_poly[i-1].height)*(koord_poly[i].height - koord_poly[i-1].height))) >= 0);
	// 	}
	// }
	// let koord_obj = [koord_poly[0].width, koord_poly[0].height];

	// function RenderPolyline() {
	// 	let poly = `<polyline points="`;
	// 	for (let i=0; i<koord_poly.length; i++) {
	// 		if (i == 0) {
	// 			poly += `${koord_poly[i].width*koef},${koord_poly[i].height*koef}`;
	// 		}
	// 		else {
	// 			poly += ` ${koord_poly[i].width*koef},${koord_poly[i].height*koef}`;
	// 		}
	// 	}
	// 	poly += `" style = "fill: none; stroke-width: 3px; stroke: black"/>`;
	// 	document.getElementsByTagName('svg')[0].innerHTML = poly;
	// }

	// function RenderObject() {
	// 	if (document.getElementById('circle')) {
	// 		document.getElementById('circle').parentElement.removeChild(document.getElementsByTagName('circle')[0]);
	// 	}
	// 	let circle = `<circle id="circle" cx="${koord_obj[0]*koef}" cy="${koord_obj[1]*koef}" r="${40*koef}" fill="blue" stroke-width="5"; stroke="red" />`;
	// 	document.getElementsByTagName('svg')[0].innerHTML += circle;

	// 	obj = document.getElementById('circle');
	// 	let koord_start;
	// 	let koord_obj_x, koord_obj_y;
	// 	let dist;
	// 	let touchobj;

	// 	obj.addEventListener('touchstart', function(event){
	// 		touchobj = event.changedTouches[0];
	// 		koord_start = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
	// 		koord_obj_x = koord_obj[0];
	// 		koord_obj_y = koord_obj[1];
	// 		event.preventDefault();
	// 	})

	// 	obj.addEventListener('touchmove', function(event){
	// 		touchobj = event.changedTouches[0];
	// 		dist = [parseInt(touchobj.clientX) - koord_start[0], parseInt(touchobj.clientY) - koord_start[1]];

	// 		let k = (koord_poly[points[0]].height - koord_poly[points[1]].height)/(koord_poly[points[0]].width - koord_poly[points[1]].width);
	// 		let n = koord_poly[points[0]].height - k * koord_poly[points[0]].width;

	// 		if (k >= -1 && k<= 1) {
	// 			if ((koord_poly[points[1]].width >= koord_poly[points[0]].width && koord_obj_x + dist[0] <= koord_poly[points[0]].width) || (koord_poly[points[0]].width > koord_poly[points[1]].width && koord_obj_x + dist[0] >= koord_poly[points[0]].width)) {
	// 					koord_obj_x = koord_poly[points[0]].width - dist[0];
	// 					ChangePoints(false);
	// 			}
	// 			if ((koord_poly[points[1]].width >= koord_poly[points[0]].width && koord_obj_x + dist[0] > koord_poly[points[1]].width) || (koord_poly[points[0]].width > koord_poly[points[1]].width && koord_obj_x + dist[0] < koord_poly[points[1]].width)) {
	// 					koord_obj_x = koord_poly[points[1]].width - dist[0];
	// 					ChangePoints(true);
	// 			}
	// 				koord_obj = [koord_obj_x + dist[0], k * (koord_obj_x + dist[0]) + n];
	// 		}
	// 		else {
	// 			if ((koord_poly[points[1]].height >= koord_poly[points[0]].height && koord_obj_y + dist[1] <= koord_poly[points[0]].height) || (koord_poly[points[0]].height > koord_poly[points[1]].height && koord_obj_y + dist[1] >= koord_poly[points[0]].height)) {
	// 					koord_obj_y = koord_poly[points[0]].height - dist[1];
	// 					ChangePoints(false);

	// 			}
	// 			if ((koord_poly[points[1]].height >= koord_poly[points[0]].height && koord_obj_y + dist[1] > koord_poly[points[1]].height) || (koord_poly[points[0]].height > koord_poly[points[1]].height && koord_obj_y + dist[1] < koord_poly[points[1]].height)) {
	// 					koord_obj_y = koord_poly[points[1]].height - dist[1];
	// 					ChangePoints(true);

	// 			}
	// 				koord_obj = [(koord_obj_y + dist[1] - n)/k, koord_obj_y + dist[1]];
	// 		}

	// 		RenderObject();
	// 		event.preventDefault();
	// 	})

	// 	function ChangePoints(forward) {
	// 		if (forward) {
	// 			if (points[1] >= count-1) {
	// 				points[1] = count-1;
	// 			}
	// 			else {
	// 				points[0] ++;
	// 				points[1] ++; 
	// 			}

	// 		}
	// 		else {
	// 			if (points[0] <= 0) {
	// 				points[0] = 0;
	// 			}
	// 			else {
	// 				points[0] --;
	// 				points[1] --;
	// 			}

	// 		}
	// 	}
	// }

	// RenderPolyline();
	// RenderObject();


	window.addEventListener('resize', function () {
		var br_width_n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var br_height_n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		br_height_n = br_height_n - document.getElementsByTagName('h3')[0].offsetHeight;
		koef = Math.min(br_width_n / br_width, br_height_n / br_height);
		document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width_n - 17) + ', ' + (br_height_n - 17));
		// RenderTrack();
		RenderCar();
	});
});