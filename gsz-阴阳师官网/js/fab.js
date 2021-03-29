
$(function () {
  $(".menu").mouseenter(function () {
    $(".menuPull").stop(true, false).delay(300).slideDown(400);
  });
  $(".menu").mouseleave(function () {
    $(".menuPull").stop(true, false).slideUp(200);
  })
})

$(function () {
  //右上网易严选特效
  //声明一个全局的wangYiIndex
  let wangYiIndex = 0;
  setInterval(function () {
    //判断当前是不是最后一个p标签
    if (wangYiIndex == 2) {
      wangYiIndex = 0;
      $('.show .showList')[0].style.top = 0;
    }
    wangYiIndex++;
    $('.show .showList').animate({ 'top': -wangYiIndex * 54 }, 600)
  }, 2000)

  // 楼梯导航
  $(window).scroll(function () {
    //获取当前滚出去的距离
    let currentTop = $(window).scrollTop();

    //让楼梯导航显示
    if (currentTop > 600) {
      $('.nav-show').fadeIn(500);
    }
    // 在这个范围内就让第一个a标签添加类
    if (currentTop > 600 && currentTop < 1100) {
      $('.show1').addClass('active1');
    } else {
      $('.show1').removeClass('active1');
    }

    if (currentTop < 600) {
      //让楼梯导航隐藏
      $('.nav-show').fadeOut(200);
    }

    //在这个范围内就让第二个a标签添加类
    if (currentTop >= 1100 && currentTop < 1700) {
      $('.show2').addClass('active2');
    } else {
      $('.show2').removeClass('active2');
    }

    //在这个范围内就让第三个a标签添加类
    if (currentTop >= 1700 && currentTop < 2600) {
      $('.show3').addClass('active3');
    } else {
      $('.show3').removeClass('active3');
    }

    //在这个范围内就让第四个a标签添加类
    if (currentTop >= 2600 && currentTop < 3600) {
      $('.show4').addClass('active4');
    } else {
      $('.show4').removeClass('active4');
    }

    //在这个范围内就让第五个a标签添加类
    if (currentTop >= 3600) {
      $('.show5').addClass('active5');
    } else {
      $('.show5').removeClass('active5');
    }
  })
  //如果写在滚动事件里面的话，就会得到很多index
  let arr = [0, 1100, 1700, 2600, 3600];
  $('.nav-show a').click(function () {
    let navIndex = $(this).index();
    $('html').animate({ scrollTop: (arr[navIndex]) }, 500)
  })

  //公测集结礼
  $('.mass ul li').mouseenter(function(){
    $(this).stop(true,false).animate({'top':-20},500)
  })
  $('.mass ul li').mouseleave(function(){
    $(this).stop(true,false).animate({'top':20},500)
  })

  //百闻新资讯
  $('.consult>ul li').mouseenter(function () {
    $(this).stop(true, false).animate({ 'top': -30 }, 500)
  })
  $('.consult>ul li').mouseleave(function () {
    $(this).stop(true, false).animate({ 'top': 0 }, 500)
  })


  $('.btn-video').click(function(){
    $('.bigVideo').fadeIn(500);
  })
  $('.close').click(function(e){
    e = e || window.event;
    //阻止事件冒泡
    e.stopPropagation()
    $('.bigVideo').fadeOut(300);
  })



  $('.btn-video2').click(function(e){
    e = e || window.event;
    //阻止事件冒泡
    e.stopPropagation()
    $('.bigVideo2').fadeIn(500);
  })
  $('body').click(function(e){
    e = e || window.event;
    //阻止事件冒泡
    e.stopPropagation()
    $('.bigVideo2').fadeOut(300);
  })



  // 轮播图
  //声明一个全局的索引变量
  let index = 0;
  //给右边的箭头添加点击事件
  $('.showGod .swiper-button-next').click(function () {
    showGodNext();
  })
  // 给左边的箭头加点击事件
  $('.showGod .swiper-button-prev').click(function () {
    //先判断是不是第一张，如果是就跳到最后一张
    if (index == 0) {
      index = 15;
      $('.swiper-wrapper')[0].style.left = -index * 700 + 'px';
    }
    index--;
    $('.swiper-wrapper').animate({ 'left': -700 * index }, 600)
  })
  //把右箭头的点击事件封装成函数
  function showGodNext() {
    //先判断是不是最后一张如果是就瞬间跳到第一张
    if (index > 14) {
      $('.swiper-wrapper')[0].style.left = 0 + 'px';
      index = 0;
    }
    index++;
    $('.swiper-wrapper').animate({ 'left': 700 * -index }, 600)
  }
  //让轮播图自己动
  let showGodTimerID = setInterval(showGodNext, 2000);
  $('.showContent').mouseenter(function () {
    clearInterval(showGodTimerID)
  })
  $('.showContent').mouseleave(function () {
    showGodTimerID = setInterval(showGodNext, 2000);
  })
})


//最底部旋转木马部分
// 0.将每一个元素样式放入数组中
var config = [
  {
    "index":0,
    "width": 200,
    "top": 70,
    "left": 100,
    "opacity": 0.2,
    "zIndex": 2
  },//0
  {
    "index":1,
    "width": 400,
    "top": 100,
    "left": 0,
    "opacity": 0.5,
    "zIndex": 3
  },
  {
    "index":2,
    "width": 700,
    "top": 20,
    "left": 100,
    "opacity": 1,
    "zIndex": 4
  },
  {
    "index":3,
    "width": 400,
    "top": 100,
    "left": 600,
    "opacity": 0.5,
    "zIndex": 3
  },//3
  {
    "index":4,
    "width": 200,
    "top": 100,
    "left": 750,
    "opacity": 0.2,
    "zIndex": 2
  }
];
var liList = $('#ul1>li');
//先声明一个全局的索引变量
let mumaIndex = 0;
//3.点击 左右两个箭头 切换 整个
$('#arrRight').click(mumaNext);


$('#arrLeft').click(function () {
  mumaIndex--;
  if (mumaIndex < 0) { // 如果下标小于0的时候就让下标等于4
    mumaIndex = 4;
  }
  //3.1 将 样式套装 数组 里的 元素 做 修改，将 第一个 元素 还到 最后一个 位置
  // a. 拿出 样式套装数组 中的 第一个 元素
  var firstEle = config.shift();
  // b. 将 取出的 第一个 元素 再重新 追加到 数组 的 最后面
  config.push(firstEle);


  //3.2 按照 样式套装数组 的下标，将 对应 下标的套装 设置给 对应下标的 li 标签
  for (var i = 0; i < liList.length; i++) {
    $(liList[i]).animate(config[i]);
  }
  //点击箭头让页码跟着动
  $('.icon li').eq(mumaIndex).addClass('active').siblings('li').removeClass('active');
});
//把右箭头封装成一个函数
function mumaNext() {
  // 3.1 将 样式套装 数组 里的 元素 做 修改，将 最后一个 元素 放到  第一个位置
  // a. 拿出 样式套装数组 中的 最后一个 元素
  mumaIndex++;
  if (mumaIndex > 4) {
    mumaIndex = 0;
  }
  var lastEle = config.pop();
  // // b. 将 取出的 最后一个 元素 再重新 追加到 数组 的 最前面
  config.unshift(lastEle);
  // //3.2 按照 样式套装数组 的下标，将 对应 下标的套装 设置给 对应下标的 li 标签
  for (var i = 0; i < liList.length; i++) {
    $(liList[i]).animate(config[i]);
  }
  // console.log(mumaIndex)
  // 点击箭头的时候让页码跟着动
  $('.icon li').eq(mumaIndex).addClass('active').siblings('li').removeClass('active');
}
//让轮播图自己动
let mumaTimerID = setInterval(mumaNext, 2000);
$('.wrap').stop(true,false).mouseenter(function () {
  clearInterval(mumaTimerID)
})
$('.wrap').stop(true,false).mouseleave(function () {
  mumaTimerID = setInterval(mumaNext, 2000);
})

//给所有的li添加点击事件
$('.wrap .icon li').click(function(){
  // mumaIndex = $(this).parentNode();
  $('.icon li').eq(mumaIndex).addClass('active').siblings('li').removeClass('active');
  // console.log(mumaIndex)
  console.log($(this).parent().prev().prev()[0].children())

  // for (var i = 0; i < liList.length; i++) {
  //   $(liList[i]).animate(config[i]);
  // }
})

