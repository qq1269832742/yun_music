<template>
  <div id="title"> 
      <div id="containerLeft">
         <div class="circle appIcon" ></div>
         <img id="appIcon" src="music.ico" class="appIcon">
         <span id="appName"  class="no-selected"  >{{appName}}</span>
         <div id="customSearchBox">
           <img src="查询.png">
           <input  type="text" placeholder="搜索"  @focus="isShowSearchBox=true" 
           @blur="isShowSearchBox=false">
           <div id="searchContent" class="serachContentBox" v-show="isShowSearchBox">
             <p style="font-size:15px">热搜榜</p>  
               <table>  
                  <tr v-for="(song,index) in hotSongList" :key="index" >
                    <td class="hotSongNumber">
                      {{index+1}}
                    </td>
                    <td>
                      <div>
                           <p class="hotSongName" style="margin-bottom:5px;">
                              <span>{{song.info.name}}</span>
                              <span class="hotSongPlayNumber">{{song.info.playTimes}}</span>
                             </p>
                           <p class="hotSongDesc"  style="margin-top:5px;">{{song.info.album}}</p>
                      </div>
                    </td>
                  </tr>
               </table>
           </div>
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
          <span v-once   class="no-selected userContentFloatStyle baseFont">{{vip.content}}</span>
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
          isMax:remote.getCurrentWindow().isMaximized(),
          isShowSearchBox:false,
          vip:{
            content:"开通VIP"
          },
          hotSongList:[
            {
               info:
                   {
                     name:'你曾说过你很爱我',
                     playTimes:283122,
                     album:'盛夏的果实'
                   }
               
            },
            {
              info:
                   {
                     name:'你曾说过你很爱我',
                     playTimes:283122,
                     album:'盛夏的果实'
                   }
               
            },
            {
             info:
                   {
                     name:'你曾说过你很爱我',
                     playTimes:283122,
                     album:'盛夏的果实'
                   }
               
            }
          ]
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

input::-webkit-input-placeholder { color: rgb(243, 235, 235); }
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
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 16px;
	height: 16px;
	background-color: #F5F5F5;
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
.baseFont{
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
  height: 19px;
  width: 19px;
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
 
#customSearchBox{
  display:inline-block;
  position: absolute;
  height: 30px;
  width: 180px;
  left: 300px;
  top:16px;
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
  font-size: 13px;
}
#customSearchBox>img{
  height: 18px;
  margin-left: 10px;;
}
/*查询歌曲内容*/ 
.serachContentBox{
  border: darkorange 1px solid;
  background: white;
  height: 457px;
  width: 345px;
  margin-left: -40px;
  margin-top: 5px;
  border-radius:8px;
  font-size:12px;
  padding-left:15px;
  padding-top:15px;
   
}
#searchContent>table{
  margin-top:15px ;
  width: 100%;
}
#searchContent>table>tr{
  height: 55px;
  width: 100%;
}
#searchContent>table>tr :hover{
  background: rgb(218, 212, 212);
}
tr>td>div{
  margin-left: 25px;
}
 
.hotSongNumber{ 
  color: red;
  font-size:14px;
}
.hotSongName{
  font-weight: 600;
}

.hotSongDesc{
  color: grey;
}
.hotSongPlayNumber{
  color: rgb(199, 194, 194);
  font-weight: 300;
  margin-left:5px;
}


</style>