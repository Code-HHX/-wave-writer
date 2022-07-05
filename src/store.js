/*
 * @Author: Code-HHX
 * @Date: 2022-03-24 11:49:13
 * @LastEditors: Code-HHX
 * @LastEditTime: 2022-03-24 12:17:43
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import api from "@/api";
import { BluetoothStore } from "@/bluetooth/store";
import {
  KEY_LOCAL_STORAGE_TOKEN,
  KEY_LOCAL_STORAGE_USERINFO
} from "./config/LocalStoreKey";
import { WriterSetting } from "./bluetooth/BluetoothData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    curveModes: []
  },
  mutations: {
    setLoginInfo(state, payload) {
      state.userInfo = payload;
      localStorage.setItem(KEY_LOCAL_STORAGE_USERINFO, JSON.stringify(payload));
    },
    setToken(state, payload) {
      if (payload) {
        localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, payload);
      } else {
        localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, null);
      }
    },
    /**
     * createTime: null
     heatingVoltage: "1300,1400,1500,1600,1700,1800"
     id: 64
     modeName: "Current"
     nfcSettings: 0
     preheatSetting: 1
     preheatTime: "20000"
     preheatVoltage: "1800"
     * @param state
     * @param payload
     */
    setCurveModes(state, payload) {
      state.curveModes = [].concat(
        payload.map(item => {
          const setting = new WriterSetting();
          setting.id = item.id;
          setting.diyVoltage = item.heatingVoltage
            .split(",")
            .map(item => parseInt(item));
          setting.isSupportNfc = item.nfcSettings;
          setting.isSupportPreheat = item.preheatSetting;
          setting.modeName = item.modeName;
          setting.preheatTime = item.preheatTime;
          setting.preheatVoltage = item.preheatVoltage;
          return setting;
        })
      );
    }
  },
  actions: {
    //#region 授权令牌无效，请重新登录
    async login({ dispatch, commit }, payload) {
      //发起请求
      let userInfo = await api.user.login(payload);
      // //保存token
      commit("setLoginInfo", userInfo);
      commit("setToken", userInfo.token);

      //跳转到Home
      router.replace({
        name: "Home" //返回首页
      });
    },

    //#region 授权令牌无效，请重新登录
    async logout({ commit }, payload) {
      //清空用户信息
      commit("setLoginInfo", null);
      commit("setToken", null);
      //跳转到Home
      router.replace({
        name: "Login" //返回首页
      });
    },

    async tokenExpired({ commit }) {
      //清空store
      //清空缓存
      localStorage.clear();
      router.replace({
        name: "Login" //返回首页
      });
    },

    //请求用户的曲线设置
    async loadWriterCurves({ commit }) {
      let writerCurves = await api.writer.curveModes();
      commit("setCurveModes", writerCurves);
    }
    //#endregion
  },
  getters: {},
  modules: {
    bluetooth: BluetoothStore
  }
});
