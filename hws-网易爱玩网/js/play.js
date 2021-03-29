//返回顶部
$(function () {
    let boxTop = $('.bigbgc').offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= boxTop) {
            console.log($(document).scrollTop());
            $('.pull-up').show();
        } else {
            $('.pull-up').hide();
        }
    })
    $('.pull-up').click(function () {
        $('body, html').stop().animate({
            scrollTop: 0,
        })
    })
})

//导航栏
$(function () {
    $('.head-left>li').mouseover(function () {
        $(this).children('.border').stop().fadeIn(500)
    })
    $('.head-left>li').mouseout(function () {
        $(this).children('.border').stop().fadeOut(500)
    })
})

//轮播图
$(function () {
    let idx = 0;

    let timerId = setInterval(function () {
        idx++
        if (idx == 4) {
            idx = 0
            $('.tab ul li').eq(idx).click()
        } else {
            $('.tab ul li').eq(idx).click()
        }
    }, 3000)



    $('.lunbo .bgc').mouseleave(function () {

        timerId = setInterval(function () {
            idx++
            if (idx == 4) {
                idx = 0
                $('.tab ul li').eq(idx).click()
            } else {
                $('.tab ul li').eq(idx).click()
            }
        }, 3000)
    })



    $('.lunbo .bgc').mouseenter(function () {
        clearInterval(timerId)
    })


    $('.tab ul li').click(function () {

        idx = $(this).index()

        $(this).addClass('yellow').siblings('li').removeClass('yellow')
        $(this).parent().parent().siblings('ul').children('li').siblings('li').eq(idx).fadeIn().siblings('li').fadeOut()

    });
});


//手风琴
$(function () {
    $(".test-img li").mouseenter(function () {
        $(this).stop().animate({
            width: 562,
        }, 600, 'swing')
            .find(".small").stop().fadeOut().siblings(".big").stop().fadeIn();
        $(this).siblings("li").stop().animate({
            width: 222,
        }, 600, 'swing')
            .find(".small").stop().fadeIn().siblings(".big").stop().fadeOut();
    })
});

//新媒体矩阵
$(function () {
    //大神图标   
    $('.media-img li').mouseenter(function () {
        $(this).children('.ds').stop().animate({
            top: -32,
            left: 55,
            opacity: 1
        }, 100)
    })
    $('.media-img li').mouseleave(function () {
        $(this).children('.ds').stop().animate({
            top: 15,
            left: 15,
            opacity: 0
        }, 100)

    })

    //微博图标
    $('.media-img li').mouseenter(function () {
        $(this).children('.wb').stop().animate({
            top: 0,
            left: 75,
            opacity: 1
        }, 200)

    })
    $('.media-img li').mouseleave(function () {
        $(this).children('.wb').stop().animate({
            top: 15,
            left: 15,
            opacity: 0
        }, 200)
    })


    //知乎图标
    $('.media-img li').mouseenter(function () {
        $(this).children('.zh').stop().animate({
            top: 35,
            left: 75,
            opacity: 1
        }, 300)
    })
    $('.media-img li').mouseleave(function () {
        $(this).children('.zh').stop().animate({
            top: 15,
            left: 15,
            opacity: 0
        }, 300)
    })

    //微信图标
    $('.media-img li').mouseenter(function () {
        $(this).children('.wx').stop().animate({
            top: 70,
            left: 60,
            opacity: 1
        }, 400)
    })
    $('.media-img li').mouseleave(function () {
        $(this).children('.wx').stop().animate({
            top: 15,
            left: 15,
            opacity: 0
        }, 400)
    })

    //U酱图标
    $('.media-img li').mouseenter(function () {
        $(this).children('.uj').stop().animate({
            top: 0,
            left: 75,
            opacity: 1
        }, 200)
    })
    $('.media-img li').mouseleave(function () {
        $(this).children('.uj').stop().animate({
            top: 15,
            left: 15,
            opacity: 0
        }, 200)
    })
})