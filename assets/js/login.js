$(function(){
    // 去注册
    $('#register').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 去注册
    $('#login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过 form.verify()  自定义校验规则
    // [\S]非空格
    form.verify({
        'pwd':[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   校验两次密码是否一致，自定义一个规则
          repwd:function(value){
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次密码输入不一致'
                
            }
          },

    })

    // 根路径
    let url = 'http://www.liulongbin.top:3007'
    // 监听注册表单的事件
    $('#reg-form').on('submit',function(e){
       let username = $('#username').val()
       let password = $('#pwd').val()
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:`${url}/api/reguser`,
            data:{username,password},
            success:function(res){
                if (res.status !== 0) {
                   return layer.msg(`${res.message}`);
                }
                layer.msg('注册成功');
                // 实现注册完成后，模拟登录点击
                $('#login').trigger('click')
            }
            
        })
    })

    // 监听登录事件
    $('#login-form').on('submit',function(e){
        e.preventDefault()
        const data = $(this).serialize()
        console.log(data);
        $.ajax({
            method:'POST',
            url:`${url}/api/login`,
            data:data,
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
               layer.msg('登陆成功')

            //    将登陆成功得到的token字符串，保存到本地存储
             localStorage.setItem('token',res.token)
               location.href = './index.html'

            }
        })
    })


    

    
})