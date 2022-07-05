<!--
 * @Author: Code-HHX
 * @Date: 2022-03-24 13:51:24
 * @LastEditors: Code-HHX
 * @LastEditTime: 2022-03-24 14:04:30
 * @Description:
-->
<template>
  <div class="container">
    <!--头-->
    <div class="header">
      <img
        class="header-menu"
        src="@/assets/icons/icon_menu.png"
        @click="onClickMenu"
      />
      <img
        class="header-bluetooth"
        @click="onClickDisconnectDevice"
        :src="
          isConnected
            ? require('@/assets/icons/icon_bluetooth.png')
            : require('@/assets/icons/icon_bluetooth_disconnected.png')
        "
      />
      <!-- <img class="header-logo" src="@/assets/logo/logo_via.png" /> -->
      <span class="header-title">Wave writer</span>
    </div>
    <!--设置内容-->
    <div class="content">
      <div class="model-setting">
        <div class="model-select" ref="modelSelect">
          <div
            class="model-item"
            :class="curveModel === index ? 'model-item-active' : ''"
            v-for="(item, index) in modelList"
            :key="index"
          >
            {{ item.text }}
            <div
              class="model-button"
              :class="curveModel === index ? 'model-button-active' : ''"
              @click="onClickModelItem(index)"
            >
              {{ curveModel === index ? "Used" : "Use" }}
            </div>
          </div>
          <div class="model-mask"></div>
        </div>
        <img
          class="setting"
          src="@/assets/icons/icon_setting.png"
          @click="onClickSetting"
        />
      </div>
      <div class="content-main">
        <div class="main-header">
          <!-- <span>{{ modelList[curveModel].text }}</span> -->
          <span>Voltage Curve</span>
          <van-button
            class="main-header-save"
            type="default"
            :disabled="saveDisabled"
            @click="onClickSave"
            >Save</van-button
          >
        </div>
        <!-- 曲线1 -->
        <!-- 曲线2 -->
        <div class="voltage-one">
          <div
            class="voltage-number"
            v-for="(item, index) in diyVoltage"
            :key="index"
          >
            {{ Math.abs(item / 1000).toFixed(1) }}v
          </div>
        </div>
        <div
          id="voltageTwo"
          class="voltage-two"
          style="width:100%;height:calc(20vh)"
          @touchmove.prevent="onTouchmoveVoltage"
        >
          <van-slider
            v-for="(value, index) in diyVoltage"
            :key="index"
            v-model="modelList[0].setting.diyVoltage[index]"
            vertical
            min="-4200"
            max="-100"
            :step="100"
            bar-height="4px"
            active-color="#EEEEEE"
            inactive-color="#6649C4"
            @change="onChangeVoltageCurve(index)"
          >
            <template #button>
              <img
                class="slider-button"
                src="@/assets/icons/icon_slider_button.png"
              />
            </template>
          </van-slider>
        </div>
        <div class="voltage-three">
          <div class="voltage-number" v-for="index of 6" :key="index">
            {{ index }}s
          </div>
        </div>
        <div class="control">
          <div class="control-left">
            <div class="title">
              Preheat
              <van-switch
                @change="onClickModelItem(0)"
                class="preheat-switch"
                v-model="modelList[0].setting.isSupportPreheat"
                active-color="#66DCA5"
                inactive-color="#D6CDF2"
                size="20"
              />
            </div>
            <div class="subtitle">
              Times：<span
                :style="
                  modelList[0].setting.isSupportPreheat
                    ? 'color:#6649C4'
                    : 'color:#555555'
                "
                >{{
                  (modelList[0].setting.preheatTime / 1000).toFixed(1)
                }}s</span
              >
            </div>
            <!--预热时间-->
            <div class="times-item">
              <van-slider
                v-model="modelList[0].setting.preheatTime"
                min="1000"
                max="10000"
                @change="onClickModelItem(0)"
                :step="500"
                bar-height="4px"
                active-color="#6649C4"
                inactive-color="#FFFFFF"
                :disabled="!modelList[0].setting.isSupportPreheat"
              >
                <template #button>
                  <img
                    class="slider-button"
                    :src="
                      modelList[0].setting.isSupportPreheat
                        ? require('@/assets/icons/icon_slider_button_vertical.png')
                        : require('@/assets/icons/icon_slider_button_vertical_disabled.png')
                    "
                  />
                </template>
              </van-slider>
              <div class="times-item-msg">
                <div class="times-left">1&nbsp;s</div>
                <div class="times-right">10&nbsp;s</div>
              </div>
            </div>
            <div class="subtitle">
              Voltage：<span
                :style="
                  modelList[0].setting.isSupportPreheat
                    ? 'color:#6649C4'
                    : 'color:#555555'
                "
                >{{
                  (modelList[0].setting.preheatVoltage / 1000).toFixed(1)
                }}v</span
              >
            </div>

            <!--预热电压-->
            <div class="voltage-item">
              <van-slider
                v-model="modelList[0].setting.preheatVoltage"
                min="100"
                max="4200"
                :step="100"
                bar-height="4px"
                active-color="#6649C4"
                inactive-color="#FFFFFF"
                :disabled="!modelList[0].setting.isSupportPreheat"
              >
                <template #button>
                  <img
                    class="slider-button"
                    :src="
                      modelList[0].setting.isSupportPreheat
                        ? require('@/assets/icons/icon_slider_button_vertical.png')
                        : require('@/assets/icons/icon_slider_button_vertical_disabled.png')
                    "
                  />
                </template>
              </van-slider>
              <div class="voltage-item-msg">
                <div class="voltage-left">0.1&nbsp;v</div>
                <div class="voltage-right">4.2&nbsp;v</div>
              </div>
            </div>
          </div>
          <div class="control-right">
            <div class="title">NFC Settings</div>
            <van-switch
              class="nfc-switch"
              @change="onClickModelItem(0)"
              v-model="modelList[0].setting.isSupportNfc"
              active-color="#66DCA5"
              inactive-color="#D6CDF2"
              size="20"
            />
            <div class="msg">
              Only use to that device support NFC
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="footer">
      <div class="footer-item">
        <img
          class="footer-setting"
          src="@/assets/icons/icon_footer_setting.png"
          @click="onClickSettingsView"
        />
        <img
          class="footer-upload"
          src="@/assets/icons/icon_upload.png"
          @click="onClickUpload"
        />
        <img
          class="footer-history"
          src="@/assets/icons/icon_history.png"
          @click="onClickHistory"
        />
      </div>
    </div>
    <!-- 左侧菜单Popup -->
    <van-popup
      class="menu-popup"
      v-model="showMenuPopup"
      position="left"
      :style="{ height: '100%', width: '88%' }"
      round
    >
      <div class="menu-header">
        <van-icon
          class="menu-return"
          name="arrow-left"
          size="25"
          color="#ffffff"
          @click="onClickMenuReturn()"
        />
        <img src="@/assets/logo/logo_wave_writer.png" alt="" />
      </div>
      <div class="menu-content">
        <div class="menu-item">
          <img src="@/assets/icons/icon_user.png" alt="" />My Profiles
        </div>
        <div class="menu-item">
          <img src="@/assets/icons/icon_pwd.png" alt="" />Change Password
        </div>
        <div class="menu-footer">
          <span class="menu-footer-left">V 1.0.0</span>
          <span class="menu-footer-right" @click="onClickSignOut"
            ><img src="@/assets/icons/icon_sign_out.png" alt="" />Sign out</span
          >
        </div>
      </div>
    </van-popup>
    <!-- 断开蓝牙弹窗Disconnect -->
    <van-popup
      class="save-popup"
      v-model="showDisconnectPopup"
      round
      :style="{ width: '88%' }"
      :close-on-click-overlay="false"
    >
      <div class="save-header">Tips</div>
      <div class="save-content">
        <div class="save-content-msg">
          Are you sure to disconnect?
        </div>
        <div class="save-footer">
          <button
            class="save-footer-cancel"
            @click="onClickDisconnectCancel"
            v-waves
          >
            Cancel
          </button>
          <button
            class="save-footer-sure"
            @click="onClickDisconnectSure"
            v-waves
          >
            Sure
          </button>
        </div>
      </div>
    </van-popup>
    <!-- 保存弹窗Save -->
    <van-popup
      class="save-popup"
      v-model="showSavePopup"
      round
      :style="{ width: '88%' }"
      :close-on-click-overlay="false"
    >
      <div class="save-header">Tips</div>
      <div class="save-content">
        <div class="save-content-msg">
          Are you sure save the settings?
        </div>
        <div class="save-footer">
          <button class="save-footer-cancel" @click="onClickSaveCancel" v-waves>
            Cancel
          </button>
          <button class="save-footer-sure" @click="onClickSaveSure" v-waves>
            Sure
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { voltageData } from "@/config/echarts-data";
import { WriterSetting } from "@/bluetooth/BluetoothData";
import { mapState } from "vuex";
import bluetoothRepository from "@/bluetooth/BluetoothRepository";

import log from "@/util/log";

export default {
  name: "Home",
  data() {
    return {
      curveModel: 0,
      modelList: [
        { text: "DIY", setting: new WriterSetting() },
        { text: "Current", setting: new WriterSetting() },
        { text: "Strong", setting: new WriterSetting() },
        { text: "Soul fly", setting: new WriterSetting() },
        { text: "Style", setting: new WriterSetting() }
      ],
      myChart: {},
      showMenuPopup: false,
      showDisconnectPopup: false,
      showSavePopup: false
    };
  },
  created() {},
  mounted() {
    // this.myChart = echarts.init(document.getElementById("voltageOne"));
    // window.addEventListener("resize", () => {
    //   this.myChart.resize();
    // });
    // this.getVoltageOne();
  },
  watch: {
    diyVoltage(newValue, oldValue) {
      log(`数据改变了 ${newValue}`);
    }
  },
  computed: {
    ...mapState({
      isConnected: state => state.bluetooth.isConnected
    }),
    diyVoltage() {
      return this.modelList[this.curveModel].setting.diyVoltage;
    },
    saveDisabled() {
      if (this.curveModel === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    onClickMenu() {
      this.showMenuPopup = true;
    },
    onClickMenuReturn() {
      this.showMenuPopup = false;
    },
    onClickSignOut() {
      this.$router.replace("Login");
    },
    onClickModelItem(index) {
      this.curveModel = index;
      Object.assign(this.modelList[0].setting, this.modelList[index].setting);
      const origin = this.modelList[0].setting.diyVoltage;
      this.modelList[0].setting.diyVoltage = [].concat(origin);
    },
    onClickSetting() {
      this.$router.push("Settings");
    },
    onTouchmoveVoltage(e) {},

    onChangeVoltageCurve(index) {
      if (this.curveModel !== 0) {
        this.curveModel = 0;
        this.$refs.modelSelect.scrollTo(0, 0);
      }
    },

    onClickSave() {
      if (this.modelList.length >= 6) {
        this.$toast({
          type: "fail",
          duration: "3000",
          position: "bottom",
          message: "Five voltage curves can be set at most."
        });
        return;
      } else {
        this.showSavePopup = true;
      }
    },
    onClickDisconnectDevice() {
      if (this.isConnected) {
        this.showDisconnectPopup = true;
      } else {
        bluetoothRepository.startPair();
      }
    },
    onClickSettingsView() {
      this.$router.push("SettingsView");
    },
    onClickUpload() {
      if (!this.isConnected) {
        this.$toast({
          type: "fail",
          duration: "1000",
          position: "center",
          message: "Not connected"
        });
        return;
      }

      const writerSetting = new WriterSetting();
      Object.assign(writerSetting, this.diySetting);
      writerSetting.diyVoltage = writerSetting.diyVoltage.map(item =>
        Math.abs(item)
      );
      bluetoothRepository.writeToWriter(writerSetting);
    },
    getVoltageOne() {
      voltageData.series[0].data = this.voltageNewData;
      this.showVoltageOne();
    },
    showVoltageOne() {
      if (document.getElementById("voltageOne")) {
        this.myChart.setOption(voltageData, true);
      }
    },
    //刷新echarts
    refreshVoltageCurve() {
      // voltageData.series[0].data = this.voltageNewData;
      // this.myChart.setOption(voltageData, true);
    },
    onClickDisconnectCancel() {
      this.showDisconnectPopup = false;
    },
    onClickDisconnectSure() {
      bluetoothRepository.disconnect();
      this.showDisconnectPopup = false;
    },
    onClickSaveCancel() {
      this.showSavePopup = false;
    },
    onClickSaveSure() {
      this.showSavePopup = false;
      this.$router.push("Settings");
    },
    onClickHistory() {
      this.$router.push("History");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  overflow-y: hidden !important;
}

.container {
  height: 100%;
  background: #6649c4;
  position: relative;
  overflow: hidden;

  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0 16px 0;

    .header-menu {
      position: absolute;
      left: 16px;
      width: 25px;
      height: 25px;
    }
    .header-logo {
      width: 86px;
      height: 30px;
    }
    .header-title {
      font-size: 22px;
      font-weight: 400;
      color: #ffffff;
    }
    .header-bluetooth {
      position: absolute;
      right: 16px;
      width: 26px;
      height: 26px;
    }
  }

  .content {
    height: 100%;
    margin-top: 25px;

    /deep/ .van-slider--disabled {
      .van-slider__bar {
        background: #d6cdf2 !important;
      }
    }

    .model-setting {
      display: flex;
      align-items: center;
      margin: 0 15px;

      .model-select {
        display: flex;
        width: 88%;
        overflow-x: auto;

        .model-item {
          margin-right: 15px;
          padding: 0 10px;
          height: 75px;
          border-radius: 10px;
          border: 1px solid #8866f5;
          font-size: 18px;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .model-button {
          margin-top: 10px;
          width: 50px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          background: #8866f5;
          border-radius: 20px;
          border: 1px solid #8866f5;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
        }

        .model-item-active {
          background: #8866f5;
          border: 1px solid #8866f5;
        }

        .model-button-active {
          background: #8866f5;
          border: 1px solid #f1edff;
          color: #f1edff;
        }

        .model-mask {
          position: absolute;
          right: 50px;
          width: 30px;
          height: 77px;
          background: linear-gradient(
            90deg,
            rgba(102, 73, 196, 0) 0%,
            #6649c4 38%,
            #6649c4 100%
          );
        }
      }

      .setting {
        width: 26px;
        height: 26px;
        margin-left: 30px;
      }
    }

    .content-main {
      height: 100%;
      margin-top: 20px;
      background: #ffffff;
      border-radius: 20px 20px 0 0;
      padding: 15px 15px 0 15px;

      .main-header {
        display: flex;
        align-items: center;

        span {
          font-size: 18px;
          font-weight: bold;
          color: #555555;
        }

        /deep/ .van-button--disabled {
          border: 1px solid #bbbbbb !important;

          .van-button__text {
            color: #bbbbbb !important;
          }
        }

        .main-header-save {
          width: 60px;
          height: 30px;
          margin-left: auto;
          border-radius: 8px;
          border: 1px solid #6649c4;

          /deep/ .van-button__text {
            font-size: 16px;
            font-weight: 400;
            color: #6649c4;
          }
        }
      }

      .voltage-one {
        margin: 20px 0 20px 0;
        display: flex;
        width: 100%;

        div {
          margin: 0 auto;
          font-size: 13px;
          font-weight: 400;
          color: #999999;
        }
      }

      .voltage-two {
        display: flex;
        margin: 16px 0 16px 0;

        .slider-button {
          width: 40px;
          height: 40px;
        }

        /deep/ .van-slider {
          margin: 0 auto;
        }
      }

      .voltage-three {
        display: flex;
        width: 100%;

        div {
          margin: 0 auto;
          font-size: 13px;
          font-weight: 400;
          color: #999999;
        }
      }

      .control {
        display: flex;
        margin-top: 16px;

        .control-left {
          width: 100%;
          height: 210px;
          background: #f1edff;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          padding: 0 15px;

          .title {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #555555;
            display: flex;
            align-items: center;

            .preheat-switch {
              margin-left: auto;
            }
          }

          .subtitle {
            font-size: 14px;
            font-weight: 400;
            color: #555555;
            margin: 10px 0 0 0;
          }

          .times-item {
            margin: 20px 0 0 0;
            display: flex;
            flex-direction: column;

            .slider-button {
              width: 40px;
              height: 40px;
              margin-top: 10px;
            }

            .times-item-msg {
              margin-top: 16px;
              padding-right: 5px;
              display: flex;
              font-size: 13px;
              font-weight: 400;
              color: #999999;

              .times-left {
                margin-right: auto;
              }
              .times-right {
                margin-left: auto;
              }
            }
          }

          .voltage-item {
            margin: 20px 0 0 0;
            display: flex;
            flex-direction: column;

            .slider-button {
              width: 40px;
              height: 40px;
              margin-top: 10px;
            }

            .voltage-item-msg {
              margin-top: 16px;
              padding-right: 5px;
              display: flex;
              font-size: 13px;
              font-weight: 400;
              color: #999999;

              .voltage-left {
                margin-right: auto;
              }
              .voltage-right {
                margin-left: auto;
              }
            }
          }
        }
        .control-right {
          height: 210px;
          margin-left: 15px;
          background: #f1edff;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          padding: 0 15px;

          .title {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #555555;
            white-space: nowrap;
          }

          .nfc-switch {
            margin-top: 10px;
          }

          .msg {
            margin-top: 80px;
            font-size: 14px;
            font-weight: 400;
            color: #6649c4;
            line-height: 18px;
          }
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("../assets/bg/bg_footer.png");
    height: 60px;
    width: 100%;

    .footer-item {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
      align-items: center;
      justify-content: center;

      .footer-setting {
        width: 40px;
        height: 40px;
        left: 58px;
        top: 10px;
        position: absolute;
      }

      .footer-upload {
        width: 78px;
        height: 78px;
        margin-bottom: 16px;
      }

      .footer-history {
        width: 40px;
        height: 40px;
        right: 58px;
        top: 10px;
        position: absolute;
      }
    }
  }

  .menu-popup {
    background: transparent;

    .menu-header {
      height: 27%;
      background: #6649c4;
      display: flex;
      flex-direction: column;
      align-items: center;

      .menu-return {
        margin-top: 30px;
        margin-left: 10px;
        margin-right: auto;
      }

      img {
        width: 80%;
        margin-top: 60px;
      }
    }
    .menu-content {
      height: 73%;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      padding: 0 15px;

      .menu-item:first-child {
        margin-top: 30px;
      }

      .menu-item {
        font-size: 16px;
        font-weight: 400;
        color: #555555;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }

      .menu-footer {
        margin-top: auto;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #999999;

        .menu-footer-left {
          margin-right: auto;
        }
        .menu-footer-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          img {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .save-popup {
    .save-header {
      font-size: 18px;
      font-weight: bold;
      color: #555555;
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;
      text-align: center;
    }

    .save-content {
      padding: 20px 23px 15px 23px;
      font-size: 18px;
      font-weight: 400;
      color: #555555;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .save-footer {
      display: flex;
      align-items: center;
      width: 100%;

      .save-footer-cancel {
        margin-right: 5px;
        margin-top: 30px;
        background: #f1edff;
        width: 100%;
      }
      .save-footer-sure {
        margin-left: 5px;
        color: #ffffff;
        background: #6649c4;
        margin-top: 30px;
        width: 100%;
      }
    }
  }
}
</style>
