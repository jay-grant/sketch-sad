$(document).ready(function() {

	// Hardcoded resolution
	var height = 16;
	var width = 16;
	var vprClass = 'vpr';
	var blkClass= 'blk';

	// Imported objects from DOM
	var $canvas = $('#canvas');
	var canvasSize = $canvas.height();
	var $clear = $('#clear-button');
	var $black = $('#black-button');
	var $vapour = $('#vapour-button');
	var $sizebutton = $('#size-button');
	var $dropdown = $('#dropdown');
	var black = false;
	var vapour = true;
	var vapourColours = ["#65478e", "#8f629c", "#d27ab6", "#35a6c8", "#5fc2d1", "#c1e4e6", "#ececc6"];
	var counter = 0;

	// Settings objects
	var $8 = $('#8-button');
	var $16 = $('#16-button');
	var $32 = $('#32-button');
	var $64 = $('#64-button');
	var $128 = $('#128-button');
	var $grid = $('#grid-button');
	var grid = true;

	$16.css("color", "#d27ab6");

	// Generate initial Grid
	generateGrid($canvas);

	// Listen for sketching
	$(document).on('mouseenter', '.pixel', function() {
		var isClear = ($(this).css("background-color") === 'rgba(0, 0, 0, 0)');
		var isBlack = $(this).hasClass(blkClass);
		var isVpr = $(this).hasClass(vprClass);
		if ((isClear || isBlack) && vapour) {
			increment();
			$(this).css("background-color", vapourColours[counter]);
			$(this).addClass(vprClass);
			$(this).removeClass(blkClass);
		}
		if ((isClear || isVpr) && black) {
			$(this).css("background-color", "black");
			$(this).addClass(blkClass);
			$(this).removeClass(vprClass);
		}
	});

	// Colour changes
	$black.click(function () {
		if (vapour === true) {
			vapour = false;
			black = true;
		}
	});

	$vapour.click(function() {
		if (black === true) {
			vapour = true;
			black = false;
		}
	});

	// Clear listener
	$clear.click(function () {
		$('.pixel').css("background-color", "transparent");
	});

	// Settings Dropdown listener
	$sizebutton.mouseenter(function() {
		$dropdown.fadeTo('fast', 1);
	});

	$sizebutton.mouseleave(function() {
		$dropdown.css("opacity", "0");
		$dropdown.css("display", "none");
	});

	// Settings modifications
	$8.click(function() {
		height = 8;
		width = 8;
		updateSettings($8);
	});

	$16.click(function() {
		height = 16;
		width = 16;
		updateSettings($16);
	});

	$32.click(function() {
		height = 32;
		width = 32;
		updateSettings($32);
	});

	$64.click(function() {
		height = 64;
		width = 64;
		updateSettings($64);
	});

	$128.click(function() {
		height = 128;
		width = 128;
		updateSettings($128);
	});

	$grid.click(function() {
		updateGridSetting();
	});

	// Functions
	function increment() {
		if (counter === 6) {
			counter = 0;
		} else {
			counter++;
		}
	};

	function generateGrid(canvas) {
		$canvas.empty();
		var scale = canvasSize/height;
		for (var row = 0; row < height; row++) {
			var $row = ($("<div class=\"row\" id='" + row + "'></div>"));
			canvas.append($row);
			for (var col = 0; col < width; col++) {
				var $pixel = ($("<div class=\"pixel\"></div>"));
				$pixel.height(scale + "px");
				$pixel.width(scale + "px");	
				$('#' + row + "").append($pixel);
			}
		}
		grid = !grid;
		updateGridSetting();
	};

	function updateSettings(res) {
		$('#dropdown div').css("color", "default");
		res.css("color", "#d27ab6");
		if (grid === true) {
			$grid.css("color", "#d27ab6");
		}
		generateGrid($canvas);
	};

	function updateGridSetting() {
		if (grid === true) {
			grid = false;
			$grid.css("color", "default");
			$('.pixel').css("outline-style", "none");
			
		} else {
			grid = true;
			$grid.css("color", "#d27ab6");
			$('.pixel').css("outline-style", "solid");
		}
	}

});

