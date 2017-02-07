/*  ============================================================= */
/*  mn1_data is menu item data , "1" mean 1 row of menu */ 
/*  "\"  use to concat string multiple line in javascript */
/*  @mouseover is v-on:mouseover                                  */
/*  :style     is v-bind:style                                    */
/*  ============================================================= */
var mn1_data  = {
    props : ["text","url"]
    ,template: '<div @mouseover="hili(true)" @mouseout="hili(false)" \
                     @click="open1()"  \
                    :style="style1"><a v-bind:href="url" :style="style2">\
                    {{text}}</a></div>'
    ,data : function() {
      return {
        style1 : {backgroundColor: "lightyellow" ,width: '100%-10px' , paddingLeft: "10px" 
                   ,border: "1px solid silver" ,cursor: 'pointer' 
                   , textDecoration: 'none'}
        ,style2 : { textDecoration: 'none'}     /* for a href */   
      }
    }

    ,methods: {
        hili : function(bool){                        /* hili == Hilight  */
          if(bool == true ){
            console.log("hili")
            console.log(this.style1.backgroundColor)  /* from  data function */
            this.style1.backgroundColor =  "yellow" 
          }else{
            this.style1.backgroundColor = "lightyellow"            
          }
        },
        open1 : function(){                           /* when click menu item */
          window.open(this.url)
        }
    }
}

/** NOTE:  mn1 is tag name , or object name 
    , create from data in mn1_data variable
**/
Vue.component('mn1', mn1_data);     /* must register as global or mn1s_data will error */

var mn1s_data = {
   props: ['title']
   ,template: ' <div style=\'width:130px;border:1px solid hsl(60, 100%, 40%);\' >  \
   <div style="background-color:hsl(60, 100%, 40%);padding-left:10px;">{{title}}</div>   \
   <mn1 id="m1" text="Google" url="http://www.google.co.th" ></mn1>  \
   <mn1 id="m2" text="Sanook" url="http://www.sanook.co.th" ></mn1>  \
   <mn1 id="m1" text="Pantip" url="http://www.pantip.com" ></mn1>  \
   <mn1 id="m2" text="Kapook" url="http://www.kapook.com" ></mn1>  \
   <mn1 id="m2" text="Facebook" url="https://www.facebook.com" ></mn1>  \
   </div>'
};

// ======= END   of Demo 1 Code ============

// ======= START of Demo 2 Code ============

/* each local1 is row , with slot inside    */
/* slot can contain others  vue.componet    */

var local1_data =  {
      props: ['tx'],
      template: '<div class="lo1"  v-on:click="increment" > \
                  [\
                  <slot>( This is Slot /Empty )</slot>\
                   ] lo1: i={{tx}}  counter={{counter}}  / click to +1 </div>'
      ,data : function(){
          return {counter : 0 }
      }
      ,methods: {
        increment: function() {
          this.counter += 1             /* this component local */
          this.$emit('increment')       /* notify increment() method , repaint , I'm not sure */
        }
      }
    }
Vue.component('local1',local1_data);

var a1_data =    {
      template: '<div v-on:click="pop1" class="a1">[A1 Object Click to Aleart Dialog]</div>'
      ,methods: {
          pop1: function(){
            alert("pop1 ");
          }
      }
    }
Vue.component('a1', a1_data);



/* This component 
    contain multiple component inside 
      1. local1 component , use "is" keyword 
          when use "is" can not use with nested component !! ( i found that)
      2. if use local1 as tag (open and close )
          can use other component inside (since local1 declare 1 'slot' tag )
          , component inside is { a1 tag, p tag }         
*/
var testnested_data = {
    data : function(){
          return  {i: 0 }
    }
    ,template: '<div id="myroot2">  <row1></row1>\
      <table width="50%">\
        <tr is="local1" tx="ABC "></tr>\
        <tr is="local1" :tx="i"> </tr>\
        <tr is="local1" :tx="i+1">  </tr>\
        <tr is="local1" :tx="i+2"><p>Test Slot1</p></tr>\
      </table>\
      <hr>\
      <local1>\
        <a1></a1>\
        <a1></a1>\
        <a1></a1>\
      </local1>   \
      <local1>\
        <p>@slot1 added </p>\
        <p>@slot2 added </p>\
      </local1>\
      <hr></div>\
        '
}

Vue.component('row1', {
  template: '<div class="ro1" >A custom component!</div>'
})

/* 
===============================================
START MAIN with new Vue( ) 
    component must declare before this code 
*/

var data  = {counter : 0 }

var app1 = new Vue({
  el: '#app',
  data: {
    i: 1,
    message: 'Hello Vue.js!',
  },
  
  components: {

     'mn1s': mn1s_data

    
    , 'testnested': testnested_data ,
  }
})
