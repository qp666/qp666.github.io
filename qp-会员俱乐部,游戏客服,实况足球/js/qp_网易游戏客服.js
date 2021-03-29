//!  1.创建一个 点击游戏盒子切换显示内容的事件
$(function () {
    //1.1创建li的点击事件
    $(".shang li").click(function () {

        //1.2创建一个变量来接收 li
        var $Li = $(".shang li");
        // 链式编程操作

        //1.3 被点击的li添加故意而类名为on, 其他li移除类名为on
        $(this).addClass("on").siblings().removeClass("on");
        // 2.点击的同时，得到当前li 的索引号
        var index = $(this).index();
        console.log(index);


        //1.4如果box游戏盒子里面的div 下标跟点击的li下标一样,那么就滑出下标一致的盒子,其他的盒子隐藏
        $(".boxGame>div").eq(index).slideDown(800).siblings().hide(800);





        // 1.5 如果当前点击li的下标等于1||2,盒子的高度就改成550px
        if ($Li.index = 1 || 2) {
            $('.boxGame').css({

                height: '600px',


            });
            //1.6 btn按钮里面的值改成更多
            $('.btn2').text('更多');
            //1.7 把第1个盒子下面的内容隐藏起来
            $('.yinCang').hide();
        }

    });





    //! 2.给btn2(更多)按钮创建点击事件

    //2.1 声明一个i为true
    var i = true;

    //2.2 接收btn2按钮添加点击事件
    $(".btn2").click(function () {
        // 链式编程操作

        //2.3 如果i = true,把boxGame盒子的高设置成870
        if (i == true) {

            $('.boxGame').css({

                height: '870px',

            });
            //2/4  按钮里的文字设置为收起
            $('.btn2').text('收起');;
            //2.5隐藏的盒子显示出来
            $('.yinCang').show(100);
            //2.6 把i改成false,退出这个函数
            i = false;
            console.log(i);
            return;


        }
        //3.1 如果i的false,boxGame大盒子高度设置为500px
        if (i == false) {
            $('.boxGame').css({

                height: '500px',

            });
            //3.2把btn2的文字改成更多
            $('.btn2').text('更多');
            //3.3 yincang盒子隐藏起来
            $('.yinCang').hide();
            //3.4  i改为true ,方便下一次点击
            i = true;
            console.log(i);
        }

    });
});


//! 4 给btn登录按钮创造登录效果

$(function () {
    $(".btn1").click(function () {
        $(".login,.loginmask").fadeIn();
    });
    $(".login>span,.loginmask").click(function () {
        $(".login,.loginmask").fadeOut();
    })



});