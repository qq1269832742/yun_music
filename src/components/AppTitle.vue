<template>
  <div id="title"> 
      <div id="containerLeft">
         <div class="circle"></div>
         <img id="appIcon" src="music.ico">
         <span id="appName">{{appName}}</span>
      </div>
      <div id="containerRight">
          <img src="music.ico">
      </div>
  </div>
</template>

<script>
export default {
 name: 'AppTitle',
  props: {
    appName: String
  }
}
</script>

<style scoped>
  #title{
    background-color: #ee3e3e;  
    height: 62px; 
    width: 100%;
  }
 #appName{ 
   display: inline-block;
   font-family: "STHeiti";
   font-size: 17px;
   color: white; 
   margin-left: 10px;
  
 }
 #appIcon{
    margin-left:0px;

 }
 #containerLeft{ 
    display: inline-block;
    line-height: 62px;
    height: 62px;
    width: 49.5%;  
    align-items:center; 
 }
 #containerRight{
    display: inline-block;
    line-height: 62px;
    height: 62px;
    width: 49.5%;  
 }
 img{
   width: 15px;
   vertical-align: middle;
 
 }
.circle{
    display: inline-block;
    width:25px;
    height:25px;
    border-radius:50%;
    background:#fff; 
    vertical-align: middle;
    margin-right: -20px;
    margin-left: 18px;
}

</style>