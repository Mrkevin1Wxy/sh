$(function(){

  //配置表单验证

  $('#form').bootstrapValidator({
      //配置图标
      feedbackIcons:{
        valid:'glyphicon glyphicon-ok',
        invalid:'glyphicon glyphicon-remove',
        validating:'glyphicon glyphicon-refresh',
      },


      //指定校验字段
      fields:{
        username:{
          //配置校验规则
          validators:{
            //设置不能为空
            notEmpty:{
              message:"用户名不能为空"
            },

            stringLength:{
              min:2,
              max:6,
              message:"用户名长度必须在 2-6 位",
            },

            callback:{
              message:"用户名不存在"
            }

          },

        },

        password:{
          validators:{
            notEmpty:{
              message:"密码不能为空"
            },

            stringLength:{
              min:6,
              max:12,
              message:"密码长度必须在 6-12位"
            },

            callback:{
              message:"密码错误"
            }
          }
        }
      }
  });


  //重置表单BUG 重置的表单不仅要重置内容,还要重置校验

  $('[type="reset"]').click(function(){
    //调用插件的方法
    $('#form').data('bootstrapValidator').resetForm();
    
  });

  //使用sumbit按钮,进行提交,表单验证插件 会在提交时,进行校验

  //如果校验成功,就默认提交这次请求,会进行页面跳转,所以我们㤇阻止默认的提交行为,用AJAX 进行提交
  //如果校验失败,会提示用户输入错误

  $('#form').on("success.form.bv",function( e ){
    //阻止默认的提交
    e.preventDefault();

    console.log("阻止了默认的提交,通过ajax 提交");

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:'json',

      success:function( info ){
        console.log(info);
        if(info.success){
          location.href="index.html"
        }

        if(info.error === 1000){
          $('#form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
        }

        if(info.error === 1001){
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
        
      }
    })
    
  })


})