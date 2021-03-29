$(function(){
    // 导航条吸顶
    var div_offset = $('.nav_hd').offset().top;
    $(window).scroll(function(){
        if($(this).scrollTop() >= div_offset){
            $('.nav_hd').css({position:'fixed',top:0});
            $('.nav_hd').css('zIndex',999)
            $('.nav_bd').css('marginTop','95px')
            $('.banner').css('marginBottom','95px')
        }else{
            $('.nav_hd').css('position','static');
            $('.nav_bd').css('marginTop','0px')
            $('.banner').css('marginBottom','0px')
        }
    });
    // $(window).scroll(function(){
    //     var s = $(window).scrollTop();
    //     console.log(s)
    // })

    // 鼠标移入导航条更换图片
    $('.nav_1').mouseenter(function(){
        $(this).addClass('on_1')
    });

    $('.nav_2').mouseenter(function(){
        $(this).addClass('on_2')
    });

    $('.nav_3').mouseenter(function(){
        $(this).addClass('on_3')
    });

    $('.nav_4').mouseenter(function(){
        $(this).addClass('on_4')
    });

    $('.nav_5').mouseenter(function(){
        $(this).addClass('on_5')
    });



    // 鼠标移出
    $('.nav_1').mouseleave(function(){
        $(this).removeClass('on_1')
    })

    $('.nav_2').mouseleave(function(){
        $(this).removeClass('on_2')
    })

    $('.nav_3').mouseleave(function(){
        $(this).removeClass('on_3')
    });

    $('.nav_4').mouseleave(function(){
        $(this).removeClass('on_4')
    });

    
    $('.nav_5').mouseleave(function(){
        $(this).removeClass('on_5')
    });
    

    $(window).scroll(function(){
        var currentTop = $(window).scrollTop();
        if(currentTop < 1395){
            $('.nav_1').addClass('on_1')
        }else{
            $('.nav_1').removeClass('on_1')
        }

        if(currentTop >= 1395 && currentTop < 1895){
            $('.nav_2').addClass('on_2')
        }else{
            $('.nav_2').removeClass('on_2')
        }

        if(currentTop >= 1895 && currentTop < 2595){
            $('.nav_3').addClass('on_3')
        }else{
            $('.nav_3').removeClass('on_3')
        }

        if(currentTop >=2595 && currentTop < 3095){
            $('.nav_4').addClass('on_4')
        }else{
            $('.nav_4').removeClass('on_4')
        }

        if(currentTop > 3095){
            $('.nav_5').addClass('on_5')
        }else{
            $('.nav_5').removeClass('on_5')
        }
console.log(currentTop);

    })

    // 鼠标点击
  let arr = [900, 1395, 1895, 2595, 3295];
  $('.nav_bar>a').click(function () {
    let navIndex = $(this).index();
    $('html').animate({ scrollTop: (arr[navIndex]) }, 500)
    
  })


  let wangYiIndex = 0;
  setInterval(function () {
    //判断当前是不是最后一个p标签
    if (wangYiIndex == 2) {
      wangYiIndex = 0;
      $('.showList')[0].style.top = 0;
    }
    wangYiIndex++;
    $('.showList').animate({ 'top': -wangYiIndex * 54 }, 600)
  }, 2000)
});


// 下拉菜单
$(function () {
    $(".qml").mouseenter(function () {

        $(".menuPull").stop(true,false).slideDown(300);

    });
    $(".qml").mouseleave(function(){
        $(".menuPull").stop(true,false).slideUp(300);
    })
})