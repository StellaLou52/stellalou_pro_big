// // 每次调用get和post等的时候，会先调用这个函数，在这个函数中，可以拿到我们给ajax提供的配置对象
// $.ajaxPrefilter(function(options){

//     options.url = `http://www.liulongbin.top:3007${options.url}`
//     console.log(options.url);
// })