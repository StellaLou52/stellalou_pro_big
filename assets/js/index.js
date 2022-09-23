$(function(){
    let layer = layui.layer
    // 调用获取用户基本信息
    getUserInfo()
    
    function getUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            // 请求头配置对象  因为文档明确说明了  以My开头，必须要有header
            // headers:{
            //     Authorization:localStorage.getItem('token') || ''
            // },
            success:function(res){
              if (res.status !== 0) {
                return layui.layer.msg('获取失败')
               
              }
              console.log(res);
              renderAvatar(res.data)
            },
            //   这个是无论失败与否，都会执行的函数
            complete:function(res){
              console.log(res);
              // 这个可以通过返回值responseJSON 来判断 ，如果符合要求，则强制退出清空token的值，而且要强制退出index页面，返回login页面
              if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ) {
                  localStorage.removeItem('token')
                  location.href = './login.html'
                  
              }

            }
            
             
            
            
        })
    }
    // 渲染用户的头像
    function renderAvatar(data){
        let name = data.nickname || data.username
        console.log(name);
        $('#welcome').html(`欢迎 ${name}`)
        if (!data.user_pic) {
            console.log(data.user_pic);
            $('.img').hide()
            let text = name[0].toUpperCase()
            $('.text-avatar').html(text).show()
            
        } else{
            $('.text-avatar').hide()
            $('.img').attr('src',data.user_pic).show()
        }
    }

    // 退出的功能
    $('#btn').on('click',function(){
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            // 重新跳转到登录页，并且清空本地缓存
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
          });


        
     

    })
})