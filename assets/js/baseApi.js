// // 每次调用get和post等的时候，会先调用这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){

    options.url = `http://www.liulongbin.top:3007${options.url}`
    console.log(options.url);

    // 统一为有权限的接口，设置headers请求头

    if (options.url.indexOf('/my/') !== -1) {
       options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
        
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res){
            // 这个可以通过返回值responseJSON 来判断 ，如果符合要求，则强制退出清空token的值，而且要强制退出index页面，返回login页面
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！' ) {
                localStorage.removeItem('token')
                location.href = './login.html'
            }

    }
   
})