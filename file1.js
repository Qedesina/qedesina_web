/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.noConflict();
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

// IE checker
function gkIsIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
//
var page_loaded = false;
// animations
var elementsToAnimate = [];
//
jQuery(window).load(function() {
	setTimeout(function() {
		if(jQuery('#gkTopBar').length > 0) {
			jQuery('#gkTopBar').addClass('active');
		}
	}, 500);
	//
	page_loaded = true;
	// style area
	if(jQuery('#gkStyleArea').length > 0){
		jQuery('#gkStyleArea').find('a').each(function(i,element){
			jQuery(element).click(function(e){
	            e.preventDefault();
	            e.stopPropagation();
				changeStyle(i+1);
			});
		});
	}
	// font-size switcher
	if(jQuery('#gkTools').length > 0 && jQuery('#gkMainbody').length > 0) {
		var current_fs = 100;
		
		jQuery('#gkMainbody').css('font-size', current_fs+"%");
		
		jQuery('#gkToolsInc').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs < 150) {  
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs + 10) + "%"}, 200); 
				current_fs += 10; 
			} 
		});
		jQuery('#gkToolsReset').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			jQuery('#gkMainbody').animate({ 'font-size' : "100%"}, 200); 
			current_fs = 100; 
		});
		jQuery('#gkToolsDec').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs > 70) { 
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs - 10) + "%"}, 200); 
				current_fs -= 10; 
			} 
		});
	}
	// system message container fix
	if(jQuery('#system-message-container').length > 0){
		  jQuery('#system-message-container').each(function(i, element){
		  		(function() {
		  		     jQuery(element).fadeOut('slow');
		  		}).delay(5000);
	      });
	}
	// K2 font-size switcher fix
	if(jQuery('#fontIncrease').length > 0 && jQuery('.itemIntroText').length > 0) {
		jQuery('#fontIncrease').click(function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText largerFontSize');
		});
		
		jQuery('#fontDecrease').click( function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText smallerFontSize');
		});
	}
	// login popup
	if(jQuery('#gkPopupLogin').length > 0) {
		var popup_overlay = jQuery('#gkPopupOverlay');
		popup_overlay.css({'display': 'none', 'opacity' : 0});
		popup_overlay.fadeOut();
		
		jQuery('#gkPopupLogin').css({'display': 'block', 'opacity': 0, 'height' : 0});
		var opened_popup = null;
		var popup_login = null;
		var popup_login_h = null;
		var popup_login_fx = null;
		
		if(jQuery('#gkPopupLogin')) {

			popup_login = jQuery('#gkPopupLogin');
			popup_login.css('display', 'block');
			popup_login_h = popup_login.find('.gkPopupWrap').outerHeight();
			 
			jQuery('#gkLogin').click( function(e) {
				e.preventDefault();
				e.stopPropagation();
				popup_overlay.css({'opacity' : 0.45});
				popup_overlay.fadeIn('medium');
				
				setTimeout(function() {
					popup_login.animate({'opacity':1, 'height': popup_login_h},200, 'swing');
					opened_popup = 'login';
					popup_login.addClass('gk3Danim');
				}, 450);

				(function() {
					if(jQuery('#modlgn-username').length > 0) {
						jQuery('#modlgn-username').focus();
					}
				}).delay(600);
			});
		}
		
		popup_overlay.click( function() {
			if(opened_popup == 'login')	{
				popup_overlay.fadeOut('medium');
				popup_login.removeClass('gk3Danim');
				setTimeout(function() {
					popup_login.animate({
						'opacity' : 0
					},350, 'swing');
				}, 100);
				
			}
		});
	}
	// create the list of elements to animate	
	jQuery('body').find('.gkColorPriceTable .gkLink a').each(function(i,element) {
		gkAddClass(element, 'loaded', i);
	});
	
	jQuery('body').find('.gkIcons').each(function(i,element) {
		elementsToAnimate.push(['queue_anim', element, jQuery(element).offset().top, '.gkIcon']);
	});
	
	jQuery('body').find('.gkPoints').each(function(i,element) {
		elementsToAnimate.push(['queue_anim', element, jQuery(element).offset().top, 'li']);
	});
	
	jQuery('body').find('.gkTestimonials').each(function(i,element) {
		elementsToAnimate.push(['queue_anim', element, jQuery(element).offset().top, 'div div']);
	});
	
});
//
jQuery(window).scroll(function() {
	// menu animation
	if(page_loaded && jQuery('body').hasClass('imageBg') && jQuery('#aside-menu').length == 0) {
		// if menu is not displayed now
		if(jQuery(window).scrollTop() > jQuery('#gkHeader').height() && !jQuery('#gkMenuWrap').hasClass('active')) {
			jQuery('#gkTopBar').appendTo(jQuery('#gkMenuWrap'));
			jQuery('#gkHeaderNav').appendTo(jQuery('#gkMenuWrap'));
			jQuery('#gkHeader').attr('class', 'gkNoMenu');
			jQuery('#gkHeader').find('div').eq(0).css('display', 'none');
			jQuery('#gkMenuWrap').attr('class', 'active');


		}
		//
		if(jQuery(window).scrollTop() <= jQuery('#gkHeader').height() && jQuery('#gkMenuWrap').hasClass('active')) {
			jQuery('#gkHeader').find('div').eq(0).css('display', 'block');
			
			jQuery('#gkTopBar').prependTo(jQuery('#gkBg'));
			jQuery('#gkHeader').find('div').eq(0).append(jQuery('#gkHeaderNav'));
			jQuery('#gkHeaderNav').prependTo(jQuery('#gkHeader > div').eq(0));
			
			jQuery('#gkHeader').attr('class', '');
			jQuery('#gkMenuWrap').attr('class', '');
		}
	}
	// animate all right sliders
	if(elementsToAnimate.length > 0) {		
		// get the necessary values and positions
		var currentPosition = jQuery(window).scrollTop();
		var windowHeight = jQuery(window).height();
		// iterate throught the elements to animate
		if(elementsToAnimate.length) {
			for(var i = 0; i < elementsToAnimate.length; i++) {
				if(elementsToAnimate[i][2] < currentPosition + (windowHeight / 1.5)) {
					// create a handle to the element
					var element = elementsToAnimate[i][1];
					// check the animation type
					if(elementsToAnimate[i][0] == 'animation') {
						//console.log('(XXX)' + elementsToAnimate[i][2]);
						gkAddClass(element, 'loaded', false);
						// clean the array element
						elementsToAnimate.splice(i,1);
					}
					// if there is a queue animation
					else if(elementsToAnimate[i][0] == 'queue_anim') {
						//console.log('(XXX)' + elementsToAnimate[i][2]);
						jQuery(element).find(elementsToAnimate[i][3]).each(function(j,item) {
							gkAddClass(item, 'loaded', j);
						});
						// clean the array element
						elementsToAnimate.splice(i,1);
					}
				}
			}
		}
	}
});
//
function gkAddClass(element, cssclass, i) {
	var delay = jQuery(element).data('delay');

	if(!delay) {
		delay = (i !== false) ? i * 100 : 0;
	}

	setTimeout(function() {
		jQuery(element).addClass(cssclass);
	}, delay);
}
//
jQuery(document).ready(function() {

	if(!jQuery('#aside-menu').length > 0) {
		//
		var menuwrap = new jQuery('<div id="gkMenuWrap"></div>');
		//
		menuwrap.appendTo(jQuery('body'));
		
		//
		if(!jQuery('body').hasClass('imageBg')) {
			//
			jQuery('#gkTopBar').appendTo(jQuery('#gkMenuWrap'));
			jQuery('#gkHeaderNav').appendTo(jQuery('#gkMenuWrap'));
			jQuery('#gkHeader').attr('class', 'gkNoMenu');
			jQuery('#gkHeader').find('div').eq(0).css('display', 'none');
			jQuery('#gkMenuWrap').attr('class', 'active');	
		}
	}
	//
	// some touch devices hacks
	//

	// FAQ
	if(jQuery('body').find('.faq').length > 0 && jQuery('body').find('.faq').hasClass('item-page')) {
		jQuery('body').find('.faq h3').each(function(i,header) {
			header = jQuery(header);
			header.click(function() {
				if(header.hasClass('active')) {
					jQuery('body').find('.faq h3').removeClass('active');
				} else {
					jQuery('body').find('.faq h3').removeClass('active');
					header.addClass('active');
				}
			});
		});
	}
	
	// Big select element
	if(!gkIsIE() || gkIsIE() >= 10) {
		jQuery('body').find('.gkBigSelect').each(function(i,item) {
			item = jQuery(item);
			var wrap = new jQuery('<div class="gkBigSelect"></div>');
			item.wrap(wrap);
			wrap = jQuery('div.gkBigSelect');
			wrap.html(wrap.html() + '<span></span>');
			var initial = item.val();

			if(initial !== null) {
				wrap.find('span').text(initial);
			}
			
			var items = item.find('option');
			var items_output = '';
			
			items.each(function(i,option) {
				option = jQuery(option);
				items_output += '<li data-value="'+option.val()+'">'+option.html()+'</li>';
			});
			
			items_output = '<ul>' + items_output + '</ul>';
			wrap.html(wrap.html() + items_output);
			
			var selector = wrap.find('select');
			wrap.find('li').each(function(i,opt) {
				opt = jQuery(opt);
				opt.click(function() {				
					selector.find('option').each(function(i,option) {
					   option = jQuery(option);
					   option.attr('selected',opt.data('value') == option.val());
					});
					
					wrap.find('span').text(opt.html());
				});
			});
			
			wrap.click(function() {
				if(wrap.hasClass('active')) {
					setTimeout(function() {
						wrap.find('ul').css('display', 'none');
					}, 350);
				} else {
					wrap.find('ul').css('display', 'block');
				}
				
				setTimeout(function() {
					wrap.toggleClass('active');
				}, 50);
			});
			
			item.removeClass('gkBigSelect');
		});
	}
});
// Function to change styles
function changeStyle(style){
	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	jQuery('head').append('<link rel="stylesheet" href="'+file1+'" type="text/css" />');
	jQuery('head').append('<link rel="stylesheet" href="'+file2+'" type="text/css" />');
	jQuery.cookie('gk_cloudhost_j30_style', style, { expires: 365, path: '/' });
}

jQuery(window).load(function() {
	if(elementsToAnimate.length > 0) {		
		// get the necessary values and positions
		var currentPosition = jQuery(window).scrollTop();
		var windowHeight = jQuery(window).height();
		// iterate throught the elements to animate
		if(elementsToAnimate.length) {
			for(var i = 0; i < elementsToAnimate.length; i++) {
				if(elementsToAnimate[i][2] < currentPosition + (windowHeight / 1.5)) {
					// create a handle to the element
					var element = elementsToAnimate[i][1];
					// check the animation type
					if(elementsToAnimate[i][0] == 'animation') {
						//console.log('(XXX)' + elementsToAnimate[i][2]);
						gkAddClass(element, 'loaded', false);
						// clean the array element
						elementsToAnimate.splice(i,1);
					}
					// if there is a queue animation
					else if(elementsToAnimate[i][0] == 'queue_anim') {
						//console.log('(XXX)' + elementsToAnimate[i][2]);
						jQuery(element).find(elementsToAnimate[i][3]).each(function(j,item) {
							gkAddClass(item, 'loaded', j);
						});
						// clean the array element
						elementsToAnimate.splice(i,1);
					}
				}
			}
		}
	}
});