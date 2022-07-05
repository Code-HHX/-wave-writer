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
          :class="selectModel == 'Hub' ? 'model-button-active' : ''"
          style="margin-right:8px;"
          @click="onClickSelectModel('Hub')"
        >
          Hub
        </button>
        <button
          class="model-button"
          :class="selectModel == 'Device' ? 'model-button-active' : ''"
          style="margin-left:8px;"
          @click="onClickSelectModel('Device')"
        >
          Device
        </button>
      </div>
      <!-- Hub模式 -->
      <div v-show="selectModel == 'Hub'" style="overflow-y: auto;">
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
              <div class="info-row-right">0012554563</div>
            </div>
          </div>
        </div>
        <!-- Preheat -->
        <div class="info-item">
          <div class="info-title">
            Preheat
            <van-switch
              style="margin-left:auto;"
              v-model="hubInfo.preheat"
              active-color="#66DCA5"
              inactive-color="#D6CDF2"
              size="18"
              :disabled="true"
            />
          </div>
          <div class="item-split" v-show="hubInfo.preheat"></div>
          <div class="info-content" v-show="hubInfo.preheat">
            <div class="info-row">
              <div class="info-row-left">Time</div>
              <div class="info-row-right">10.0s</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Voltage</div>
              <div class="info-row-right">1.7v</div>
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
                v-for="(item, index) in hubInfo.voltageCurve"
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
                v-for="(value, index) in hubInfo.voltageCurve"
                :key="index"
                v-model="hubInfo.voltageCurve[index]"
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
      <div v-show="selectModel == 'Device'" style="overflow-y: auto;">
        <!-- Info -->
        <div class="info-item">
          <div class="info-title">
            Hub Info
          </div>
          <div class="item-split"></div>
          <div class="info-content">
            <div class="info-row">
              <div class="info-row-left">Device Model</div>
              <div class="info-row-right">NORD</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">ID</div>
              <div class="info-row-right">36:52:63:OC:53:1D</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Device Type</div>
              <div class="info-row-right">Disposable</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Resistance</div>
              <div class="info-row-right">1.0 Ω</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Production Time</div>
              <div class="info-row-right">week 25,2022</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Brand</div>
              <div class="info-row-right">iKrusher</div>
            </div>
          </div>
        </div>
        <!-- Preheat -->
        <div class="info-item">
          <div class="info-title">
            Preheat
            <van-switch
              style="margin-left:auto;"
              v-model="deviceInfo.preheat"
              active-color="#66DCA5"
              inactive-color="#D6CDF2"
              size="18"
              :disabled="true"
            />
          </div>
          <div class="item-split" v-show="deviceInfo.preheat"></div>
          <div class="info-content" v-show="deviceInfo.preheat">
            <div class="info-row">
              <div class="info-row-left">Time</div>
              <div class="info-row-right">10.0s</div>
            </div>
            <div class="info-row">
              <div class="info-row-left">Voltage</div>
              <div class="info-row-right">1.7v</div>
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
                v-for="(item, index) in deviceInfo.voltageCurve"
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
                v-for="(value, index) in deviceInfo.voltageCurve"
                :key="index"
                v-model="deviceInfo.voltageCurve[index]"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingView",
  data() {
    return {
      selectModel: "Hub",
      hubInfo: {
        preheat: false,
        voltageCurve: [-1300, -1700, -3300, -4000, -2000, -2900]
      },
      deviceInfo: {
        preheat: true,
        voltageCurve: [-4200, -600, -2100, -3100, -1000, -900]
      }
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickHeaderReturn() {
      this.$router.go(-1);
    },
    onClickSelectModel(model) {
      this.selectModel = model;
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
    height: 70px;
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
}
</style>
