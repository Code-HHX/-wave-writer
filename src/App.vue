<!--
 * @Author: Code-HHX
 * @Date: 2022-03-24 11:49:13
 * @LastEditors: Code-HHX
 * @LastEditTime: 2022-03-24 12:12:57
 * @Description: 
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    //#region 滚动 使输入框处在窗口的中间高度
    /*
		window.onresize = function () {
			document.activeElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		}
    */
    //#endregion
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  width: 100%;
  height: 100%;
}
input {
  color: #d6cdf2;
  width: 100%;
  padding: 0 11px;
  height: 45px;
  border-radius: 8px;
  background: #6649c4;
  opacity: 1;
  border: 1px solid #d6cdf2;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  -webkit-box-sizing: border-box; //谷歌浏览器
  -moz-box-sizing: border-box; //火狐浏览器
  box-sizing: border-box; //其它浏览器
}
input[type="text"]:focus {
  outline: none;
}
input[type="password"]:focus {
  outline: none;
}
::-webkit-input-placeholder {
  /* WebKit browsers，webkit内核浏览器 */
  color: #d6cdf2;
  font-size: 18px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d6cdf2;
  font-size: 18px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d6cdf2;
  font-size: 18px;
}
button {
  height: 45px;
  background: #ffffff;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #6649c4;
}
button:focus {
  outline: none;
}
.item-split {
  width: 100%;
  border-bottom: 1px solid #eeeeee;
}

* {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: none;
  }
}
</style>
