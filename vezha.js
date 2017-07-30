function vezha(o){
	var sul=o.slist||o;
	var sul=$(sul).removeAttr("id").removeClass();
	var all=sul;
//	var slide_text=o.slide_text||false;
	var route=o.turnvertical||false;
	var marg="margin-left";if(route)marg="margin-top";
	var slc=o.slc||o.slide_list_class||false;if(slc)sul.addClass(slc);		
	var slw=sul.wrap("<div></div>").parent();
	var slwc=o.slwc||o.slide_list_wrapp_class||false;if(slwc)slw.addClass(slwc); 
//	var sis=o.sis||o.img_size||"lim"; // "max"
//	if(sis)sul.addClass(sis);
	var visible=o.visible||1;
	if(route){var sh=sul.height();slw.css({"height":sh*visible});}						//		height from CSS
	else{var sw=sul.width();slw.css({"max-width":sw*visible});}							//		width from CSS
	var stop_click=false;
//$("#stop").append('0 // '+new Date().getMinutes()+'.'+new Date().getSeconds()+'.'+new Date().getMilliseconds()+'<br/>');
	var pagin=o.pagin||false;if(pagin){pagin=true;
		var pins=o.pins||false;if(pins){pins=true;		}
		else{
			slw.after('<ul id="js_vezha_pagins_wrapp"></ul>');
			var pul=$("#js_vezha_pagins_wrapp").removeAttr("id");
			all=all.add(pul);
			var plc=o.plc||o.pagin_list_class||false;if(plc)pul.addClass(plc);
		}
		var p_tit=o.ptit||o.pagin_title||"";
		var p_txt=o.ptxt||o.pagin_text||"";
		var p_src=o.psrc||o.pagin_img_src||false;
		var p_alt=o.palt||o.pagin_img_alt||"";
		var phtml="";
									   
		sul.children("li").each(function(indx, element) {			
			if(p_tit){var ptit=$(element).data("ptit")||p_tit; 
				$(element).removeAttr("data-ptit");
				if(ptit===true)ptit="title";}
			else var ptit="";
			if(p_src||p_txt){
				if(p_src){
					if(p_src){var psrc=$(element).data("psrc")||p_src;
						$(element).removeAttr("data-psrc");
						if(psrc===true)psrc="";}
					if(p_alt){var palt=$(element).data("palt")||p_alt;
						$(element).removeAttr("data-palt");
						if(palt===true)palt="";}
					var pagin_img='<img alt="'+palt+'" src="'+psrc+'" />';}
				else var pagin_img="";				
				if(p_txt){var ptxt=$(element).data("ptxt")||p_txt; 
					$(element).removeAttr("data-ptxt");
					if(ptxt===true)ptxt=(indx+1);
					ptxt='<span>'+ptxt+'</span>';}					
				else var ptxt="";
				if(pins){$(element).append('<button type="button" title="'+ptit+'">'+pagin_img+ptxt+'</button>');}
				else{phtml+='<li><button type="button" title="'+ptit+'">'+pagin_img+ptxt+'</button></li>';}
			}else{
				if(pins){$(element).append('<button type="button" title="'+ptit+'">'+(indx+1)+'</button>');}
				else{phtml+='<li><button type="button" title="'+ptit+'">'+(indx+1)+'</button></li>';}
			}																							//	default
		});
		if(!pins){
			pul.html(phtml);
			var pa=pul.children("li:first-child");
			var pac=o.pac||o.pagin_active_class||false;if(pac===true)pa.addClass("active");else if(pac)pa.addClass(pac);
			var pbtn=pul.find("button");pbtn.on("click", function(){				
				if(!$(this).parent().is(pa)&&!stop_click){stop_click=true;
					var bef=pa.index()+1;
					var ind=$(this).parent().index()+1;
					var max=pbtn.length;
					if(bef<ind){var n=ind-bef;var p=max-ind+bef;
						if(p>=n){control(n,1);}
						else {control(p,-1);}
					}
					else if(ind<bef){var n=max-bef+ind;var p=bef-ind;
						if(p>=n){control(n,1);}
						else {control(p,-1);}
					}
				}
			});
		}					   
									   
	}
	var ij=sul.children("li").length;		
	while(ij<(visible+2)){
		sul.append(sul.html());
		ij=sul.children("li").length;}																		//		protection from deficiency of slides
	var sa=sul.children("li:first-child");																	//		important
	if(pagin && pins){
		var pbtn=sul.children("li").children("button:last-child");pbtn.on("click", function(){
			if(!$(this).parent().is(sa)&&!stop_click){stop_click=true;					  
				var bef=sa.index()+1;
				var ind=$(this).parent().index()+1;
				if(bef<ind){var n=ind-bef;
					control(n,1);
				}
				else if(ind<bef){var n=bef-ind;
					control(n,-1);
				}
			}
		});		
	}
	var sac=o.sac||o.slide_active_class||false;if(sac===true)sa.addClass("active");else if(sac)sa.addClass(sac);
//	if(slide_text)sa.find("p").show();
	var fade=o.fade||false;
	if(fade){var fadeop=fade;var fade=true;
		sul.children("li").children().fadeTo(0, fadeop);
		sa.children().fadeTo(0, 1);}
	var ba=o.before_active||0;ij=0;
	while(ij<ba){ij++;sul.children("li:last-child").prependTo(sul);}				//		building	
	sul.children("li:first-child").css(marg, "-"+((sw||sh)*ba)+"px");
	if(o.step>1)var step=o.step;else var step=1;
	if(o.btns){
		slw.after('<div id="js_vezha_buttons_wrapp"></div>');
		var btns=$("#js_vezha_buttons_wrapp").removeAttr("id");
		if(o.btns_class)btns.addClass(o.btns_class);
		var bptit=o.bptit||o.btn_prev_title||"";
		var bntit=o.bntit||o.btn_next_title||"";
		var bpsrc=o.bpsrc||o.btn_prev_img_src||false;
		var bnsrc=o.bnsrc||o.btn_next_img_src||false;
		var bptxt=o.bptxt||o.btn_prev_text||false;
		var bntxt=o.bntxt||o.btn_next_text||false;
		if((bpsrc&&bnsrc)||(bptxt&&bntxt)){
			if(bpsrc&&bnsrc){
				var bpalt=o.bpalt||o.btn_prev_img_alt||"";
				var bnalt=o.bnalt||o.btn_next_img_alt||"";
				var bpimg='<img alt="'+bpalt+'" src="'+bpsrc+'" />';
				var bnimg='<img alt="'+bnalt+'" src="'+bnsrc+'" />';}
			else{var bpimg="";var bnimg="";}
			if(bptxt&&bntxt){bptxt='<span>'+bptxt+'</span>';bntxt='<span>'+bntxt+'</span>';}
			btns.html('<button id="js_vezha_button_prev" type="button" title="'+bptit+'">'
							+bpimg+bptxt+'</button>'
							+'<button id="js_vezha_button_next" type="button"title="'+bntit+'">'
							+bnimg+bntxt+'</button>');}
		else{btns.html('<button id="js_vezha_button_prev" type="button" title="'+bptit+'"> Prev </button>'
									+'<button id="js_vezha_button_next" type="button" title="'+bntit+'"> Next </button>');}		//		default
		var btn_prev=$("#js_vezha_button_prev").removeAttr("id");
		var btn_next=$("#js_vezha_button_next").removeAttr("id");
		var bpc=o.bpc||o.btn_prev_class||false;if(bpc)btn_prev.addClass(bpc);
		if(bnc=o.bnc||o.btn_next_class||false)btn_next.addClass(bnc);
		btn_prev.on("click", function(){
			if(!stop_click){stop_click=true; control(step,-1);}
		});
		btn_next.on("click", function(){
			if(!stop_click){stop_click=true; control(step,1);}
		});
		all=all.add(btn_prev).add(btn_next);	}
	var time=o.time||800;
	if(o.auto_play){
		var play=false;
		var auto=true;
		var auto_time=o.auto_time||time;
		if(o.auto_tout===0)var auto_tout=0;
		else if(o.auto_tout>0)var auto_tout=o.auto_tout;
		else var auto_tout=3000;
		var auto_tbef=o.auto_tbef||auto_tout;
		var revers=o.revers||false;if(revers)revers=true;
		var mleave1=0;
		if(o.auto_mstop){var stop_mouse=true;
			all.mouseenter(function(){if(stop_mouse)auto=false;
			}).mouseleave(function(){
				var mleave2=++mleave1;
				if(stop_mouse){auto=true;
					if(!stop_click && !play){setTimeout(function(){
						if(mleave1===mleave2 && !stop_click && !play && auto){play=true;
							if(pagin && !pins)fpagin(step,revers);
							if(revers)fprev(step);else fnext(step);}						
					},auto_tbef);}
				}
			});
		}
		if(o.auto_btns){
			slw.after('<button id="js_vezha_button_autox" type="button" title="'+bptit+'"> || </button>');
			slw.after('<button id="js_vezha_button_autoy" type="button" title="'+bptit+'"> > </button>');
			var btn_autooff=$("#js_vezha_button_autox").removeAttr("id");
			var btn_autoon=$("#js_vezha_button_autoy").removeAttr("id");
			btn_autooff.on("click", function(){auto=false;if(o.auto_mstop)stop_mouse=false;});		
			btn_autoon.on("click", function(){auto=true;
				if(o.auto_mstop)stop_mouse=true;
				if(!stop_click && !play){play=true;
					if(pagin && !pins)fpagin(step,revers);
					if(revers)fprev(step);else fnext(step);}
			});
		}
		setTimeout(function(){
			if(mleave1===0 && !stop_click && !play && auto){play=true;
				if(pagin && !pins)fpagin(step,revers);
				if(revers)fprev(step);else fnext(step);}
		},auto_tbef);
	}
	
	function after_prev(x){	if(x>0)fprev(x);
							else{
								if(stop_click){stop_click=false; }
								if(play)play=false;
								control(0,0);
							}
						  }
	function fprev(x){x--;		  
		if(play)var t=auto_time;else var t=time;	
//		if(slide_text)sa.find("p").slideUp(t);
		if(fade)sa.children().fadeTo(t, fadeop);
		if(sac)sa.removeClass(sac);
		sul.children("li").removeAttr("style");
		var first=sul.children("li:last-child").detach()//;first
		.css(marg, "-"+((sw||sh)*ba+(sw||sh))+"px").prependTo(sul);
		sa=sa.prev();															//		important
		if(x<=0){																// !!!!!		сделать параметром		!!!!!
//			if(slide_text)sa.find("p").slideDown(t);
			if(fade)sa.children().fadeTo(t, 1);
			if(sac)sa.addClass(sac);
		}
		if(route)first.animate({marginTop: "-"+(sh*ba)+"px"}, t, "linear", function(){after_prev(x);} );
		else first.animate({marginLeft: "-"+(sw*ba)+"px"}, t, "linear", function(){after_prev(x);} );
	}
	
	function after_next(first, last, x){
					//			sul.children("li").removeAttr("style");								//		important
					//			last.detach().appendTo(sul);										//		important
								last.detach().removeAttr("style").appendTo(sul);					//		important
								first.css(marg, "-"+((sw||sh)*ba)+"px");
								if(x>0)fnext(x);
								else{ if(stop_click){stop_click=false;}
									play=false; control(0,0); }
							}
	function fnext(x){x--;
		if(play)var t=auto_time;else var t=time;	
		var last=sul.children("li:first-child");								//		important
		var first=last.next();
		if(route)last.animate({marginTop: "-"+(sh*ba+sh)+"px"}, t, "linear", function(){after_next(first, last, x);} );
		else last.animate({marginLeft: "-"+(sw*ba+sw)+"px"}, t, "linear", function(){after_next(first, last, x);} );	
//		if(slide_text)sa.find("p").slideUp(t);
		if(fade)sa.children().fadeTo(t, fadeop);
		if(sac)sa.removeClass(sac);
		sa=sa.next();															//		important
		if(x<=0){																// !!!!!		сделать параметром		!!!!!
	//		if(slide_text)sa.find("p").slideDown(t);
			if(fade)sa.children().fadeTo(t, 1);
			if(sac)sa.addClass(sac);
		}
	}
	/*	set_auto = setInterval(function() {
		}, auto_tout);
	clearInterval(set_auto);*/
//		console.info('console control  auto:',auto);			//		console.log(x);		console.info(x);		console.warn(x);		//del			console.error(x);

	var xx=0, xway=0;
	function control(x,way){
		if(x<=0){
			if(xx>0){stop_click=true;
				if(pagin && !pins)fpagin(xx,xway);				
				if(xway===-1)fprev(xx);else if(xway===1)fnext(xx);
				xx=0;xway=0;}
			else{var mleave3=mleave1;
				setTimeout(function(){
				if(mleave1===mleave3 && !stop_click && !play && auto){play=true;
					if(pagin && !pins)fpagin(step,revers);
					if(revers)fprev(step);else fnext(step);}
			},auto_tout);}
		}
		else if(play){xx=x;xway=way;stop_click=true; }
		else{if(pagin && !pins)fpagin(x,way);
			if(way===-1)fprev(x);else if(way===1)fnext(x);}
	};

	function fpagin(i,way){	
		if(pac)pa.removeClass(pac);
		while(i>0){i--;
			if(revers || way===-1){
				if(pa.is(":first-child"))pa=pul.children("li:last-child");
				else pa=pa.prev();}
			else if(!revers || way===1){
				if(pa.is(":last-child"))pa=pul.children("li:first-child");
				else pa=pa.next();}					
		}
		if(pac)pa.addClass(pac);
	}
	
	$(window).resize(function(){	
		if(route){
			slw.css({"max-height": "100%"});
			var sh=sul.height();
			slw.css({"height":sh*visible});
			sul.children("li:first-child").animate({marginTop: "-"+(sh*ba)+"px"}, 0, "linear");}
		else{slw.css({"max-width": "100%"});
			var sw=sul.width();
			slw.css({"max-width":sw*visible});
			sul.children("li:first-child").animate({marginLeft: "-"+(sw*ba)+"px"}, 0, "linear");
		}			
	});				
}