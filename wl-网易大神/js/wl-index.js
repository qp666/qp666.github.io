// banner部分

// 鼠标移入移出点击事件开始
document.querySelector('#small1').onmouseover = function () {
    this.style.backgroundPosition = '-185px -324px';
};
document.querySelector('#small1').onmouseout = function () {
    this.style.backgroundPosition = '0px -385px';
};
document.querySelector('#small1').onclick = function () {
    this.style.backgroundPosition = '0px -324px';
};
document.querySelector('#small2').onmouseover = function () {
    this.style.backgroundPosition = '0 -445px';
};
document.querySelector('#small2').onmouseout = function () {
    this.style.backgroundPosition = '-184px -445px';
};
document.querySelector('#small2').onclick = function () {
    this.style.backgroundPosition = '-184px -385px';
};
var divList = document.querySelector('#con');
var sList = document.querySelector('#small3');
sList.onmouseenter = function () {
    this.style.backgroundPosition = '-370px -325px';
    divList.style.display = 'block';
};
sList.onmouseleave = function () {
    this.style.backgroundPosition = '-430px -325px';
    divList.style.display = 'none';
};
// 鼠标移入移出点击事件结束
var b1=document.querySelector('#b1');
var imgstyle1=document.querySelector('#changeimg2');
document.querySelector('#changeimg1').onclick = function () {
    imgstyle1.src = './images/wl-dianzan4.png';
    b1.style.display='none';
    imgstyle1.style.width=55+'px';
}
var b2=document.querySelector('#b2');
var imgstyle2=document.querySelector('#changeimg4');
document.querySelector('#changeimg3').onclick = function () {
    imgstyle2.src = './images/wl-dianzan4.png';
    b2.style.display='none';
    imgstyle2.style.width=55+'px';
}
var b3=document.querySelector('#b3');
var imgstyle3=document.querySelector('#changeimg5');
document.querySelector('#changeimg6').onclick = function () {
    imgstyle3.src = './images/wl-dianzan4.png';
    b3.style.display='none';
    imgstyle3.style.width=55+'px';
}
var b4=document.querySelector('#b4');
var imgstyle4=document.querySelector('#changeimg7');
document.querySelector('#changeimg8').onclick = function () {
    imgstyle4.src = './images/wl-dianzan4.png';
    b4.style.display='none';
    imgstyle4.style.width=55+'px';
}
// footer部分开始
document.querySelector('#one').onmouseover = function () {
    this.style.backgroundPosition = '-185px -324px';
};
document.querySelector('#one').onmouseout = function () {
    this.style.backgroundPosition = '0px -385px';
};
document.querySelector('#one').onclick = function () {
    this.style.backgroundPosition = '0px -324px';
};
document.querySelector('#two').onmouseover = function () {
    this.style.backgroundPosition = '0 -445px';
};
document.querySelector('#two').onmouseout = function () {
    this.style.backgroundPosition = '-184px -445px';
};
document.querySelector('#two').onclick = function () {
    this.style.backgroundPosition = '-184px -385px';
};
var sList = document.querySelector('#three');
sList.onmouseover = function () {
    this.style.backgroundPosition = '-371px -325px';
};
sList.onmouseout = function () {
    this.style.backgroundPosition = '-430px -325px';
};
// footer部分结束