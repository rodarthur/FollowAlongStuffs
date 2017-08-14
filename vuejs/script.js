
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

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn Javascript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
      
    ]
  }
});

var app5 = new Vue({
  el: '#app-5',
  data:{
    message: 'Not sure what the point of this is, but w/e'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('');
    }
  }
})


// this one is for v-model, which is a directive that makes two-way binding between form input and app state

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})

//define a new component called todo-item
Vue.component('todo-item', {
  // the todo-item component now accepts a
  // 'prop', which is like a custom attribute.
  // this prop is called todo.
  props: ['todo'],
  template: '<li>This is a todo</li>'
});

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});


var tdbutton = document.getElementById('tdmessage');
tdbutton.addEventListener("click", addapp7);

function addapp7() {
  app7._data.groceryList.push( '{{ tdmessage }}');
}

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' },
      { id: 3, text: 'more more MOAR MOOOOOAAAAARRRRR!!!!'}

    ],
    tdmessage: "asdf"
  }
})