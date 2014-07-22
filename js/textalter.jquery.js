(function($) {
	$.fn.textAlter = function(options) {
		var default_values = $.extend({
			glitchCopyName: 'glitch_copy',
			maxchar: 100, // Max characters affected 
			replayMinint: 10, // Min interval before glitching more characters
			replayMaxint: 500, // Max interval before glitching more characters
			resetMaxInt: 50, // Max interval before resetting char
			resetMinInt: 10, // Min interval before resetting char
			textResetMin: 1000, // Min interval before resetting text to original value 
			textResetMax: 3000, // Max interval before resetting text to original value 
			listChar: ['&#9762;','&#9773;','&#9775;','&#664;','&#1002;','&#1161;','&#2039;',' &#3987;','&#4047;','&#4960;','&#8286;','&#9841;','&#9874;','&#9883;','&#9906;','&#9958;','&#10015;','&#10754;']
		}, options);

		return this.each(function() {
			var $obj = $(this),
				$glitchCopy = undefined,
				str = $obj.html(),
				strLenght = str.length-1,
				listLength = default_values.listChar.length-1

			var init = function() {
				if ($obj.next().hasClass(default_values.glitchCopyName)) {
					$glitchCopy = $obj.next();
				}
				setTimeout(glitchChars, 1000);
				setTimeout(resetChars, 2000);
			}

			var random = function(max, min) {
				min = typeof min !== 'undefined' ? min : 0;
				return Math.floor(Math.random() * max) + min
			}

			var replaceAt = function(s, n, t) {
			    return s.substring(0, n) + t + s.substring(n + 1);
			}

			var glitchChars = function() {
				for (var i=0; i<random(default_values.maxchar); i++) {
					glitchChar();
				}
				setTimeout(glitchChars, random(default_values.replayMaxint, default_values.replayMinint));
			}

			var resetChars = function() {
				$obj.html(str);
				setTimeout(resetChars, random(default_values.textResetMax, default_values.textResetMin));
			}

			var glitchChar = function() {
				var selChar = null,
					newChar = null,
					startValue = null,
					newStr = null,
					currentStr = $obj.html()

				function selectChar() {
					selChar = random(strLenght);
					startValue = str[selChar];
					newChar = default_values.listChar[random(listLength)];
				}

				function updateStr(s, sc, nc) {
					// $obj.html(str);
					newStr = replaceAt(s, sc, nc);
					$obj.html(newStr);

					if (typeof $glitchCopy != 'undefined') {
						$glitchCopy.html(newStr);

					}
					
					newStr = $obj.html();
					// str = $obj.html();
				}

				selectChar();
				updateStr(currentStr, selChar, newChar);

				(function(sc, sv) { 
					setTimeout(function() { 
						var s = $obj.html();
						updateStr(s, sc, sv);
					}, random(default_values.resetMaxInt, default_values.resetMinInt));
				})(selChar, startValue);
			}

			init();
		});
	}
})(jQuery);