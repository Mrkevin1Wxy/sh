$(function(){
  var currentPage = 1; //当前页
  var pageSize = 5; //每页多少条

  var currentId;
  var isDelete;


  render();
  function render(){
    $.ajax({
      type:'get',
      url:"/user/queryUser",
      data:{
        page: currentPage,
        pageSize: pageSize,
      },
      dataType:'json',
      success:function( info ){
        console.log( info );
        var htmlStr = template("tmp" , info);
        $('tbody').html( htmlStr);



        $('#paginator').bootstrapPaginator({
          //定义分页的版本号
          bootstrapMajorVersion: 3,
          //总共有多少页
          totalPages: Math.ceil(info.total / info.size),
          //当前第几页
          currentPage: info.page,
          //配置按钮点击事件 ,page表示当前点击的页码
          onPageClicked(a , b ,c , page){
            console.log(page);
            currentPage = page;
            
            render();
          }

         })
  
      }
    })
  }


  //启用禁用功能,点击按钮,弹出模态框(复用, 用的是同一个模态框)
  //通过事件委托来注册点击事件

  $('tbody').on("click", ".btn", function(){
    // 让模态框显示
    $('#userModal').modal("show");
    //点击的时候,将当前用户id记录在全局currentId
    currentId = $(this).parent().data("id");
    //点击禁用按钮,让用户变成禁用状态,让isDelete 变成0 传给后台.
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

  });

  //点击确定按钮,需要根据id 和 isDelete 发送ajax 请求, 修改用户状态.
  $('#submitBtn').click(function(){
    console.log("currentId:"+ currentId);
    console.log("isDelete:" + isDelete);
    
    $.ajax({
      type:'post',
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },

      dataType:'json',
      success:function( info ){
        console.log( info );
        // 关闭模态框
        $('#userModal').modal("hide");

        //重新渲染数据
        render();
      }
    })
  })
})
