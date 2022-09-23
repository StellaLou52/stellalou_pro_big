$(function(){
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function(value){
            if (value === $('#oldPwd').val()) {
          return '新旧密码不能相同'
                
            }
          },
          sameNewPwd:function(value){
            if (value !== $('#newPwd').val()) {
                return '两次密码输入不一致'
                
            }

        }
               
              
    
    })
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/updatepwd',
        data:$(this).serialize()  ,
        success:function(res){
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('修改失败')
            }
            layui.layer.msg('修改成功')
            // 重置表单
            $('.layui-form')[0].reset()
        }

    })
  })
})