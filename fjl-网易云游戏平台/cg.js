
$(function () {
    $(".nav>a").click(function () {

        var index = $(this).index();
        $(".dshow>ul").eq(index).slideDown(800).siblings().hide(800);

    })

    $("#download").mouseenter(function(){
        $(this).children('div').stop().slideDown(500);
    });
    $("#download").mouseleave(function(){
        $(this).children('div').stop().slideUp(300);
    });

})
    

let zheZdom = document.querySelector('.zheZ');
let submit = document.querySelector('#submit');
let dfeedback = document.querySelector('.dfeedback');
let logo = document.querySelector('.logo');
submit.onclick = function(e){
    zheZdom.style.display = 'block';
    dfeedback.style.display = 'block';
    e.stopPropagation();
};

dfeedback.onclick = function (e){
    e.stopPropagation();
}
document.onclick = function(){
    zheZdom.style.display = 'none';
    dfeedback.style.display = 'none';
};


// window.onmousewheel()=function (e) {
//     if (e.wheelDelta) {
//         logo.style.backgroungColor = '#304051';
//     }
// }

// //兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
//     //判断鼠标滚轮滚动方向
//     if (window.addEventListener)//FF,火狐浏览器会识别该方法
//         window.addEventListener('DOMMouseScroll', wheel, false);
//     window.onmousewheel = document.onmousewheel = wheel;//W3C
//     //统一处理滚轮滚动事件
//     function wheel(event) {
//         var delta = 0;
//         if (!event) event = window.event;
//         if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
//             delta = event.wheelDelta / 120;
//             if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
//         } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
//             delta = -event.detail / 3;
//         }
//         if (delta)
//             handle(delta);
//     }
//     //上下滚动时的具体处理函数
//     function handle(delta) {
//         if (delta < 0) {//向下滚动
//             // document.documentElement.style.backgroundColor = 'red';
//             logo.style.backgroungColor = '#304051';
//         } else {//向上滚动


//         }
//     }

// $(document).on('mousewheel DOMMouseScroll', onMouseScroll);
// function onMouseScroll(e){
//     e.preventDefault();
//     var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
//     var delta = Math.max(-1, Math.min(1, wheel) );
//     if(delta<0){//向下滚动
//         logo.style.backgroungColor = 'red';
//         console.log('6541');
//     }else{//向上滚动
//     }    
// }

// //滚动动画
// windowAddMouseWheel();
// function windowAddMouseWheel() {
//     var scrollFunc = function (e) {
//         e = e || window.event;
//         if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
//             if (e.wheelDelta > 0) { //当滑轮向上滚动时
//                 logo.style.backgroungColor = 'red';
//             }
//             if (e.wheelDelta < 0) { //当滑轮向下滚动时
//                 logo.style.backgroungColor = 'red';
//             }
//         } else if (e.detail) {  //Firefox滑轮事件
//             if (e.detail> 0) { //当滑轮向上滚动时
//                 logo.style.backgroungColor = 'red';
//             }
//             if (e.detail< 0) { //当滑轮向下滚动时
//                 logo.style.backgroungColor = 'red';
//             }
//         }
//     };
//     //给页面绑定滑轮滚动事件
//     if (document.addEventListener) {
//         document.addEventListener('DOMMouseScroll', scrollFunc, false);
//     }
//     //滚动滑轮触发scrollFunc方法
//     window.onmousewheel = document.onmousewheel = scrollFunc;
// }

