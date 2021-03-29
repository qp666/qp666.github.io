// !   1.设置滚轮事件
//1.1创建变量 来 接收顶部nav导航栏
let navDom = document.getElementById('tan');
//1.2创建变量  来接fdon  网页中间浮动的鼠标图片
let fdonDom = document.getElementById('fdon');


window.onscroll = function () {
    // console.log("滚轮y" + scrollY);
    // 2.1如果鼠标滚轮距离顶部的值超过10 , 给nav导航栏添加一个class名 为navo
    if (scrollY > 20) {
        navDom.setAttribute("class", "navo");
        // $('#tan').css({'position':'fixed','top':0});
    };
    // 2.2如果鼠标滚轮距离顶部的值小于10 , 给nav导航栏添加一个class名 为navv
    if (scrollY < 10) {
        navDom.setAttribute("class", "navv");
    }
    // 2.3如果鼠标滚轮距离顶部的值大于450 , 给网页中间浮动的鼠标图片隐藏起来
    if (scrollY > 450) {
        fdonDom.style.display = 'none';
    }
    // 2.3如果鼠标滚轮距离顶部的值小于450 , 给网页中间浮动的鼠标图片显示出来
    if (scrollY < 450) {
        fdonDom.style.display = 'block';
    }


}


//! 2.创建轮播图的小圆点点击变黄
// 2.1  创建一个变量spanDom 来接收 所有tab里面的span小圆点
let span1Dom = document.querySelectorAll('.tab>span');
// console.log(span1Dom);
// 2.2 遍历spanDom 数组一遍
for (let i = 0; i < span1Dom.length; i++) {
    // spanDom[i].index = i;
    //2.3给里面每一个span都添加点击事件
    span1Dom[i].onclick = function () {
        //2.4再遍历一遍,把里面每一个span的类名都改成空
        for (let j = 0; j < span1Dom.length; j++) {
            span1Dom[j].className = '';
        }

        //2.5把当前所点击的span标签类名改成border 
        this.className = "border";
    };


};




//! 3.创建轮播图的轮播效果
// 3.1外部创建一个变量
var idx = 1;
//3.2 创建定时器 
setInterval(function () {
    // console.log(idx);
    //3.3如果轮播到第四张图片时,下一张图片改成第一张
    if (idx == 4) {
        idx = 0;
    }
    //3.4调用span的点击事件,让图片轮播
    $("#dian span").eq(idx).click();

    //把变量加1
    idx++;
    //定时器2.5秒运行一次
}, 2500);




//! 4.使用jQuery创建一个tab栏文字的点击事件(轮换图片);
$(function () {
    // 4.1接收span 并创造点击事件
    $("#tabQH span").click(function () {
        // 链式编程操作
        idx = $('#tabQH span').index()
        console.log(idx);
        
        //4,2 给点击的span添加一个类名为demo,把其他span类名demo去掉(就是让文字加下边框)
        $(this).addClass("demo").siblings().removeClass("demo");
        // 4.3点击的同时，得到当前span 的索引号
        idx = $(this).index();
        // console.log(index);

        // 4.4 接收show里面的div(图片盒子),把跟当前点击span文字一致下标的div盒子给显示,其他的隐藏
        $(".show div").eq(idx).stop(true, false).fadeIn(800).siblings().stop(true, false).fadeOut(800);
        // 4.4 接收show里面的i(文字盒子),把跟当前点击span文字一致下标的i盒子给显示,其他的隐藏
        $(".show1 i").eq(idx).stop(true, false).fadeIn(800).siblings().stop(true, false).fadeOut(800);
        // $(".show div").eq(index).show().siblings().hide();

        // $(".show1 i").eq(index).show(800).siblings().hide(800);
        // 4.5 接收show里面的span(小圆点),把跟当前点击span文字一致下标的小圆点加一个类名on (让它变黄)
        $(".show2 span").eq(idx).addClass("on").siblings().removeClass("on");
    });
});




//! 5.使用jQuery创建一个span小圆点的点击事件(轮换图片);
$(function () {
    // 5.1接收span 并创造点击事件
    $("#dian span").click(function () {


        // 链式编程操作
        //5,2 给点击的span添加一个类名为demo,把其他span类名demo去掉(就是让小圆点变黄)
        $(this).addClass("on").siblings().removeClass("on");
        // 5.3点击的同时，得到当前span 的索引号
        var index = $(this).index();
       
        // console.log(index);
        // 5.4 接收show里面的div(图片盒子),把跟当前点击span小圆点一致的div盒子给显示,其他的隐藏
        $(".show div").eq(index).stop(true, false).fadeIn(800).siblings().stop(true, false).fadeOut(800);
        // 5.6 接收show里面的i(文字盒子),把跟当前点击span小圆点一致的i盒子给显示,其他的隐藏
        $(".show1 i").eq(index).stop(true, false).fadeIn(800).siblings().stop(true, false).fadeOut(800);
        // $(".show div").eq(index).show().siblings().hide();
        // $(".show1 i").eq(index).show(800).siblings().hide(800);
        // console.log($("#tabQH span").eq(index));
        // 5.6 接收show里面的div(图片盒子),把跟当前点击span小圆点一致的div盒子给显示,其他的隐藏
        $("#tabQH span").eq(index).addClass("border demo").siblings().removeClass("border demo");

    });
});



//! 6.创建一个点击返回顶部的事件
$(function () {

    // 6.1接收按钮创造点击事件
    $(".fanhuiD").click(function () {
        //6.2 点击以后 把鼠标滚轮的值返回到顶端
        // $(document).scrollTop(0);
        $("body, html").stop().animate({
            scrollTop: 0
        },1000);

    })
})


//! 7.创建游戏全目录移入移出事件
$(function () {
    $(".qml").mouseenter(function () {

        $(".menuPull").stop(true, false).slideDown(300);
        // console.log('abc');

    });
    $(".qml").mouseleave(function () {
        $(".menuPull").stop(true, false).slideUp(300);
    })

    
})

