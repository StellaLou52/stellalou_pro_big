$(function(){
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname:function(value){
            if (value.length>6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    UserInfo()
 function UserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
          if (res.status !== 0) {
            return layer.msg('获取用户信息失败')
          }
        //   const {data} = res
        //   console.log(data.username);
        //   $('#username').val(data.username)
        //    $('#nickname').val(data.nickname)
        //    $('#email').val(data.email)

        // 调用form.val()快速为表单赋值  第一个值是哪个表单，第二个值的值
        form.val('formUserInfo',res.data)
        }

    })
 }
// 表单的重置-------------------------------
    $('#reset').on('click',function(e){
        // 阻止重置事件
        e.preventDefault()
        // 再次调用获取用户信息的函数
        getUserInfo()


    })

    // 表单数据的提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                 layer.msg('更新成功')

                //  调用父页面的方法，重新渲染头像和信息
                window.parent(getUserInfo())
               
            }
        })
    })
})