//! 7.创建游戏全目录移入移出事件
$(function () {
    $(".qml").mouseenter(function () {

        $(".menuPull").stop(true,false).slideDown(300);
        // console.log('abc');

    });
    $(".qml").mouseleave(function(){
        $(".menuPull").stop(true,false).slideUp(300);
    })
})