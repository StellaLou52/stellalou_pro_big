$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#chooseImage').on('click', function () {
        // 这一步是拷贝file文件上传的功能
        $('#file').trigger('click')
    })
    //   为文件选择框，添加change事件
    $('#file').on('change', function (e) {
        let fileslist = e.target.files
        if (fileslist.length === 0) {
            return layer.msg('请选择照片')
        }
        let files = e.target.files[0]
        // 将文件转化为路径，使用URL.createObjectURL(files)方法
        var newImgURL = URL.createObjectURL(files)
        console.log(newImgURL);

        // 重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })
    $('#btnUpload').on('click',function(){
        // 1、拿到用户裁剪之后的头像
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')   
          // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //   base64就是将
// 发起请求，将裁剪后的头像上传到服务器
      $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{avatar:dataURL},
        success:function(res){
            if (res.status !== 0) {
                console.log(res);
            }
            // 成功后，再次调用index.js页面的渲染用户信息的函数
            window.parent.getUserInfo()
        }
      })
    })
})