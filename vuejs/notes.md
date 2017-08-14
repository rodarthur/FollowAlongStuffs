# Vue.js


- declarative binding
- virtual dom
  - batches updates

Other factors:

- browswer support
- licensing
  - Vue.js, jquery, and angular use MIT
  - react uses some weird custom BSD

Vue.js unpkg URL for a CDN
https://unpkg.com/vue

It always redirects to latest version, but you can use custom version by using this template:
https://unpkg.com/vue@[version]/dist/vue.min.js

#Axios

Not part of vue

https://unpkg.com/axios/dist/axios.min.js

This makes it possible to make http requests in the app

# Here is the stuff!!

Vue = "view"

```javascript
var growler = new Vue({
  el: '#growler",
  data: {

  }
});
```

# Mount Growler onto the DOM

Mounting is when a view becomes visable
el option is how you mount

You can mount using a css selector or using an html element, as show in the following two examples:

```javascript
var growler = new Vue({
  el: document.getElementById('growler')
});

var growler = new Vue({
  el: '#growler',
});
```

**Recommended** Use css because it's easier to read.

**NEVER** Do not set el option to `html` or `body` elements.  Most common to use a div.

# Lifecycle of View

new Vue() -> creation -> mounting -> updating -> destroy

Each four stages has two hooks, that gives before/after control.  They're all named in the following ways:

1. **creation**: beforeCreate, created
2. **mounting**: beforeMount, mounted
3. **updating**: beforeUpdate, updated
4. **destroy**: beforeDestory, destroyed

We'll expand each four stages

## Creation stage 

1. `beforeCreate`
2. Initialized State
3. `created`

Happens when you call a Vue constructor.  Can call with no config and `beforeCreate` will fire.  After the view has created the creation phase, the template is compiled.

## Mounting stage

1. `befoureMount`
2. Create virutal DOM.  The virtual DOM is what allows vue.js to go so performant.
3. `mounted` hook is fired.

Listen for Data Changes.  If any property stage gets changed, it will modify the virtual DOM and/or UI as needed.

## Updating stage

1. `beforeUpdate` is fired, doing any custom code
2.  Re-render Virtual DOM with as few changes as possible.  These changes are called 'patches'. This pattern is from an MIT license OS project called "snabedem". https://github.com/snabbdom/snabbdom
3. `updated` hook gets fired.  View spends most of it's time waiting for updates to view.

## Destroy

1. `beforeDestroy`
2. teardown Virtual DOM
3. `destroyed`

This stage ONLY HAPPENS if you explicitly call the destroy event.  If the user navs to a different page, destroy does not get called.

# Creating Vue.js Templates

Templates use HTML. Templates are HTML spec compliant.

### Overview

- Defining template data
- Binding Content to a template
- Binding to HTML attributes
- Using JavaScript expressions with data properties

## Defining Template Data

**data Property**

- At design time, represents schema
- At runtime, serves as the model

```html
<scirpt type="text/javascript">
  var growler = new Vue({
    el: '#growler',
    data: {
      appName: 'Growler'
    }
  })
</scirpt>

<html>
  <head>
    <title>Growler</title>
  </head>
  <body>
    <div id="growler"></div>
    <script type="text/javascript" src="https://unpkg.com/vue"></script>
  </body>
</html>
```

`data: { appName: 'Growler'}` Is an example of a "Plain Old JavaScript Object" (POJO).  This means you can access vuedata outside the vue object. Vue plays nicely with established web standards like JS.

Vue loads data properties during cration stage.  When a data property changes, everything that relies on the property knows about it.

**Data Property Caveats**

1. You can only modify properties.  You can't add properties at runtime.  You can't remove properties at runtime.  This implies that the data object serves as the schema.  
2. JavaScript objects are formatted differently. Vue uses getters and setters instead of raw object properties. Install an extension called "vue-devtools", which will make developing in vue more smooth.  

**Naming Rules**

- Letters, digits, dollar signs, and underscores
- start with a letter
- case-sensitive
- reserved words cannot be used

Follows JavaScript rules, except property names should not start with `$` nor `_`.  

### binding content to a template

Two syntax for binding text, and...:

- Semantic syntax
- Declarative syntax
- One-time bindings

#### Semantic Bindings

Double-curly braces are sometimes called "mustaches".

Going from mustaches to text is called "interpolation".

#### Declarative Bindings

All baked-in directives begin with "v-".  Instead of saying, "v-text", some people say "text directive".  This v- pattern is for directives, which creates declarative bindings.

Example: `<h2 v-text="appName"></h2>`. **Declarative syntax** byding works great if you want to bind to an element's entire content.  If you need to bind only part of an element, then use the **semantic syntax**, with mustashes.

Vue manages a virtual-DOM for the developer.


#### One Time Bindings

To include performance, you can add `v-once` directive to an element, so that Vue will never be listening for changes.  `v-once` directive tells Vue to render the element exactly once, and *also the children of that element*.

The `v-once` directive helps optimize performance.

#### Binding to HTML, v-html

Look at this example:

```html
<script type="text/javascript">
  var growler = new Vue({
    el: '#growler',
    data: {
      appName: '<a href="/">Growler</a>'
    }
  });
</script>
```

Typically, you would *never* put html inside your data; but in the real world, you may get data from a web page, which may contain html.

To get the rendered version of the html, you use the `v-html` directive. You don't need the mustache bindings with the `v-html` directive because the `v-html` directive updates the innerHTML property of the html element it's attached to.  This replaces the visual tree it's attached to, *including any mustaches*.

This implies you **can't nest bindings**.

**Security NOTE:** Oonly bind to HTML you trust.  Do not bind to user-generated HTML.

#### Binding to HTML Attributes

`v-bind` directive is specifically designed to bind to HTML attributes.  Mustaches can't be used inside of HTML attributes, i.e. `<img alt="Growler" src="{{ appLogo }}" style="height:36px;">`, instead you must use the `v-bind` directive with src, like this: `<img alt="Growler" v-bind:src="appLogo" style="height:36px;">`. Shorthand syntax for `v-bind:src="appLogo"` is: `:src="appLogo"`.

What we're doing here is binding *to an HTML attribute*.

#### Binding to CSS Properties.

Have to choose between getting CSS properties from a JavaScript Object, *or* a JavaScript Array, *but not both*.

From a JS Object works durring binding. 

- Each property in object must be name of CSS property
- Value can be property name or static value

Example that sets color of app name:
```html
<div id="growler">
  <h2
    v-bind:style="{ color:color }">
    {{ appName }}
  </h2>
</div>
```

One problem: what if you want to bind to `font-family` property? JS object doesn't allow dashes `-` in their property names.  Vue.js allows you to work around the limitation by changing kabab casing to camel casing.  `font-family` becomes `fontFamily`.

**Using an Array to bind CSS properties**

For using multiple style definitions in bindings:

```html
<div id="growler">
  <h2
    v-text="appName"
    v-bind:style="[accentColor, headers]">
  </h2>
</div>
```

And the JS:

```javascript
var growler = new Vue({
  el: '#growler',
  data: {
    appName: 'Growler',
    accentColor: {
      color: '#ff6a00',
    },
    headers: {
      fontFamily: 'Verdana',
      margin: 0
    }
  }
});
```

When arrays are used, the CSS properties are applied from left to right, and that means last wins.  As a general rule, attempt to keep CSS seperate from data.  Just bind to the CSS class instead of putting CSS in the data.

#### Binding to CSS Classes

Previous example refactored to use CSS classes:


```html
<style>
  .headers {
    font-family: 'Verdana';
    margin: 0;
  }
  
  .accent-color {
    color: #ff6a00;
  }
</style>

<div id="growler">
  <h2
    v-text="appName"
    v-bind class="[accentColor, headers]">
  </h2>
</div>
```

And the JS:

```javascript
var growler = new Vue({
  el: '#growler',
  data: {
    appName: 'Growler',
    accentColor: 'accent-color',
    headers: 'headers'
  }
});
```

Review:

- Get CSS Classes from an Object
- Get CSS classes from an Array
- Bind to specific CSS properties

#### Using JavaScript Expressions

Only JavaScript expressions can be used in bindings.  To do it, use mustaches. Expressions are evaluated within context of a view.

Here is an example of an expression in action.

```javascript
var growler = new Vue({
  el: '#growler',
  data: {
    appName: 'Growler',
    isOnline: false
  }
});
```

Here is the html:

```html
<h2
  v-text="appName"
  v-bind:style=
    "{ color: isOnline? '#ff6a00':'#000' }">
</h2>
```

This expression is used to determine the color of the header.  The style is applied conditionally at runtime.

**Expressions run within a Vue Sandbox.**

Here is a list of Whitelisted Globals (whatever that means)...

##### Properties

Infinity, undefined, NaN

##### Functions
parseFloat, parseInt, isNaN, isFinite, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent

##### Objects
Math, Number, Data, Array, Object, Boolean, String, RegExp, Map, Set, JSON, Intl

##### Webpack /Browerify
require

Global variables that are whitelisted can't be used in expressions.  These global variables may conflict with Vue itself.

Review:
- Use JavaScript Expressions
- Bind to HTML attributes
- Bind content to a template
- setup the data