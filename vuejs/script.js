
// window.addEventListener('load', stuffloaded);

// function stuffloaded() {
//   });

  
// };


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
});

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});

var x = document.getElementById("app3seenswitch");
x.addEventListener("click", function() {
  app3.seen = !app3.seen;
  // console.log('this is doing something');
});

// function a(){app3.seen = !app3.seen;console.log('this is doing something');}