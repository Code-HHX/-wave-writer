<template>
  <div class="container">
    <div class="header">
      <van-icon
        class="header-return"
        name="arrow-left"
        size="25"
        color="#ffffff"
        @click="onClickHeaderReturn()"
      />
      Current Settings
    </div>
    <div class="content">
      <div class="setting-model">
        <button
          class="model-button"
          :class="selectModel === 'Wave Writer' ? 'model-button-active' : ''"
          style="margin-right:8px;"
          @click="onClickSelectModel('Wave Writer')"
        >
          Wave Writer
        </button>
        <button
          class="model-button"
          :class="selectModel === 'Device' ? 'model-button-active' : ''"
          style="margin-left:8px;"
          @click="onClickSelectModel('Device')"
        >
          Device
        </button>
      </div>
      <!-- Hub模式 -->
      <div v-show="selectModel === 'Wave Writer'" style="overflow-y: auto;">
        <!-- Info -->
        <div class="info-item">
          <div class="info-title">
            Hub Info
          </div>
          <div class="item-split"></div>
          <div class="info-content">
            <div class="info-row">
              <div class="info-row-left">Device Model</div>
              <div class="info-row-right">VIA hub</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">S/N</div>
              <div class="info-row-right">
                {{ macAddress.replaceAll(":", "") }}
              </div>
            </div>
          </div>
        </div>
        <!-- Preheat -->
        <div class="info-item">
          <div class="info-title">
            Preheat
            <van-switch
              style="margin-left:auto;"
              v-model="hubSetting.isSupportPreheat"
              active-color="#66DCA5"
              inactive-color="#D6CDF2"
              size="18"
              :disabled="true"
            />
          </div>
          <!--<div class="info-title">-->
          <!--NFC-->
          <!--<van-switch-->
          <!--style="margin-left:auto;"-->
          <!--v-model="hubSetting.isSupportNfc"-->
          <!--active-color="#66DCA5"-->
          <!--inactive-color="#D6CDF2"-->
          <!--size="18"-->
          <!--:disabled="true"-->
          <!--/>-->
          <!--</div>-->
          <div class="item-split" v-show="hubSetting.isSupportPreheat"></div>
          <div class="info-content" v-show="hubSetting.isSupportPreheat">
            <div class="info-row">
              <div class="info-row-left">Time</div>
              <div class="info-row-right">
                {{ (hubSetting.preheatTime / 1000).toFixed(1) }}s
              </div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Voltage</div>
              <div class="info-row-right">
                {{ (hubSetting.preheatVoltage / 1000).toFixed(1) }}v
              </div>
            </div>
          </div>
        </div>
        <!-- Voltage -->
        <div class="info-item">
          <div class="info-title">
            Voltage Curve
          </div>
          <div class="item-split"></div>
          <div class="info-content">
            <div class="voltage-one">
              <div
                class="voltage-number"
                v-for="(item, index) in hubVoltage"
                :key="index"
              >
                {{ Math.abs(item / 1000).toFixed(1) }}v
              </div>
            </div>
            <div
              id="voltageTwo"
              class="voltage-two"
              style="width:100%;height:calc(20vh)"
            >
              <van-slider
                v-for="(value, index) in hubVoltage"
                :key="index"
                v-model="hubVoltage[index]"
                vertical
                min="-4200"
                max="-100"
                :step="100"
                bar-height="4px"
                active-color="#EEEEEE"
                inactive-color="#D6CDF2"
                :disabled="true"
              >
                <template #button>
                  <img
                    class="slider-button"
                    src="@/assets/icons/icon_slider_button_disabled.png"
                  />
                </template>
              </van-slider>
            </div>
            <div class="voltage-three">
              <div class="voltage-number" v-for="index of 6" :key="index">
                {{ index }}s
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Device模式 -->
      <div v-show="selectModel === 'Device'" style="overflow-y: auto;">
        <div v-if="loadDeviceSettingStatus === 1">
          <!-- Info -->
          <div class="info-item">
            <div class="info-title">
              Hub Info
            </div>
            <div class="item-split"></div>
            <div class="info-content">
              <div class="info-row">
                <div class="info-row-left">Device Model</div>
                <div class="info-row-right">{{ insertDeviceName }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-left">ID</div>
                <div class="info-row-right">{{ deviceIdentify }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-left">Device Type</div>
                <div class="info-row-right">{{ deviceType }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-left">Resistance</div>
                <div class="info-row-right">{{ resistance }} Ω</div>
              </div>
              <div class="info-row">
                <div class="info-row-left">Production Time</div>
                <div class="info-row-right">{{ productTime }}</div>
              </div>
              <div class="info-row">
                <div class="info-row-left">Brand</div>
                <div class="info-row-right">{{ brandName }}</div>
              </div>
            </div>
          </div>
          <!-- Preheat -->
          <div class="info-item">
            <div class="info-title">
              Preheat
              <van-switch
                style="margin-left:auto;"
                v-model="writerSetting.isSupportPreheat"
                active-color="#66DCA5"
                inactive-color="#D6CDF2"
                size="18"
                :disabled="true"
              />
            </div>
            <div
              class="item-split"
              v-show="writerSetting.isSupportPreheat"
            ></div>
            <div class="info-content" v-show="writerSetting.isSupportPreheat">
              <div class="info-row">
                <div class="info-row-left">Time</div>
                <div class="info-row-right">
                  {{ (writerSetting.preheatTime / 1000).toFixed(1) }}s
                </div>
              </div>
              <div class="info-row">
                <div class="info-row-left">Voltage</div>
                <div class="info-row-right">
                  {{ (writerSetting.preheatVoltage / 1000).toFixed(1) }}v
                </div>
              </div>
            </div>
          </div>
          <!-- Voltage -->
          <div class="info-item">
            <div class="info-title">
              Voltage Curve>
            </div>
            <div class="item-split"></div>
            <div class="info-content">
              <div class="voltage-one">
                <div
                  class="voltage-number"
                  v-for="(item, index) in deviceVoltage"
                  :key="index"
                >
                  {{ Math.abs(item / 1000).toFixed(1) }}v
                </div>
              </div>
              <div
                id="voltageTwo"
                class="voltage-two"
                style="width:100%;height:calc(20vh)"
              >
                <van-slider
                  v-for="(value, index) in deviceVoltage"
                  :key="index"
                  v-model="deviceVoltage[index]"
                  vertical
                  min="-4200"
                  max="-100"
                  :step="100"
                  bar-height="4px"
                  active-color="#EEEEEE"
                  inactive-color="#D6CDF2"
                  :disabled="true"
                >
                  <template #button>
                    <img
                      class="slider-button"
                      src="@/assets/icons/icon_slider_button_disabled.png"
                    />
                  </template>
                </van-slider>
              </div>
              <div class="voltage-three">
                <div class="voltage-number" v-for="index of 6" :key="index">
                  {{ index }}s
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loadDeviceSettingStatus === 0" class="error-info">
          <div class="device-error-msg">{{ errorMessage }}</div>
          <div class="try-again" @click="reloadDeviceSetting">
            Try again
          </div>
        </div>
        <div v-else class="popup-content info-device-load">
          <van-loading size="60px" />
        </div>
      </div>
    </div>
    <div
      v-show="selectModel === 'Device' && this.loadDeviceSettingStatus == 1"
      class="footer"
    >
      <van-button class="footer-button" type="default" @click="onClickApply">
        Apply to homepage
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import bluetoothRepository from "@/bluetooth/BluetoothRepository";
import { WriterSetting } from "../bluetooth/BluetoothData";

export default {
  name: "SettingView",
  data() {
    return {
      selectModel: "Wave Writer",
      hubSetting: this.getHubSetting(),
      loadDeviceSettingStatus: 2,
      errorMessage: ""
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapState({
      macAddress: state => state.bluetooth.macAddress
    }),
    ...mapState("bluetooth", ["deviceId", "insertDeviceName", "writerSetting"]),
    deviceVoltage() {
      const deviceCurve = this.writerSetting.diyVoltage
        .map(item => item * -1)
        .slice(0, 6);
      return deviceCurve;
    },
    hubVoltage() {
      return this.hubSetting.diyVoltage.map(item => item * -1).slice(0, 6);
    },
    deviceType() {
      if (this.deviceId) {
        switch (this.deviceId.type) {
          case 1:
            return "Disposable";
          case 3:
            return "Pod Battery";
          case 5:
            return "510 Battery";
        }

        return "";
      }
      return "";
    },

    brandName() {
      if (this.deviceId) {
        switch (this.deviceId.productManufacture) {
          case 0:
            return "AVD";
          case 1:
            return "iKrusher";
          case 2:
            return "Unicore";
        }
      }
      return "";
    },

    deviceIdentify() {
      if (this.deviceId) {
        return this.deviceId.deviceNumberHex;
      }
      return "";
    },
    resistance() {
      if (this.deviceId) {
        const r = this.deviceId.atomizedR;
        return `${(r / 10).toFixed(1)}`;
      }
      return "";
    },
    productTime() {
      if (this.deviceId) {
        const year = this.deviceId.productYear;
        const week = this.deviceId.productWeek;

        return `week ${week}, 20${year.toString(16)}`;
      }
      return "";
    }
  },
  methods: {
    ...mapGetters("bluetooth", ["getHubSetting"]),
    onClickHeaderReturn() {
      this.$router.go(-1);
    },
    onClickApply() {
      this.applyToHomePage();
    },
    applyToHomePage() {
      const deviceSetting = this.writerSetting;
      const setting = new WriterSetting();
      Object.assign(setting, deviceSetting);

      setting.diyVoltage = []
        .concat(deviceSetting.diyVoltage.map(item => item * -1))
        .slice(0, 6);
      this.$router.replace({
        name: "Home",
        params: {
          setting
        }
      });
    },
    async reloadDeviceSetting() {
      this.loadDeviceSettingStatus = 2; //转圈加载
      await bluetoothRepository.queryWriter();
      this.loadDeviceSettingStatus = 1; //加载成功
    },
    async onClickSelectModel(model) {
      this.selectModel = model;
      if (model === "Device") {
        //如果是device的时候，转圈加载完在显示
        try {
          this.loadDeviceSettingStatus = 2; //转圈加载
          await bluetoothRepository.queryWriter();
          this.loadDeviceSettingStatus = 1; //加载成功
        } catch (e) {
          if (typeof e === "string") {
            this.errorMessage = e;
          } else {
            this.errorMessage = "Read device info failure!";
          }
          this.loadDeviceSettingStatus = 0; //加载失败
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background: #f8f6ff;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 60px;
    min-height: 60px;
    background: #6649c4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;

    .header-return {
      position: absolute;
      left: 10px;
    }
  }

  .content {
    height: 100%;
    padding: 0 16px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    margin-bottom: 60px;

    .setting-model {
      margin: 16px 0;
      display: flex;
      align-items: center;

      .model-button {
        height: 50px;
        background: #f8f6ff;
        color: #6649c4;
        border: 1px solid #6649c4;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        width: 50%;
      }

      .model-button-active {
        background: #6649c4;
        color: #ffffff;
      }
    }

    .info-item:first-child {
      margin-top: 0px;
    }
    .info-item:last-child {
      margin-bottom: 16px;
    }
    .info-device-load {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 60px 0;
    }
    .error-info {
      height: 50vh;
      color: #86a1a9;
      display: flex;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      justify-items: center;
      margin-top: 10px;
      font-size: 20px;
      font-weight: 400;
      color: #555555;

      .try-again {
        margin: 0 auto;
        color: #6649c4;
        font-size: 16px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #f1edff;
        background: #f1edff;
        border-radius: 20px;
        margin-top: 2vh;
      }
    }

    .info-item {
      background: #ffffff;
      border-radius: 10px;
      margin-top: 16px;

      .info-title {
        font-size: 18px;
        font-weight: bold;
        color: #555555;
        padding: 16px;
        display: flex;
        align-items: center;

        .history-button-apply {
          height: 30px;
          margin: 16px 0 16px auto;
          background: #f1edff;
          color: #6649c4;
          border: none;
          border-radius: 8px;
          white-space: nowrap;
        }
      }

      .info-content {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        padding-bottom: 16px;

        .info-row {
          width: 100%;
          display: flex;
          margin-top: 16px;

          .info-row-left {
            font-size: 16px;
            font-weight: 400;
            color: #999999;
          }

          .info-row-right {
            margin-left: auto;
            font-size: 16px;
            font-weight: 400;
            color: #555555;
          }
        }
        .voltage-one {
          margin: 16px 0 16px 0;
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
          margin: 8px 0 16px 0;

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
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    min-height: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.149);

    .footer-button {
      widows: calc(100vw - 50px);
      height: 45px;
      background: #6649c4;
      border-radius: 8px;
      border: 1px solid #6649c4;
      font-size: 18px;
      font-weight: normal;
      color: #ffffff;
    }
  }
}
</style>
