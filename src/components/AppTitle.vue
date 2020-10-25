<template>
  <div id="title"> 
      <div id="containerLeft">
         <div class="circle appIcon" ></div>
         <img id="appIcon" src="music.ico" class="appIcon">
         <span id="appName"  class="no-selected"  >{{appName}}</span>
         <div id="customSearchBox">
           <img src="查询.png">
           <input  type="text" placeholder="搜索" >
         </div>
        <div class="search-box">
            <input class="search-txt" type="text" name="" placeholder="Type to search">
            <a class="search-btn" href="#">
                <i class="fas fa-search"></i>
            </a>
        </div>

      </div>
      <div id="containerRight" >
          <img src="关闭.png"  class="imgFloatStyle no-selected"  @click="close">  
          <img :src="winStateIconSrc+'.png'" class="imgFloatStyle no-selected" @click="setWindowState">   
          <img src="最小化.png" class="imgFloatStyle no-selected" @click="min">  
          <img src="迷你模式.png"  class="imgFloatStyle no-selected"  >  
          <img src="消息.png"  class="imgFloatStyle no-selected"  >  
          <img src="主题.png"  class="imgFloatStyle no-selected"  >  
          <img src="设置.png"  class="imgFloatStyle no-selected"  >  
          <span v-once id="userName" class="no-selected userContentFloatStyle">{{userInfo.userName}}        
              <s id="userNameIcon" v-bind:class="[userInfo.isUp ? upStyle : dropStyle]" style="height:2px;display:inline-block" ></s>
          </span>  
          <img src="userImg.jpg" id="userImg" class="userimgFloatStyle">
      </div>
  </div>
</template>

<script type="module"> 
import {  ipcRenderer,remote } from 'electron' 
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
          upStyle:"upDown",
          isMax:remote.getCurrentWindow().isMaximized()
      }
  },
  methods: { 
      min() {
       ipcRenderer.send('window-min') // 通知主进程我要进行窗口最小化操作
      } ,
      close() {  
         ipcRenderer.send('window-close') 
      } ,
      setWindowState(){  
        ipcRenderer.send('window-max')
        this.isMax=remote.getCurrentWindow().isMaximized()
      }
  },
  computed:{
    winStateIconSrc:{
       get: function() {   
        return this.isMax?"恢复":"最大化"
      } 
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
  -webkit-app-region: no-drag!important;
 
}

  #title{
    background-color: #EC4141;  
    height: 62px; 
    width: 100%;
  }
 #appName{  
   font-family: "STHeiti";
   font-size: 17px;
   color: white; 
   height: auto;
   position: relative;
   bottom: 25px;
   left: 10px;
 }
 #appIcon{
    margin-left:0px;

 }
 #containerLeft{ 
    display: inline-block; 
    height: 62px;
    width: 49.5%;   
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
    color: rgb(243, 235, 235);
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
    border-top: 5px solid rgb(243, 235, 235);
}
 :hover{
   border-top-color: white;
}
.dropUp{
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid rgb(243, 235, 235);
}
 .dropUp :hover{
   border-bottom: white;
} 
.imgFloatStyle{
  float: right;
  height: 18px;
  width: 18px;
  margin-right:15px;
  margin-top:23px; 
}
 .userimgFloatStyle{
  float: right; 
  margin-right:10px;
  margin-top:18px; 
}
.userContentFloatStyle{
   float: right; 
   margin-right:10px;
   margin-top:2px; 
}
 span {
    cursor: pointer; 
 }
 img{ 
   -webkit-app-region: no-drag; 
 }
 .appIcon{
   margin-bottom:50px;
 }
/**查询输入样式 */
 .search-box{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: #2f3640;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
}
.search-box:hover>.search-txt{
    width: 240px;
    padding: 0 6px;
}
.search-box:hover>.search-btn{
   background: white;
}
.search-btn{
    color: #e84118;
    float:right ;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-txt{
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
}
#customSearchBox{
  display:inline-block;
  position: relative;
  height: 30px;
  width: 180px;
  left: 250px;
  bottom:25px;
  -webkit-app-region: no-drag!important;
  cursor: pointer;
  border-radius:30px ; 
  background-color:#E13E3E;
}
#customSearchBox>input{
  border: none;
  width: 150px;
  background-color:transparent;  
  margin-top: 5px;
  height: 22px;
  margin-left:3px;
  outline: none;
  color: white;
}
#customSearchBox>img{
  height: 18px;
}
input::-webkit-input-placeholder { color: rgb(243, 235, 235); }
</style>