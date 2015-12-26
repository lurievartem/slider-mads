window.addEventListener('DOMContentLoaded', function() {

    var config = {
        // arbitrary number of images
        images: [
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRa5JrQXQSn7PJrWpAsh8aNAO-UzFsJNWpqJqhxd0s-ZtRIuE1G',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1E973Bj7y1IrWPw8EJJzRW5CR6vTfm4WgsRp_rrNBbsxZO4',
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS_8w0_zcqbkJJEbZcg2WnzGzynGzmkqU6iqGOtm_bN4rH_pML4JA',
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSIrJP2KrYcn9HwVBlxiB3FTlg405azlhgDeymvYFgPAUGUIuH6'
        ],
        // possible values: 'auto', 'manual', 'automanual'
        mode: 'manual',
        // arbitrary interger (miliseconds)
        swipeSpeed: 2000,
        // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
        swipeDelay: 3000
    };

    var v_slider = new f_SliderFade();
    v_slider.init(config);

    var v_slider = new f_SliderSlide();
    v_slider.init(config);

}, false);
