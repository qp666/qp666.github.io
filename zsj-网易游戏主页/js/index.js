// 头部通栏的下拉按钮
$(function () {
    $('.topOpen').click(function () {
        $('.topNav').slideToggle(500);
        if (!$('.topOpen').hasClass('open')) {
            $('.topOpen').animate({ backgroundColor: '#282b2d' }, 500);
            $('.topOpen').addClass('open');
        } else {
            $('.topOpen').animate({ backgroundColor: '#cf1132' }, 500);
            $('.topOpen').removeClass('open');
        }

    });
});

// 轮播图
$(function () {
    //声明一个变量,用来记录显示图片的索引
    let picIndex = 0;
    //初始化右边箭头盒子内容
    $('.next-box>.s-img>img')[0].src = $('#imgGroup li').eq(picIndex + 1).find('img')[0].src;
    $('.next-box>h2')[0].innerHTML = $('#imgGroup li').eq(picIndex + 1).find('h2')[0].innerHTML;
    $('.next-box>p')[0].innerHTML = $('#imgGroup li').eq(picIndex + 1).find('h3')[0].innerHTML;
    //初始化左边箭头盒子内容
    $('.prev-box>.s-img>img')[0].src = $('#imgGroup li').eq(4).find('img')[0].src;
    $('.prev-box>h2')[0].innerHTML = $('#imgGroup li').eq(4).find('h2')[0].innerHTML;
    $('.prev-box>p')[0].innerHTML = $('#imgGroup li').eq(4).find('h3')[0].innerHTML;

    // 声明一个变量，判断是否自动轮播
    let flag = true;
    // 设置计时器，每隔5s执行右边焦点的点击事件
    let timerId = setInterval(function () {
        $('.head-next').click();
    }, 5000);

    // 给小圆点添加点击事件，点击，切换圆点图片
    $('.head-ctrl>a').click(function () {
        // 获取当前圆点下标，并设置给图片索引
        picIndex = $(this).index();
        // 给点击的圆点切换成点击状态图片，其他兄弟圆点换成原始状态图片
        $(this).addClass('cur').siblings('a').removeClass('cur');
        // 当前下标图片淡入，兄弟下标图片淡出
        $('#imgGroup li').eq(picIndex).fadeIn(500).siblings('li').fadeOut(500);

        // 根据当前下标改变左右箭头盒子的内容
        // 图片下标： 0 1 2 3 4
        let $curLiLeft;
        let $curLiRight;
        if (picIndex < 4 && picIndex > 0) {
            $curLiLeft = $('#imgGroup li').eq(picIndex - 1); //li jquery对象
            $curLiRight = $('#imgGroup li').eq(picIndex + 1); //li jquery对象
        } else if (picIndex == 0) {
            $curLiLeft = $('#imgGroup li').eq(4);
            $curLiRight = $('#imgGroup li').eq(picIndex + 1); //li jquery对象
        } else if (picIndex == 4) {
            $curLiLeft = $('#imgGroup li').eq(picIndex - 1); //li jquery对象
            $curLiRight = $('#imgGroup li').eq(0);
        }
        // 左边箭头盒子的内容跟着改变
        $('.prev-box>.s-img>img')[0].src = $curLiLeft.find('img')[0].src;
        $('.prev-box>h2')[0].innerHTML = $curLiLeft.find('h2')[0].innerHTML;
        $('.prev-box>p')[0].innerHTML = $curLiLeft.find('h3')[0].innerHTML;
        // 右边箭头盒子的内容跟着改变
        $('.next-box>.s-img>img')[0].src = $curLiRight.find('img')[0].src;
        $('.next-box>h2')[0].innerHTML = $curLiRight.find('h2')[0].innerHTML;
        $('.next-box>p')[0].innerHTML = $curLiRight.find('h3')[0].innerHTML;
    });



    //给右边焦点设置一个点击事件. 
    $('.head-next').click(function () {
        // 图片下标： 0 1 2 3 4
        let $curLiLeft;
        let $curLiRight;
        // 左边箭头盒子的内容跟着改变
        $curLiLeft = $('#imgGroup li').eq(picIndex);
        $('.prev-box>.s-img>img')[0].src = $curLiLeft.find('img')[0].src;
        $('.prev-box>h2')[0].innerHTML = $curLiLeft.find('h2')[0].innerHTML;
        $('.prev-box>p')[0].innerHTML = $curLiLeft.find('h3')[0].innerHTML;

        picIndex++;

        // 右边箭头盒子的内容变化
        //判断
        if (picIndex < 4 && picIndex > 0) {
            $curLiRight = $('#imgGroup li').eq(picIndex + 1); //li jquery对象
        } else if (picIndex == 4) {
            $curLiRight = $('#imgGroup li').eq(0);
        } else {
            //当下标为5时，更改图片索引值为0
            picIndex = 0;
            $curLiRight = $('#imgGroup li').eq(1);
        }

        // 获取当前点击事件中 下标 后面要展示的li 的img路径， h2和h3中的内容
        $('.next-box>.s-img>img')[0].src = $curLiRight.find('img')[0].src;
        $('.next-box>h2')[0].innerHTML = $curLiRight.find('h2')[0].innerHTML;
        $('.next-box>p')[0].innerHTML = $curLiRight.find('h3')[0].innerHTML;
        // console.log(picIndex);
        //把索引对应的这张图片动画显示(fadeIn),其他的图片动画隐藏(fadeOut)
        $('#imgGroup li').eq(picIndex).fadeIn(500).siblings('li').fadeOut(500);
        $('.head-ctrl>a').eq(picIndex).addClass('cur').siblings('a').removeClass('cur');

    });

    //左边焦点设置一个点击事件
    $('.head-prev').click(function () {
        // 图片下标： 0 1 2 3 4
        let $curLiLeft;
        let $curLiRight;
        // 右边箭头盒子的内容跟着改变
        $curLiRight = $('#imgGroup li').eq(picIndex);
        $('.next-box>.s-img>img')[0].src = $curLiRight.find('img')[0].src;
        $('.next-box>h2')[0].innerHTML = $curLiRight.find('h2')[0].innerHTML;
        $('.next-box>p')[0].innerHTML = $curLiRight.find('h3')[0].innerHTML;

        picIndex--;

        // 左边箭头盒子的内容变化
        //判断
        if (picIndex < 4 && picIndex > 0) {
            $curLiLeft = $('#imgGroup li').eq(picIndex - 1); //li jquery对象
        } else if (picIndex == 0) {
            $curLiLeft = $('#imgGroup li').eq(4);
        } else {
            // 当下标为-1时，更改图片索引值为4
            picIndex = 4;
            $curLiLeft = $('#imgGroup li').eq(3);
        }

        // 获取当前点击事件中 下标 前面面要展示的li 的img路径， h2和h3中的内容
        $('.prev-box>.s-img>img')[0].src = $curLiLeft.find('img')[0].src;
        $('.prev-box>h2')[0].innerHTML = $curLiLeft.find('h2')[0].innerHTML;
        $('.prev-box>p')[0].innerHTML = $curLiLeft.find('h3')[0].innerHTML;
        // console.log(picIndex);

        //把索引对应的这张图片动画显示(fadeIn),其他的图片动画隐藏(fadeOut)
        $('#imgGroup li').eq(picIndex).fadeIn(500).siblings('li').fadeOut(500);
        $('.head-ctrl>a').eq(picIndex).addClass('cur').siblings('a').removeClass('cur');
    });

});

// 广告盒子的tab切换
$(function () {
    $('.pic-news-ctrl a').click(function () {
        //声明一个变量,用来记录显示图片的索引
        let picIndex = $(this).index();
        $(this).addClass('cur').siblings('a').removeClass('cur');
        $('.pic-news-wrap a').eq(picIndex).fadeIn(1000).siblings('a').fadeOut(500);
    });
});

// 活动内容盒子 鼠标移入事件 图片闪一下
$(function () {
    $('.activity-list li').mouseenter(function () {
        $(this).animate({ 'opacity': '0.5' }, 300).animate({ 'opacity': '1' }, 300)
    });
});

// 游戏区
$(function () {
    let boxIndex;
    $('.hot-wrap').each(function (index, ele) {
        // console.log(index) //遍历的元素的索引.
        //console.log(ele);//遍历出来的一个个的元素,是dom对象
        if ($(ele).css('display') == 'block') {
            // 遍历判断出 当前显示的盒子的下标
            boxIndex = index;
        }
    });
    // 当前显示的盒子 修改css3动画的完成时间，一个接一个的显示
    $($('.hot-wrap').eq(boxIndex)[0].children).each(function (index, ele) {
        $(ele).css('animation-duration', '1.' + index + 's');
    });
    // 给“换一批”添加点击事件
    $('.reload span').click(function () {
        // 第一个定时器：让当前显示的游戏盒子 收缩隐藏，一个接一个隐藏
        let timerId1 = setTimeout(() => {
            $('.hot-box').css('animation', 'scaleDraw2 1s ease-in-out');
            $('.hot-wrap').eq(boxIndex).find('.hot-box').each(function (index, ele) {
                $(ele).css('animation-duration', '1.' + index + 's');
            });
        }, 0);
        // 第二个定时器：让当前显示的游戏盒子隐藏，修改css3动画为放大显示
        let timerId2 = setTimeout(() => {
            // $('.hot-wrap').eq(boxIndex).css('display', 'none');
            $('.hot-wrap').eq(boxIndex).hide();
            $('.hot-box').css('animation', 'scaleDraw 1s ease-in-out');
        }, 1000);
        // 第三个定时器：让当前显示的游戏盒子的下一个游戏盒子显示，一个接一个显示
        let timerId3 = setTimeout(() => {
            boxIndex++
            if (boxIndex == $('.hot-wrap').length) {
                boxIndex = 0;
            }
            $('.hot-wrap').eq(boxIndex).find('.hot-box').each(function (index, ele) {
                $(ele).css('animation-duration', '1.' + index + 's');
            });
            // $('.hot-wrap').eq(boxIndex).css('display', 'block');
            $('.hot-wrap').eq(boxIndex).show();
        }, 1001);
    })
    // 刷新页面
    $('.reload i').click(function () {
        refresh();
    });
    function refresh() {
        window.location.reload();//刷新当前页面.
    }
});

// 游戏导航区的显示和隐藏
$(function () {
    let isShow = true;
    $('#btn-more').click(function () {
        if (isShow) {
            $('.showNav').height(713);
            $('#btn-more')[0].innerHTML = '收起';
            isShow = false;
        } else {
            $('.showNav').height(460);
            $('#btn-more')[0].innerHTML = '查看更多';
            isShow = true;
        }
    });
});