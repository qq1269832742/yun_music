<template>
  <div id="app" >  
     <Title appName="网易云音乐"/>
     <Body msg="我是主窗体"/>
  </div>
</template>

<script type="module">
import Title from './renderer/views/AppTitle.vue'
import Body from './renderer/views/AppBody.vue'
export default {
  name: 'app',
  components: {
    Title,
    Body
  }
}
</script>

<style>
*{
  padding:0;            /*清除内边距*/
  margin:0;              /*清除外边距*/
}
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
html{
  -webkit-app-region: drag;
}
p{
  -webkit-app-region: no-drag!important;
}
span{
  -webkit-app-region: no-drag!important;
}
::-webkit-scrollbar { /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(228, 57, 60, 0.2);
    background: rgba(20, 20, 50, 0.6);
    position: absolute;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(228, 57, 60, 0.2);
    border-radius: 10px;
    background: #EDEDED;
    position: absolute;
}
</style>
