// 0.将每一个元素样式放入数组中

var config = [{
    "width": 400,
    "top": 70,
    "left": 100,
    "opacity": 0.2,
    "zIndex": 2
  }, //0
  {
    "width": 600,
    "top": 100,
    "left": 0,
    "opacity": 0.5,
    "zIndex": 3
  },
  {
    "width": 1000,
    "top": 20,
    "left": 100,
    "opacity": 1,
    "zIndex": 4
  },
  {
    "width": 600,
    "top": 100,
    "left": 600,
    "opacity": 0.5,
    "zIndex": 3
  }, //3
  {
    "width": 400,
    "top": 100,
    "left": 750,
    "opacity": 0.2,
    "zIndex": 2
  }
];




$(function () {
  //1.移入大盒子显示 左右两个箭头
  //2.移出大盒子隐藏 左右两个箭头
  $('#wrap').mouseover(function () {
    $('#arrow').show();
  }).mouseout(function () {
    $('#arrow').hide();
  });

  var liList = $('#ul1>li');


  let mumaIndex = 0; //------

  //3.点击 左右两个箭头 切换 整个
  $('#arrRight').click(function () {
    // 3.1 将 样式套装 数组 里的 元素 做 修改，将 最后一个 元素 放到  第一个位置
    // a. 拿出 样式套装数组 中的 最后一个 元素
    // alert('a')
    var lastEle = config.pop();
    // // b. 将 取出的 最后一个 元素 再重新 追加到 数组 的 最前面
    config.unshift(lastEle);
    // console.log($(liList[i]));
    // //3.2 按照 样式套装数组 的下标，将 对应 下标的套装 设置给 对应下标的 li 标签
    for (var i = 0; i < liList.length; i++) {
      $(liList[i]).animate(config[i]);

      //  let index = $(liList[i]).index();
    }
    mumaIndex++;
    if (mumaIndex == 5) {
      mumaIndex = 0
    }
    // 点击箭头的时候让页码跟着动
    $('.icon li').eq(mumaIndex).addClass('active').siblings('li').removeClass('active');


  });


  $('#arrLeft').click(function () {
    //3.1 将 样式套装 数组 里的 元素 做 修改，将 第一个 元素 还到 最后一个 位置
    // a. 拿出 样式套装数组 中的 第一个 元素
    var firstEle = config.shift();
    // b. 将 取出的 第一个 元素 再重新 追加到 数组 的 最后面
    config.push(firstEle);


    //3.2 按照 样式套装数组 的下标，将 对应 下标的套装 设置给 对应下标的 li 标签
    for (var i = 0; i < liList.length; i++) {
      $(liList[i]).animate(config[i]);
    };


    console.log(mumaIndex);

    mumaIndex--;
    if (mumaIndex == -1) {
      mumaIndex = 4
    }
    // 点击箭头的时候让页码跟着动
    $('.icon li').eq(mumaIndex).addClass('active').siblings('li').removeClass('active');


  });



});
//小圆点的点击事件

// $(function () {
//   $(".icon>li").click(function () {
//     var liIndex = $(this).index();
   
//     // console.log('abc');

//   });
//   // $(".qml").mouseleave(function () {
//   //   $(".menuPull").stop(true, false).slideUp(300);
//   // })
// })






// 滚轮划入第几行显示弹窗--------------------------
window.onscroll = function () {
  // console.log("滚轮" + scrollY);
  if (scrollY > 700) {
    $('.tanwin-l,.tanwin-r').stop(true, false).fadeIn(400);

  }
  if (scrollY < 700) {
    $('.tanwin-l,.tanwin-r').stop(true, false).fadeOut(400);

  }
};

$(function () {

  // 给弹窗移入显示---------------------
  // $('.banner').mouseenter(function(){
  //   // console.log('2');

  //   $('.tanwin-l,.tanwin-r').stop(true,fals e).fadeIn(400);
  // });
  // $('.banner').mouseleave(function(){
  //   // console.log('2');
  //   $('.tanwin-l,.tanwin-r').stop(true,false).fadeOut(400);
  // })
  // ;

  // $('.tanwin-l,.tanwin-r').mouseenter(function(){
  //   // console.log('2');

  //   $('.tanwin-l,.tanwin-r').stop(true,false).fadeIn(400);
  // });
  // $('.tanwin-l,.tanwin-r').mouseleave(function(){
  //   // console.log('2');
  //   $('.tanwin-l,.tanwin-r').stop(true,false).fadeOut(400);
  // })


  $('.btn').click(function () {
    // alert('2')
    $('.tanwin-l,.tanwin-r').stop(true, false).hide();
  })

  $('#in').click(function () {
    alert('ll')
    $('#login').show();
  })


})
// 自动轮播-------------------------

setInterval(function () {

  // console.log(idd);
  $('#arrRight').click();
}, 5000);

// 顶部tab------------------------------------
$(function () {
  $(".qml").mouseenter(function () {

    $(".menuPull").stop(true, false).slideDown(300);
    // console.log('abc');

  });
  $(".qml").mouseleave(function () {
    $(".menuPull").stop(true, false).slideUp(300);
  })
})


