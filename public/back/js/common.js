// 公共功能

//如果当前用户没有登录,需要拦截到登录界面
//前端不知道用户是否登录,需要请求后台,后台告知是否登录

if(location.href.indexOf("login.html") === -1){
  //如果地址里参数没有login.html,索引值就为-1 ,需呀拦截
  $.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    dataType:'json',
    success:function( info ){
      console.log( info);

      if(info.error === 400){
        location.href="login.html";
      }
      if(info.success){
        console.log("当前用户已经登录");
        
      }
    }
  })

}




//进度条
$(document).ajaxStart(function(){
  Nprogress.start();
});
//请求结束进度条结束
$(document).ajaxStop(function(){
   setTimeout(function(){
     Nprogress.done();
   },500);
})


$(function(){
    // 侧边栏二级菜单显示
    $(".lt_aside .category").on("click",function () {
      $(".lt_aside .child").stop().slideToggle();
    })
    //左边栏
    $(".lt_topbar .icon_menu").on('click',function(){
      $('.lt_aside').toggleClass("hidemenu");
      $('.lt_main').toggleClass("hidemenu");
      $('.lt_topbar').toggleClass("hidemenu");
    });


    $('.lt_topbar .icon_logout').on("click", function(){
      //显示模态框
      $('#logoutModal').modal("show");
    });

//点击模态框退出,后台销毁当前登录
    $('#logoutBtn').on('click',function(){
       
      $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          dataType:'json',
          success:function (info){
            console.log(info);
            if(info.success){
              location.href="login.html";
            }
            
          }
        })

    })
});

