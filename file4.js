				 window.addEvent('domready', function() 
				 {

					SqueezeBox.initialize({});
					SqueezeBox.assign($$('a.modal'), {
						parse: 'rel'
					});

				 });

				 $GKMenu = { height:true, width:true, duration: 250 };
				 $GK_TMPL_URL = "http://mamushafenta.com/templates/gk_cloudhost";

				 $GK_URL = "http://mamushafenta.com/";

				 function keepAlive() {	var myAjax = new Request({method: "get", url: "index.php"}).send();} window.addEvent("domready", function(){ keepAlive.periodical(840000); });
					var acymailing = Array();
								acymailing['NAMECAPTION'] = 'Name';
								acymailing['NAME_MISSING'] = 'Please enter your name';
								acymailing['EMAILCAPTION'] = 'E-mail';
								acymailing['VALID_EMAIL'] = 'Please enter a valid e-mail address';
								acymailing['ACCEPT_TERMS'] = 'Please check the Terms and Conditions';
								acymailing['CAPTCHA_MISSING'] = 'Please enter the security code displayed in the image';
								acymailing['NO_LIST_SELECTED'] = 'Please select the lists you want to subscribe to';