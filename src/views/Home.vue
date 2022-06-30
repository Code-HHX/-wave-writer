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
      <img class="header-menu" src="@/assets/icons/icon_menu.png" />
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
        <img class="setting" src="@/assets/icons/icon_setting.png" />
      </div>
      <div class="content-main">
        <div class="main-header">
          <span>{{ modelList[curveModel].text }}</span>
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
                class="preheat-switch"
                v-model="modelList[curveModel].setting.isSupportPreheat"
                active-color="#66DCA5"
                inactive-color="#D6CDF2"
                size="20"
              />
            </div>
            <div class="subtitle">
              Times：<span
                :style="
                  modelList[curveModel].setting.isSupportPreheat
                    ? 'color:#6649C4'
                    : 'color:#555555'
                "
                >{{
                  (modelList[curveModel].setting.preheatTime / 1000).toFixed(1)
                }}s</span
              >
            </div>
            <!--预热时间-->
            <div class="times-item">
              <van-slider
                v-model="modelList[curveModel].setting.preheatTime"
                min="1000"
                max="10000"
                :step="500"
                bar-height="4px"
                active-color="#6649C4"
                inactive-color="#FFFFFF"
                :disabled="!modelList[curveModel].setting.isSupportPreheat"
              >
                <template #button>
                  <img
                    class="slider-button"
                    :src="
                      modelList[curveModel].setting.isSupportPreheat
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
                  modelList[curveModel].setting.isSupportPreheat
                    ? 'color:#6649C4'
                    : 'color:#555555'
                "
                >{{
                  (modelList[curveModel].setting.preheatVoltage / 1000).toFixed(
                    1
                  )
                }}v</span
              >
            </div>

            <!--预热电压-->
            <div class="voltage-item">
              <van-slider
                v-model="modelList[curveModel].setting.preheatVoltage"
                min="100"
                max="4200"
                :step="100"
                bar-height="4px"
                active-color="#6649C4"
                inactive-color="#FFFFFF"
                :disabled="!modelList[curveModel].setting.isSupportPreheat"
              >
                <template #button>
                  <img
                    class="slider-button"
                    :src="
                      modelList[curveModel].setting.isSupportPreheat
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
              v-model="modelList[curveModel].setting.isSupportNfc"
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
        />
        <img
          class="footer-upload"
          src="@/assets/icons/icon_upload.png"
          @click="onClickUpload"
        />
        <img class="footer-history" src="@/assets/icons/icon_history.png" />
      </div>
    </div>
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
        { text: "Style", setting: new WriterSetting() },
        { text: "Happy", setting: new WriterSetting() }
      ],
      myChart: {}
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
    onClickModelItem(index) {
      this.curveModel = index;
      Object.assign(this.modelList[0].setting, this.modelList[index].setting);
      const origin = this.modelList[0].setting.diyVoltage;
      let diyVoltage = [];
      this.modelList[0].setting.diyVoltage = [].concat(origin);
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
      }
    },
    onClickDisconnectDevice() {
      if (this.isConnected) {
        bluetoothRepository.disconnect();
      } else {
        bluetoothRepository.startPair();
      }
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
    }
    // this.refreshVoltageCurve();
  },
  //刷新echarts
  refreshVoltageCurve() {
    // voltageData.series[0].data = this.voltageNewData;
    // this.myChart.setOption(voltageData, true);
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
    margin: 24px 0 16px 0;

    .header-menu {
      position: absolute;
      left: 16px;
      width: 20px;
      height: 16px;
    }
    .header-logo {
      width: 86px;
      height: 30px;
    }
    .header-title {
      font-size: 20px;
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
        width: 85%;
        overflow: hidden;
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
          position: fixed;
          right: 15%;
          width: 30px;
          height: 77px;
          background: linear-gradient(
            90deg,
            rgba(102, 73, 196, 0) 0%,
            #6649c4 36%,
            #6649c4 100%
          );
          border-radius: 0px 0px 0px 0px;
        }
      }

      .setting {
        width: 26px;
        height: 26px;
        margin-left: 24px;
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
    position: fixed;
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
}
</style>
