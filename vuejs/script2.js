
// import Vue, { ComponentOptions } from 'vue'

// export default {

// }


// var vm = new Vue({
//   // options
// });

// var MyComponent = Vue.extend({
//   // extension options
// });

// var myComponentInstance = new MyComponent();

var data = { a: 1};
var vm = new Vue({
  data: data
});

vm.a === data.a // -> true

// setting the property also affects original data
vm.a = 2;
data.a // -> 2

// ... and vice-versa
data.a = 3;
vm.a // ->

// wow this is pretty cool.  I can go from property to data, and from data to property.

