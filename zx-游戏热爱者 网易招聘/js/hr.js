$(function () {
    $(".circle").click(function () {
        $.fn.fullpage.moveSectionDown();
    });
    
    $(".section4 .video").click(function(){
        $(".invisible").css("display","block");
    });

    $(".fp-auto-height>a").click(function () {
        $.fn.fullpage.moveTo(1, 0);
    })
    $("#fullpage").fullpage({
        verticalCentered: false,
        navigation: true,
        controlArrows: true,
        onLeave: function (index, nextIndex, direction) {
            // $("#circle").fadeOut();
        },
        afterLoad: function (anchorLink, index) {
            if (index == 1) {
                $("#nte_ease").addClass('animated rubberBand');
                $("#circle1").animate({ "opacity": 1 }, 2000);
            } else if (index == 2) {
                $("#job").addClass('animated flipInX');
                $("#job_ul>li").eq(0).addClass('animated bounceInRight block');
                $("#job_ul>li").eq(1).addClass('animated bounceInLeft block');
                $("#job_ul>li").eq(2).addClass('animated bounceInRight block');
                $("#job_ul>li").eq(3).addClass('animated bounceInLeft block');
                $("#job_ul>li").eq(4).addClass('animated bounceInRight block');
                $("#job_ul>li").eq(5).addClass('animated bounceInLeft block');
                $("#job_ul>li").eq(6).addClass('animated bounceInRight block');
                $("#job_ul>li").eq(7).addClass('animated bounceInLeft block');
                $("#circle2").animate({ "opacity": 1 }, 2000);
            } else if (index == 3) {
                $("#hot_pos").addClass('animated swing');
                $("#new_job").addClass('animated bounceInLeft block');
                $("#hot_job").addClass('animated bounceInRight block');
                $("#circle3").animate({ "opacity": 1 }, 2000);
                $(".circle").fadeIn(3000);
            } else if (index == 4) {
                $("#about").addClass('animated wobble');
                $("#video").addClass('animated bounceInLeft block');
                $("#know_more").addClass('animated bounceInRight block');
            };
        },
    });
});

$(function () {
    // $($(".input>a")[0]).click(function() {
    //     $(".select_job").hide();
    //     $(".select_city").show();
    // });
    // $($(".input>a")[1]).click(function() {
    //     $(".select_city").hide();
    //     $(".select_job").show();
    // });
    // $("body").click(function() {
    //     $(".select_city .select_job").hide();
    // })

    // 第一屏的小li的淡入淡出
    $(".section1 nav ul li a").mouseover(function () {
        $(this).stop().animate({
            color: '#e60012',
            borderBottomColor: "#e60012",
        }, 500);
    });
    $(".section1 nav ul li a").mouseout(function () {
        $(this).stop().animate({
            color: '#333',
            borderBottomColor: "#fff",
        }, 1000);
    });



    // 第四屏的播放图片的变换
    $(".section4 .video").mouseover(function () {
        // console.log($(".section4 .video .open").get(0));
        $(".section4 .video .open").get(0).style.backgroundPosition = ' 0 -96px';
    });
    $(".section4 .video").mouseout(function () {
        // console.log($(".section4 .video .open").get(0));
        $(".section4 .video .open").get(0).style.backgroundPosition = ' 0 0';
    });


    // 向下按钮的滑动变换
    $(".circle").mouseover(function () {
        $(this).stop().animate({
            backgroundPositionY: "-83px",
            backgroundColor: 'white',
        }, 200);
    });
    $(".circle").mouseout(function () {
        $(this).stop().animate({
            backgroundPositionY: "16px",
            backgroundColor: '#e60012',
        }, 200);
    });


    //第三屏的自动移动
    let index = 0;
    let index1 = 0;
    function san() {
        index++;
        $("#new_bd").animate({
            top: -index * 37 + 'px',
        }, 1000, function () {
            if (index % 6 == 0) {
                for (let i = 0; i < 6; i++) {
                    let clone = $("#new_bd").get(0).children[i].cloneNode(true);
                    $("#new_bd").get(0).appendChild(clone);
                }
            }
        });
    }

    function san1() {
        index1++;
        $("#hot_bd").animate({
            top: -index1 * 37 + 'px',
        }, 1000, function () {
            if (index1 % 6 == 0) {
                for (let i = 0; i < 6; i++) {
                    let clone = $("#hot_bd").get(0).children[i].cloneNode(true);
                    $("#hot_bd").get(0).appendChild(clone);
                }
            }
        });
    }

    let timer = setInterval(san, 2000);
    let timer1 = setInterval(san1, 2000);


    $("#new").mouseover(function () {
        clearInterval(timer);
    });
    $("#hot").mouseover(function () {
        clearInterval(timer1);
    });
    $("#new").mouseout(function () {
        timer = setInterval(function () {
            index++;
            $("#new_bd").animate({
                top: -index * 37 + 'px',
            }, 1000, function () {
                if (index % 6 == 0) {
                    for (let i = 0; i < 6; i++) {
                        let clone = $("#new_bd").get(0).children[i].cloneNode(true);
                        $("#new_bd").get(0).appendChild(clone);
                    }
                }
            });
        }, 2000);
    });
    $("#hot").mouseout(function () {
        timer1 = setInterval(function () {
            index1++;
            $("#hot_bd").animate({
                top: -index1 * 37 + 'px',
            }, 1000, function () {
                if (index1 % 6 == 0) {
                    for (let i = 0; i < 6; i++) {
                        let clone = $("#hot_bd").get(0).children[i].cloneNode(true);
                        $("#hot_bd").get(0).appendChild(clone);
                    }
                }
            });
        }, 2000);
    });
});
