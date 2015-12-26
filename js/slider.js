function f_Slider(){
    this.currentIndex = 0;
    this.minDataLength = 2;
    this.moveX = 200; //define px that user should move slide, before it change to another
	this.className = '';
	this.items = [];

    var v_this = this;

    function f_extendObj(v_a, v_b) {
    	if(!v_a) v_a = {};
    	for(var v_n in v_b) v_a[v_n] = v_b[v_n];
    	return v_a;
    }

    this.init = function(v_config){
    	this.config = f_extendObj(this.config, v_config);
        this.config.swipeSpeed = this.config.swipeSpeed ? this.config.swipeSpeed/1000 + 's' : '0s';

        if(this.config.images && this.minDataLength <= this.config.images.length){
			this.setItems();
            this.render();
		}
    };
    this.setItems = function() {
    	this.config.images.forEach(function(v_src, v_i) {
    		var v_img = document.createElement('img');
    		v_img.src = v_src;
    		v_img.setAttribute('_index', v_i);
    		v_this.setSpecificAnimationAttr(v_img);

    		v_this.items.push(v_img);
    	});
    };

    this.render = function(){
        this.renderSliderCtnr();
        this.bindEvents();
		this.renderItems();
    };
    this.renderSliderCtnr = function(){
		var v_MAX_SHOWN_IMG = 3;

        this.sliderCtnr = document.createElement('div');
        this.sliderCtnr.className = this.className;
        (this.parentNode || document.body).appendChild(this.sliderCtnr);

        this.viewFrame = document.createElement('div');
        this.viewFrame.style.width = v_MAX_SHOWN_IMG * this.sliderCtnr.clientWidth + 'px';
        this.sliderCtnr.appendChild(this.viewFrame);
    };
	this.renderItems = function(){
        this.renderItem(this.currentIndex == 0 ? this.items.length - 1 : this.currentIndex - 1);
		this.renderItem(this.currentIndex);
        this.renderItem(this.currentIndex == this.items.length - 1 ? 0 : this.currentIndex + 1);
	};
	this.renderItem = function(v_index, v_el){
		if(!this.items[v_index]) return;

		if(this.items.length == 2){
			this.viewFrame.insertBefore(this.items[v_index].cloneNode(true), v_el);
			return;
		}
		this.viewFrame.insertBefore(this.items[v_index], v_el);
	};
    this.bindEvents = function(){
        if(this.config.mode.indexOf('auto') > -1){
            setInterval(function(){v_this.nextSlide();}, this.config.swipeDelay);
        }
        if(this.config.mode.indexOf('manual') > -1){

        	var v_isTouchScreenDevice = 'ontouchstart' in window || 'onmsgesturechange' in window;
            var v_startEvent = v_isTouchScreenDevice ? 'touchstart' : 'mousedown';
            var v_moveEvent = v_isTouchScreenDevice ? 'touchmove' : 'mousemove';
            var v_endEvent = v_isTouchScreenDevice ? 'touchend' : 'mouseup';

            this.viewFrame.addEventListener(v_startEvent, function(v_e){
            	v_e.preventDefault();
                v_this.touchStartX = v_e.pageX || v_e.touches[0].pageX;
            }, false);

            this.viewFrame.addEventListener(v_moveEvent, function(v_e){
                v_e.preventDefault();
                v_this.touchMoveX =  v_e.pageX || v_e.touches[0].pageX;
            }, false);

            this.viewFrame.addEventListener(v_endEvent, function(v_e){
            	v_e.preventDefault();
                if(v_this.touchMoveX === undefined || !v_this.touchStartX === undefined) return false;

                var v_moveSlide = v_this.touchMoveX - v_this.touchStartX;
                if(Math.abs(v_moveSlide) >= v_this.moveX){
                    v_moveSlide > 0 ? v_this.nextSlide(): v_this.previousSlide();
                }

                v_this.touchMoveX = undefined; 
                v_this.touchStartX = undefined;

            }, false);
        }
    };

    this.previousSlide = function(){
    	this.viewFrame.removeChild(this.viewFrame.lastChild);
		this.currentIndex = this.currentIndex == 0 ? this.items.length - 1 : this.currentIndex - 1;

		var v_prevCurrentIndex = this.currentIndex == 0 ? this.items.length - 1 : this.currentIndex - 1;
		this.renderItem(v_prevCurrentIndex, this.viewFrame.firstChild);
    };
    this.nextSlide = function(){
		this.viewFrame.removeChild(this.viewFrame.firstChild);
		this.currentIndex = this.currentIndex == this.items.length - 1 ? 0 : this.currentIndex + 1;

		var v_nextCurrentIndex = this.currentIndex == this.items.length - 1 ? 0 : this.currentIndex + 1;
		this.renderItem(v_nextCurrentIndex);
    };

    this.setSpecificAnimationAttr = function(v_img) { };
}

function f_SliderSlide(){
    f_Slider.call(this);

    this.parentNode = document.getElementById('SlideSlider');
	this.className = 'SliderCtnrSlide'

    this.setSpecificAnimationAttr = function(v_img){
        v_img.style.transitionProperty = 'left';
        v_img.style.transitionDuration = this.config.swipeSpeed;
    };
}

function f_SliderFade(){
    f_Slider.call(this);

    this.parentNode = document.getElementById('FadeSlider');
    this.className = 'SliderCtnrFade';

    this.setSpecificAnimationAttr = function(v_img) {
    	v_img.style.transitionProperty = 'opacity';
    	v_img.style.transitionDuration = this.config.swipeSpeed;
    };
}

