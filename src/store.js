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
    curveModes: null,
    diySetting: (() => {
      const setting = new WriterSetting();
      setting.id = 0;
      setting.modeName = "DIY";
      return setting;
    })()
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
        localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, "");
      }
    },
    setCurveModes(state, payload) {
      if (payload) {
        state.curveModes = [].concat(
          payload.map(item => {
            const setting = new WriterSetting();
            setting.id = item.id;
            setting.diyVoltage = item.heatingVoltage
              .split(",")
              .map(item => parseInt(item) * -1);
            setting.isSupportNfc = item.nfcSettings === 1;
            setting.isSupportPreheat = item.preheatSetting === 1;
            setting.modeName = item.modeName;
            setting.preheatTime = item.preheatTime;
            setting.preheatVoltage = item.preheatVoltage;
            setting.heatingRemarks = item.heatingRemarks;
            return setting;
          })
        );
      } else {
        state.curveModes = payload;
      }
    },
    setDiySetting(state, payload) {
      payload.id = 0;
      payload.modeName = "DIY";
      payload.diyVoltage = payload.diyVoltage.map(item => item * -1);
      state.diySetting = payload;
    }
  },
  actions: {
    //#region 登录缓存用户信息和token
    async login({ dispatch, commit }, payload) {
      // //保存token
      commit("setLoginInfo", payload);
      commit("setToken", payload.token);
    },
    //#endregion

    //#region 授权令牌无效，请重新登录
    async logout({ commit }, payload) {
      //清空用户信息
      commit("setLoginInfo", null);
      commit("setToken", "");
      commit("setCurveModes", null);
    },
    //#endregion

    async tokenExpired({ commit }) {
      //清空store
      commit("setLoginInfo", null);
      commit("setToken", "");
      commit("setCurveModes", null);
      //清空缓存
      localStorage.clear();
      router.replace({
        name: "Login" //返回首页
      });
    },

    //请求用户的曲线设置
    async loadWriterCurves({ commit }, payload) {
      commit("setCurveModes", payload);
    }
  },
  getters: {
    getCurveModes(state) {
      return state.curveModes;
    },

    getDiySetting(state) {
      return state.diySetting;
    }
  },
  modules: {
    bluetooth: BluetoothStore
  }
});
