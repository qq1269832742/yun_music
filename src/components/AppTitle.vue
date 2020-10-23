<template>
  <div id="title"> 
      <div id="containerLeft">
         <div class="circle"></div>
         <img id="appIcon" src="music.ico">
         <span id="appName" v-once class="no-selected">{{appName}}</span>
      </div>
      <div id="containerRight">
          <img src="userImg.jpg" id="userImg">
          <span v-once id="userName" class="no-selected">{{userInfo.userName}}        
              <s id="userNameIcon" v-bind:class="[userInfo.isUp ? upStyle : dropStyle,'paddingDistance']" style="height:2px;display:inline-block" ></s>
          </span>

   
          <img src="关闭.png" class="imgFloatStyle"  @click="close">  
          <img src="最大化.png" class="imgFloatStyle" @click="max"> 
          <img src="最小化.png" class="imgFloatStyle" @click="min"> 
      </div>
  </div>
</template>

<script type="module"> 
import {  remote } from 'electron'
 
 
export default {
  name: 'AppTitle',
  props: {
    appName: String
  },
 data() {
      return {
          userInfo:{
              userName:"小钱钱1705",
              badgeNumber:19,
              isUp:false
          },
          dropStyle:"dropDown",
          upStyle:"upDown"
      }
  },
  methods: {
      max() { 
        remote.getCurrentWindow().maximize();
      } ,
      min() {
        remote.getCurrentWindow().minimize();
      } ,
      close() {
        //ipcRenderer.send('close'); 
        remote.getCurrentWindow().close(); // 关闭窗口，也结束了所有进程
      },
      restore() {
       // remote.getCurrentWindow().restore();
      } 
  }
}

</script>

<style scoped>
.no-selected {
  -webkit-user-select: none; /*Chrome/ Safari/ Opear新版本*/
  -moz-user-select: none; /*Foxfire */
  -ms-user-select: none; /*Internet Explorer/ Edge*/
  -o-user-select: none; /*Opear老版本*/
  -khtml-user-select: none; /* Konqueror */
  -webkit-touch-callout: none; /* iOS Safari */
  user-select: none;   
}

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
    width: 48%;   
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
#userImg{
    width: 27px;
    height: 27px;
    border-radius: 15px; 
}
#userName{
    color: gainsboro;
    font-size: 12px;
    margin-left: 5px;

} 
#userName:hover{
  color: white;
}
 
.dropDown{
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid gainsboro;
}
 :hover{
   border-top-color: white;
}
.dropUp{
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid gainsboro;
}
 .dropUp :hover{
   border-bottom: white;
}
.paddingDistance{
  margin-left:5px ;
}
.imgFloatStyle{
  float: right;
  height: 18px;
  width: 18px;
  margin-right:10px;
  margin-top:23px 
}
img,span:hover{ 
  cursor:pointer; 
} 
</style>