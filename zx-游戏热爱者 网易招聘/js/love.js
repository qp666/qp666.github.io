$(function () {
    for (let i = 0; i < $(".circle a").length;i++) {
        $(".circle a")[i].onclick = function() {
            $.fn.fullpage.moveTo(i+1, 0);
        }
    };
    // $(".frame .scrolltips").click(function(){
    //     $.fn.fullpage.moveSectionDown();
    // });
    
    // menu点击事件
    $("#menu .menu_toggle").click(function() {
        // $(this).addClass('active');
        // $(this).css('backgrpundPositionX','-100px');
        $("#menu").toggleClass('active');
    })

    // 最后一页加号的移入移出
    $("#share .add").mouseenter(function(){
        $("#share .more").stop().show();
    });
    $("#share .add").mouseleave(function(){
        $("#share .more").stop().hide();
    });

    $("#fullpage").fullpage({
        // verticalCentered: false,
        afterLoad: function (anchorLink, index) { 
            console.log(index);
              
            if (index == 1) {
                $(".section").removeClass("animated");
                $(".section1").addClass('animated');

                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").removeClass('last-page');
                $(".frame .scrolltips").unbind();
                $(".frame .scrolltips").click(function(){
                    $.fn.fullpage.moveSectionDown();
                });

                $(".sharebox").animate({
                    opacity: 0,
                },300);
            } else if (index == 2) {
                $(".section").removeClass("animated");
                $(".section2").addClass('animated');
                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").removeClass('last-page');
                $(".frame .scrolltips").unbind();
                $(".frame .scrolltips").click(function(){
                    $.fn.fullpage.moveSectionDown();
                });//.click(function(){
                //     $.fn.fullpage.moveSectionDown();
                // });

                $(".sharebox").animate({
                    opacity: 0,
                },300);
            } else if (index == 3) {
                $(".section").removeClass("animated");
                $(".section3").addClass('animated');
                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").removeClass('last-page');
                $(".frame .scrolltips").unbind();
                $(".frame .scrolltips").click(function(){
                    $.fn.fullpage.moveSectionDown();
                });

                $(".sharebox").animate({
                    opacity: 0,
                },300);
            } else if (index == 4) {
                $(".section").removeClass("animated");
                $(".section4").addClass('animated');
                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").removeClass('last-page');
                $(".frame .scrolltips").unbind();
                $(".frame .scrolltips").click(function(){
                    $.fn.fullpage.moveSectionDown();
                });

                $(".sharebox").animate({
                    opacity: 0,
                },300);
            } else if (index == 5) {
                $(".section").removeClass("animated");
                $(".section5").addClass('animated');
                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").removeClass('last-page');
                $(".frame .scrolltips").unbind();
                $(".frame .scrolltips").click(function(){
                    $.fn.fullpage.moveSectionDown();
                });

                $(".sharebox").animate({
                    opacity: 0,
                },300);
            } else if (index == 6) {
                $(".section").removeClass("animated");
                $(".section6").addClass('animated');
                $(".circle a").eq(index-1).addClass("active").siblings("a").removeClass("active");

                $(".frame").addClass('last-page');
                $(".last-page .scrolltips").unbind();
                $(".last-page .scrolltips").click(function(){
                    $.fn.fullpage.moveTo(1,0);
                    console.log('aaa');
                });

                // 到达最后一页后才显示
                $(".sharebox").animate({
                    opacity: 1,
                },500);
            }
            $(".frame .scrolltips").click(function(){
                // $.fn.fullpage.moveSectionDown();
            });
        },
    });
    // $(".frame .scrolltips").click(function(){
    //     $.fn.fullpage.moveSectionDown();
    // });

    

    $(".section1 .words").addClass('show');
});