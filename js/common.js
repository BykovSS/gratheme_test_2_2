'use strict';

window.addEventListener('load', function () {

	var br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	br_height = br_height - document.getElementsByTagName('h3')[0].offsetHeight;
	var koef = 1;
	var koord_obj = [br_width, br_height * 0.95];
	var ugol = 0;
	var flag = true;
	document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width - 17) + ', ' + (br_height - 17));
	var track = [koord_obj[0] * 0.25, Math.random() * koord_obj[1] * 0.17 + koord_obj[1] * 0.67, Math.random() * koord_obj[0] * 0.12, koord_obj[1] * 0.5, koord_obj[0] * 0.25, Math.random() * koord_obj[1] * 0.17 + koord_obj[1] * 0.17, koord_obj[0] * 0.5, Math.random() * koord_obj[1] * 0.17, koord_obj[0] * 0.75, Math.random() * koord_obj[1] * 0.17 + koord_obj[1] * 0.17, Math.random() * koord_obj[0] * 0.09 + koord_obj[0] * 0.83, koord_obj[1] * 0.5, koord_obj[0] * 0.75, Math.random() * koord_obj[1] * 0.17 + koord_obj[1] * 0.67, koord_obj[0] * 0.5, Math.random() * koord_obj[1] * 0.17 + koord_obj[1] * 0.83];
	var obstacles = setObstacles(track, koord_obj[0] * 0.015);
	var koord_car = [track[4] - koord_obj[0] * koef * 0.02, track[5] - koord_obj[0] * koef * 0.01];

	function RenderTrack() {
		if (document.getElementById('track')) {
			document.getElementById('track').parentElement.removeChild(document.getElementById('track'));
		}
		var temp_track = '<g id="track"><path d="M' + track[0] * koef + ' ' + track[1] * koef + ' Q' + track[2] * koef + ' ' + track[3] * koef + ' ' + track[4] * koef + ' ' + track[5] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[6] * koef + ' ' + track[7] * koef + ' ' + track[8] * koef + ' ' + track[9] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[10] * koef + ' ' + track[11] * koef + ' ' + track[12] * koef + ' ' + track[13] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[14] * koef + ' ' + track[15] * koef + ' ' + track[0] * koef + ' ' + track[1] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[2] * koef + ' ' + track[3] * koef + ' ' + track[4] * koef + ' ' + track[5] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  " fill="none" stroke-width=' + koord_obj[0] * koef * 0.08 + ' stroke="black" />\n\t\t\t\t\t\t\t\t\t\t<path d="M' + track[0] * koef + ' ' + track[1] * koef + ' Q' + track[2] * koef + ' ' + track[3] * koef + ' ' + track[4] * koef + ' ' + track[5] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[6] * koef + ' ' + track[7] * koef + ' ' + track[8] * koef + ' ' + track[9] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[10] * koef + ' ' + track[11] * koef + ' ' + track[12] * koef + ' ' + track[13] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[14] * koef + ' ' + track[15] * koef + ' ' + track[0] * koef + ' ' + track[1] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  Q' + track[2] * koef + ' ' + track[3] * koef + ' ' + track[4] * koef + ' ' + track[5] * koef + '\n\t\t\t\t\t\t\t\t\t\t\t  " fill="none" stroke-width=' + koord_obj[0] * koef * 0.07 + ' stroke=yellowgreen />';

		for (var i = 0; i < obstacles.length; i++) {
			var obstacle = '<circle class="circle" cx=' + obstacles[i].cx * koef + ' cy=' + obstacles[i].cy * koef + ' r=' + obstacles[i].r * koef + ' />';
			temp_track += obstacle;
		}
		temp_track += '</g>';
		document.getElementsByTagName('svg')[0].innerHTML += temp_track;
	}

	function RenderCar() {
		if (document.getElementById('car')) {
			document.getElementById('car').parentElement.removeChild(document.getElementById('car'));
		}
		var car = '\n\t\t<g id="car" transform="rotate(' + ugol + ', ' + (koord_car[0] * koef + koord_obj[0] * koef * 0.02) + ', ' + (koord_car[1] * koef + koord_obj[0] * koef * 0.01) + ')">\n\t\t\t<circle cx=' + (koord_car[0] * koef + koord_obj[0] * koef * 0.04) + ' cy=' + (koord_car[1] * koef + koord_obj[0] * koef * 0.006) + ' r=' + koord_obj[0] * koef * 0.002 + '  stroke=yellowgreen />\n\t\t\t<circle cx=' + (koord_car[0] * koef + koord_obj[0] * koef * 0.04) + ' cy=' + (koord_car[1] * koef + koord_obj[0] * koef * 0.014) + ' r=' + koord_obj[0] * koef * 0.002 + ' stroke=yellowgreen />\n\t\t\t<rect x=' + koord_car[0] * koef + ' y=' + koord_car[1] * koef + ' rx=' + koord_obj[0] * koef * 0.004 + ' width=' + koord_obj[0] * koef * 0.04 + ' height=' + koord_obj[0] * koef * 0.02 + ' fill=red stroke=black />\n\t\t\t<rect x=' + (koord_car[0] * koef + koord_obj[0] * koef * 0.006) + ' y=' + (koord_car[1] * koef + koord_obj[0] * koef * 0.004) + ' rx=' + koord_obj[0] * koef * 0.003 + ' width=' + koord_obj[0] * koef * 0.023 + ' height=' + koord_obj[0] * koef * 0.012 + ' fill=blue stroke=black />\n\t\t</g>';
		document.getElementsByTagName('svg')[0].innerHTML += car;

		var touchobj = void 0,
		    koord_start = void 0,
		    dist = void 0,
		    d_dist = void 0,
		    koord_car_x = void 0,
		    koord_car_y = void 0,
		    koord_start_last = void 0,
		    car_width = koord_obj[0] * koef * 0.04,
		    car_height = koord_obj[0] * koef * 0.02,
		    dist_width = void 0,
		    track_width = koord_obj[0] * koef * 0.08;

		document.getElementById('car').addEventListener('touchstart', function (event) {
			touchobj = event.changedTouches[0];
			koord_start = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			koord_start_last = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			koord_car_x = koord_car[0];
			koord_car_y = koord_car[1];
			flag = true;
			event.preventDefault();
		});

		document.getElementById('car').addEventListener('touchmove', function (event) {
			touchobj = event.changedTouches[0];
			dist = [parseInt(touchobj.clientX) - koord_start[0], parseInt(touchobj.clientY) - koord_start[1]];
			var cos = (parseInt(touchobj.clientX) - koord_start_last[0]) / Math.sqrt((parseInt(touchobj.clientX) - koord_start_last[0]) * (parseInt(touchobj.clientX) - koord_start_last[0]) + (parseInt(touchobj.clientY) - koord_start_last[1]) * (parseInt(touchobj.clientY) - koord_start_last[1]));
			var acos_deg = Math.acos(cos) * 180 / Math.PI;
			if (parseInt(touchobj.clientY) < koord_start_last[1]) {
				acos_deg = -acos_deg;
			}
			var acos_rad = acos_deg * Math.PI / 180;
			var sin = Math.sin(acos_rad);
			d_dist = [parseInt(touchobj.clientX) - koord_start_last[0], parseInt(touchobj.clientY) - koord_start_last[1]];
			var b1 = void 0,
			    b2 = void 0,
			    b3 = void 0,
			    b4 = void 0;
			b1 = [koord_car[0] + d_dist[0], koord_car[1] + d_dist[1]];
			b2 = [b1[0] + car_width, b1[1]];
			b3 = [b1[0] + car_width, b1[1] + car_height];
			b4 = [b1[0], b1[1] + car_height];

			if (parseInt(touchobj.clientX) <= koord_obj[0] * 0.25 * koef) {
				dist_width = Math.max(MinDist([b1[0] * koef, b1[1] * koef], [track[0] * koef, track[1] * koef], [track[2] * koef, track[3] * koef], [track[4] * koef, track[5] * koef]), MinDist([b2[0] * koef, b2[1] * koef], [track[0] * koef, track[1] * koef], [track[2] * koef, track[3] * koef], [track[4] * koef, track[5] * koef]), MinDist([b3[0] * koef, b3[1] * koef], [track[0] * koef, track[1] * koef], [track[2] * koef, track[3] * koef], [track[4] * koef, track[5] * koef]), MinDist([b4[0] * koef, b4[1] * koef], [track[0] * koef, track[1] * koef], [track[2] * koef, track[3] * koef], [track[4] * koef, track[5] * koef]));
			} else if (parseInt(touchobj.clientX) <= koord_obj[0] * 0.75 * koef && parseInt(touchobj.clientY) <= koord_obj[1] * 0.5 * koef) {
				dist_width = Math.max(MinDist([b1[0] * koef, b1[1] * koef], [track[4] * koef, track[5] * koef], [track[6] * koef, track[7] * koef], [track[8] * koef, track[9] * koef]), MinDist([b2[0] * koef, b2[1] * koef], [track[4] * koef, track[5] * koef], [track[6] * koef, track[7] * koef], [track[8] * koef, track[9] * koef]), MinDist([b3[0] * koef, b3[1] * koef], [track[4] * koef, track[5] * koef], [track[6] * koef, track[7] * koef], [track[8] * koef, track[9] * koef]), MinDist([b4[0] * koef, b4[1] * koef], [track[4] * koef, track[5] * koef], [track[6] * koef, track[7] * koef], [track[8] * koef, track[9] * koef]));
			} else if (parseInt(touchobj.clientX) > koord_obj[0] * 0.75 * koef) {
				dist_width = Math.max(MinDist([b1[0] * koef, b1[1] * koef], [track[8] * koef, track[9] * koef], [track[10] * koef, track[11] * koef], [track[12] * koef, track[13] * koef]), MinDist([b2[0] * koef, b2[1] * koef], [track[8] * koef, track[9] * koef], [track[10] * koef, track[11] * koef], [track[12] * koef, track[13] * koef]), MinDist([b3[0] * koef, b3[1] * koef], [track[8] * koef, track[9] * koef], [track[10] * koef, track[11] * koef], [track[12] * koef, track[13] * koef]), MinDist([b4[0] * koef, b4[1] * koef], [track[8] * koef, track[9] * koef], [track[10] * koef, track[11] * koef], [track[12] * koef, track[13] * koef]));
			} else {
				dist_width = Math.max(MinDist([b1[0] * koef, b1[1] * koef], [track[12] * koef, track[13] * koef], [track[14] * koef, track[15] * koef], [track[0] * koef, track[1] * koef]), MinDist([b2[0] * koef, b2[1] * koef], [track[12] * koef, track[13] * koef], [track[14] * koef, track[15] * koef], [track[0] * koef, track[1] * koef]), MinDist([b3[0] * koef, b3[1] * koef], [track[12] * koef, track[13] * koef], [track[14] * koef, track[15] * koef], [track[0] * koef, track[1] * koef]), MinDist([b4[0] * koef, b4[1] * koef], [track[12] * koef, track[13] * koef], [track[14] * koef, track[15] * koef], [track[0] * koef, track[1] * koef]));
			}

			if (dist_width >= track_width / 2 + koord_obj[0] * koef * 0.007) {
				flag = false;
			}
			for (var i = 0; i < obstacles.length; i++) {
				var d = Math.min(Math.sqrt((obstacles[i].cx * koef - b1[0] * koef) * (obstacles[i].cx * koef - b1[0] * koef) + (obstacles[i].cy * koef - b1[1] * koef) * (obstacles[i].cy * koef - b1[1] * koef)), Math.sqrt((obstacles[i].cx * koef - b2[0] * koef) * (obstacles[i].cx * koef - b2[0] * koef) + (obstacles[i].cy * koef - b2[1] * koef) * (obstacles[i].cy * koef - b2[1] * koef)), Math.sqrt((obstacles[i].cx * koef - b3[0] * koef) * (obstacles[i].cx * koef - b3[0] * koef) + (obstacles[i].cy * koef - b3[1] * koef) * (obstacles[i].cy * koef - b3[1] * koef)), Math.sqrt((obstacles[i].cx * koef - b4[0] * koef) * (obstacles[i].cx * koef - b4[0] * koef) + (obstacles[i].cy * koef - b4[1] * koef) * (obstacles[i].cy * koef - b4[1] * koef)));
				if (d + koord_obj[0] * koef * 0.0007 <= obstacles[i].r * koef) {
					flag = false;
				}
			}
			koord_start_last = [parseInt(touchobj.clientX), parseInt(touchobj.clientY)];
			ugol = acos_deg;
			if (flag) {
				koord_car = [koord_car_x + dist[0], koord_car_y + dist[1]];
				RenderCar();
			}

			event.preventDefault();
		});
	}

	RenderTrack();
	RenderCar();

	window.addEventListener('resize', function () {
		var br_width_n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var br_height_n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		br_height_n = br_height_n - document.getElementsByTagName('h3')[0].offsetHeight;
		koef = Math.min(br_width_n / br_width, br_height_n / br_height);
		document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width_n - 17) + ', ' + (br_height_n - 17));
		RenderTrack();
		RenderCar();
	});

	function MinDist(point, P0, P1, P2) {
		var t = [0, 0.5, 1];
		var min_dist = void 0;
		var min_dist_n = void 0;
		do {
			var begin = [(1 - t[0]) * (1 - t[0]) * P0[0] + 2 * (1 - t[0]) * t[0] * P1[0] + t[0] * t[0] * P2[0], (1 - t[0]) * (1 - t[0]) * P0[1] + 2 * (1 - t[0]) * t[0] * P1[1] + t[0] * t[0] * P2[1]];
			var middle = [(1 - t[1]) * (1 - t[1]) * P0[0] + 2 * (1 - t[1]) * t[1] * P1[0] + t[1] * t[1] * P2[0], (1 - t[1]) * (1 - t[1]) * P0[1] + 2 * (1 - t[1]) * t[1] * P1[1] + t[1] * t[1] * P2[1]];
			var end = [(1 - t[2]) * (1 - t[2]) * P0[0] + 2 * (1 - t[2]) * t[2] * P1[0] + t[2] * t[2] * P2[0], (1 - t[2]) * (1 - t[2]) * P0[1] + 2 * (1 - t[2]) * t[2] * P1[1] + t[2] * t[2] * P2[1]];
			var length_begin = Math.sqrt((point[0] - begin[0]) * (point[0] - begin[0]) + (point[1] - begin[1]) * (point[1] - begin[1]));
			var length_middle = Math.sqrt((point[0] - middle[0]) * (point[0] - middle[0]) + (point[1] - middle[1]) * (point[1] - middle[1]));
			var length_end = Math.sqrt((point[0] - end[0]) * (point[0] - end[0]) + (point[1] - end[1]) * (point[1] - end[1]));
			if (length_begin <= length_end) {
				var t_n = [t[0], (t[1] + t[0]) / 2, t[1]];
				t = t_n;
				min_dist = Math.round(length_begin * 100) / 100;
				min_dist_n = Math.round(length_middle * 100) / 100;
			} else {
				var _t_n = [t[1], (t[2] + t[1]) / 2, t[2]];
				t = _t_n;
				min_dist = Math.round(length_middle * 100) / 100;
				min_dist_n = Math.round(length_end * 100) / 100;
			}
		} while (min_dist != min_dist_n);
		return min_dist;
	}

	function setObstacles(track, radius) {
		var parts = [],
		    obstacle = [],
		    obstacles = [];
		var part_of_track = void 0,
		    k = 1,
		    t = void 0,
		    tx = void 0,
		    ty = void 0;
		var pox = true;
		for (var i = 0; i < 3; i++) {
			if (i == 0) {
				parts[i] = Math.round(Math.random() * 3 + 1);
			} else {
				do {
					parts[i] = Math.round(Math.random() * 3 + 1);
				} while (parts[i] == parts[i - 1] || parts[i] == parts[i - 2]);
			}
			var j = (parts[i] - 1) * 4;
			t = Math.round(Math.random() * 100) / 100;
			if (j == 12) {
				part_of_track = [track[j], track[j + 1], track[j + 2], track[j + 3], track[0], track[1]];
			} else {
				part_of_track = [track[j], track[j + 1], track[j + 2], track[j + 3], track[j + 4], track[j + 5]];
			}
			tx = (1 - t) * (1 - t) * part_of_track[0] + 2 * (1 - t) * t * part_of_track[2] + t * t * part_of_track[4];
			ty = (1 - t) * (1 - t) * part_of_track[1] + 2 * (1 - t) * t * part_of_track[3] + t * t * part_of_track[5];
			obstacle = getKoord([part_of_track[0], part_of_track[1]], [part_of_track[2], part_of_track[3]], t, [tx, ty], radius);
			obstacles[i] = {
				part: parts[i],
				cx: obstacle[0],
				cy: obstacle[1],
				r: radius
			};
		}
		return obstacles;
	}

	function getKoord(P0, P1, t, tr, h) {
		var k = void 0,
		    n = void 0,
		    x1 = void 0,
		    x2 = void 0,
		    a = void 0,
		    b = void 0,
		    c = void 0,
		    x = void 0,
		    y = void 0,
		    cx = void 0,
		    cy = void 0;
		k = (P0[1] - P1[1]) / (P0[0] - P1[0]);
		n = P0[1] - k * P0[0];
		a = 1 + k * k;
		b = -2 * (P0[0] + k * (P0[1] - n));
		c = P0[0] * P0[0] + (P0[1] - n) * (P0[1] - n) - Math.sqrt((P0[0] - P1[0]) * (P0[0] - P1[0]) + (P0[1] - P1[1]) * (P0[1] - P1[1])) * Math.sqrt((P0[0] - P1[0]) * (P0[0] - P1[0]) + (P0[1] - P1[1]) * (P0[1] - P1[1])) * t * t;
		if ((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) < P0[0] & (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) > P1[0] || (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) > P0[0] & (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) < P1[0]) x = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);else x = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);;
		y = k * x + n;

		k = -1 / ((y - tr[1]) / (x - tr[0]));
		n = tr[1] - k * tr[0];

		a = 1 + k * k;
		b = -2 * (tr[0] + k * (tr[1] - n));
		c = tr[0] * tr[0] + (tr[1] - n) * (tr[1] - n) - h * h * 2.4;
		if (Math.random() > 0.5) x = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);else x = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
		y = k * x + n;
		return [x, y];
	}
});