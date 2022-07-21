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
      Voltage Settings
    </div>
    <div class="content">
      <div class="info">
        <div class="info-title">Name</div>
        <input
          ref="modeName"
          class="info-input"
          type="text"
          v-model.trim="newVoltage.modeName"
          placeholder="Please enter name"
          maxlength="25"
        />
        <div class="info-title">Description</div>
        <textarea
          ref="description"
          class="pwd"
          type="text"
          v-model.trim="newVoltage.description"
          placeholder="Please enter description"
          maxlength="500"
        />
      </div>
      <div class="flavor">
        <div class="flavor-title">
          Flavor & Oil Type
          <span v-if="model != 'edit'" @click="showFlavorPopup = true"
            >Select <img src="@/assets/icons/icon_right.png"
          /></span>
        </div>
        <div class="flavor-list" v-if="selectFlavorList.length > 0">
          <div
            class="flavor-item"
            v-for="(item, index) in selectFlavorList"
            :key="index"
          >
            <img :src="item.flavorPicture" />
            {{ item.modelName }}
          </div>
        </div>
        <div class="flavor-list-empty" v-else>
          Please select the applicable flavor of the voltage setting
        </div>
      </div>
      <div class="voltage">
        <div class="main-header">
          <!-- <span>{{ modelList[curveModel].text }}</span> -->
          <span>Voltage Curve</span>
        </div>
        <!-- 曲线1 -->
        <!-- 曲线2 -->
        <div class="voltage-content">
          <div class="voltage-one">
            <div
              class="voltage-number"
              v-for="(item, index) in voltageCurve"
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
              v-for="(value, index) in voltageCurve"
              :key="index"
              v-model="voltageCurve[index]"
              vertical
              min="-4200"
              max="-100"
              :step="100"
              bar-height="4px"
              active-color="#EEEEEE"
              inactive-color="#6649C4"
              @change="onChangeVoltageCurve(index)"
              :disabled="model == 'edit' ? true : false"
            >
              <template #button>
                <img
                  class="slider-button"
                  :src="
                    model === 'edit'
                      ? require('@/assets/icons/icon_slider_button_disabled.png')
                      : require('@/assets/icons/icon_slider_button.png')
                  "
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
                  v-model="newVoltage.preheatSetting"
                  active-value="1"
                  inactive-value="0"
                  active-color="#66DCA5"
                  inactive-color="#D6CDF2"
                  size="20"
                  :disabled="model === 'edit' ? true : false"
                />
              </div>
              <div class="subtitle">
                Times：<span
                  :style="
                    newVoltage.preheatSetting == 1
                      ? 'color:#6649C4'
                      : 'color:#555555'
                  "
                  >{{ (newVoltage.preheatTime / 1000).toFixed(1) }}s</span
                >
              </div>
              <!--预热时间-->
              <div class="times-item">
                <van-slider
                  v-model="newVoltage.preheatTime"
                  min="1000"
                  max="20000"
                  @change="onClickModelItem(0)"
                  :step="500"
                  bar-height="4px"
                  active-color="#6649C4"
                  inactive-color="#FFFFFF"
                  :disabled="newVoltage.preheatSetting == 0 ? true : false"
                >
                  <template #button>
                    <img
                      class="slider-button"
                      :src="
                        newVoltage.preheatSetting == 1
                          ? require('@/assets/icons/icon_slider_button_vertical.png')
                          : require('@/assets/icons/icon_slider_button_vertical_disabled.png')
                      "
                    />
                  </template>
                </van-slider>
                <div class="times-item-msg">
                  <div class="times-left">1&nbsp;s</div>
                  <div class="times-right">20&nbsp;s</div>
                </div>
              </div>
              <div class="subtitle">
                Voltage：<span
                  :style="
                    newVoltage.preheatSetting == 1
                      ? 'color:#6649C4'
                      : 'color:#555555'
                  "
                  >{{ (newVoltage.preheatVoltage / 1000).toFixed(1) }}v</span
                >
              </div>

              <!--预热电压-->
              <div class="voltage-item">
                <van-slider
                  v-model="newVoltage.preheatVoltage"
                  min="100"
                  max="4200"
                  :step="100"
                  bar-height="4px"
                  active-color="#6649C4"
                  inactive-color="#FFFFFF"
                  :disabled="newVoltage.preheatSetting == 0 ? true : false"
                >
                  <template #button>
                    <img
                      class="slider-button"
                      :src="
                        newVoltage.preheatSetting == 1
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
                v-model="newVoltage.nfcSettings"
                active-value="1"
                inactive-value="0"
                active-color="#66DCA5"
                inactive-color="#D6CDF2"
                size="20"
                :disabled="model === 'edit' ? true : false"
              />
              <div class="msg">
                Only use to that device support NFC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button class="footer-button" type="default" @click="onClickSave">
        Save
      </van-button>
    </div>
    <!-- 口味选择弹窗 Flavor -->
    <van-popup
      class="flavor-popup"
      v-model="showFlavorPopup"
      position="bottom"
      :style="{ height: '60%' }"
      :close-on-click-overlay="false"
    >
      <div class="flavor-header">
        <img
          src="@/assets/icons/icon_left.png"
          @click="showFlavorPopup = false"
        />
        <span class="header-title">Applicable Flavor</span>
        <span class="header-dome" @click="onClickDome">DONE</span>
      </div>
      <div class="flavor-content">
        <span>Up to 5 can be selected</span>
        <div class="flavor-list" v-if="flavorList.length > 0">
          <div
            class="flavor-item"
            v-for="(item, index) in flavorList"
            :key="item.id"
            @click="onClickFlavorCheck(item, index)"
          >
            <img class="flavor-picture" :src="item.flavorPicture" />
            {{ item.modelName }}
            <img
              class="flavor-checked"
              :src="
                item.checked
                  ? require('@/assets/icons/icon_checked.png')
                  : require('@/assets/icons/icon_unchecked.png')
              "
            />
          </div>
        </div>
        <div class="flavor-list-empty" v-else>
          No flavor
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "CreateVoltage",
  data() {
    return {
      newVoltage: {
        description: "", //描述
        flavorId: [], //口味ID
        modeName: "", //模式名称
        nfcSettings: 0, //nfc开关
        preheatSetting: 0, //设置开关
        preheatTime: 0, //设置描述
        preheatVoltage: 0, //设置电压
        temperature: "" //温度曲线
      },
      voltageCurve: [-2100, -2100, -2100, -2100, -2100, -2100],
      flavorList: [],
      checkFlavorList: [], //选中未确定口味列表
      selectFlavorList: [], //选中已确定口味列表
      showFlavorPopup: false,
      activeSetting: "",
      beForm: "",
      divSetting: {},
      editId: "",
      model: "create" //create or edit
    };
  },
  created() {
    this.$api.writer.selectAllFlavor({}).then(res => {
      if (res.code == 200) {
        if (res.data) {
          res.data.forEach(element => {
            element.checked = false;
          });
          this.flavorList = res.data;
        }
      } else {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: res.message
        });
        this.flavorList = [];
      }
    });
  },
  mounted() {
    this.activeSetting = this.$route.params;
    this.beForm = this.$route.params.beForm;
    this.divSetting = this.$route.params.divSetting;
    this.editId = this.$route.params.editId;
    this.model = this.$route.params.model;

    if (this.model === "edit") {
      this.$api.writer
        .selectCurveById({
          id: this.editId
        })
        .then(res => {
          if (res.code === 200) {
            this.newVoltage.id = res.data.id;
            this.newVoltage.modeName = res.data.modeName;
            this.newVoltage.description = res.data.description;
            this.newVoltage.flavorId = res.data.flavorId;
            this.newVoltage.nfcSettings = res.data.nfcSettings.toString();
            this.newVoltage.preheatSetting = res.data.preheatSetting.toString();
            this.newVoltage.preheatTime = res.data.preheatTime;
            this.newVoltage.preheatVoltage = res.data.preheatVoltage;
            this.newVoltage.temperature = res.data.temperature;

            if (res.data.flavorId.length > 0) {
              res.data.flavorId.forEach(element => {
                this.flavorList.forEach(item => {
                  if (element.toString() === item.id.toString()) {
                    this.selectFlavorList.push(item);
                  }
                });
              });
            }

            let curveList = res.data.temperature.split(",");
            let newVoltageList = [];
            curveList.forEach(element => {
              newVoltageList.push(parseInt(element) * -1);
            });
            this.voltageCurve = newVoltageList;
          } else {
            this.$toast({
              type: "fail",
              duration: "2000",
              forbidClick: "true",
              position: "middle",
              message: res.message
            });
            setTimeout(() => {
              this.back();
            }, 2000);
          }
        })
        .catch(error => {
          this.$toast({
            type: "fail",
            duration: "2000",
            forbidClick: "true",
            position: "middle",
            message: error.message
          });
          setTimeout(() => {
            this.back();
          }, 2000);
        });
    }

    if (this.divSetting) {
      this.voltageCurve = this.divSetting.diyVoltage;
      this.newVoltage.nfcSettings = this.divSetting.isSupportNfc ? "1" : "0";
      this.newVoltage.preheatSetting = this.divSetting.isSupportPreheat
        ? "1"
        : "0";
      this.newVoltage.preheatTime = this.divSetting.preheatTime;
      this.newVoltage.preheatVoltage = this.divSetting.preheatVoltage;
      this.newVoltage.temperature = this.divSetting.diyVoltage.toString();
    }

    //挂载成功后给pop事件绑定一个方法
    // 如果支持 popstate （一般移动端都支持）
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL);
      // 给 popstate 绑定一个方法用来监听页面返回
      window.addEventListener("popstate", this.back, false); //false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.back, false); //false阻止默认事件
  },
  watch: {},
  computed: {},
  methods: {
    back() {
      this.$router.replace({
        name: this.beForm == "Home" ? "Home" : "Settings",
        params: {
          activeSetting: "mySettings"
        }
      });
    },
    onClickHeaderReturn() {
      this.$router.replace({
        name: this.beForm == "Home" ? "Home" : "Settings",
        params: {
          activeSetting: "mySettings"
        }
      });
    },
    onTouchmoveVoltage(e) {},
    onChangeVoltageCurve(index) {},
    onClickModelItem(index) {},
    onClickSave() {
      if (this.$utils.isNullAndEmpty(this.newVoltage.modeName)) {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: "Name cannot be empty."
        });
        this.$refs.modeName.focus();
        return;
      }
      if (this.$utils.isNullAndEmpty(this.newVoltage.description)) {
        this.$toast({
          type: "fail",
          duration: "2000",
          forbidClick: "true",
          position: "middle",
          message: "Description cannot be empty."
        });
        this.$refs.description.focus();
        return;
      }
      if (this.model === "edit") {
        this.$api.writer
          .updateVoltageName({
            id: this.newVoltage.id,
            modeName: this.newVoltage.modeName,
            heatingRemarks: this.newVoltage.description
          })
          .then(res => {
            if (res.code === 200) {
              //处理缓存
              let selectVoltage = JSON.parse(
                window.localStorage.getItem("selectVoltage")
              );
              if (selectVoltage) {
                selectVoltage.forEach(element => {
                  if (element.id.toString() === this.newVoltage.id.toString()) {
                    element.modeName = this.newVoltage.modeName;
                  }
                });
                window.localStorage.setItem(
                  "selectVoltage",
                  JSON.stringify(selectVoltage)
                );
              }
              this.$toast({
                type: "success",
                duration: "2000",
                position: "middle",
                forbidClick: "true",
                message: res.message
              });
              setTimeout(() => {
                this.$router.replace({
                  name: "Settings",
                  params: {
                    activeSetting: "mySettings"
                  }
                });
              }, 2000);
            } else {
              this.$toast({
                type: "fail",
                duration: "2000",
                position: "middle",
                message: res.message
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        //处理电压曲线
        this.newVoltage.temperature = this.voltageCurve
          .map(item => Math.abs(item))
          .toString();
        this.$api.writer.saveVoltageSettings(this.newVoltage).then(res => {
          if (res.code == 200) {
            this.$toast({
              type: "success",
              duration: "1500",
              position: "middle",
              forbidClick: "true",
              message: res.message
            });
            setTimeout(() => {
              this.$router.replace({
                name: "Settings",
                params: {
                  activeSetting: "mySettings"
                }
              });
            }, 1500);
          } else {
            this.$toast({
              type: "fail",
              duration: "2000",
              position: "middle",
              message: res.message
            });
          }
        });
      }
    },
    onClickDome() {
      this.selectFlavorList = this.checkFlavorList;
      let idList = [];
      if (this.selectFlavorList.length > 0) {
        this.selectFlavorList.forEach(element => {
          idList.push(element.id);
        });
      }
      this.newVoltage.flavorId = idList;
      this.showFlavorPopup = false;
    },
    onClickFlavorCheck(row, index) {
      if (this.checkFlavorList.length >= 5 && !row.checked) {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: "Up to 5 can be selected."
        });
        return;
      }
      row.checked = !row.checked;
      if (this.checkFlavorList.some(item => item.id == row.id)) {
        this.checkFlavorList.splice(
          this.checkFlavorList.findIndex(item => item.id == row.id),
          1
        );
      } else {
        this.checkFlavorList.push(row);
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
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    margin-bottom: 60px;

    .info {
      background: #ffffff;
      padding: 0 16px;
      padding-top: 16px;

      .info-title {
        font-size: 18px;
        font-weight: 400;
        color: #555555;
      }

      input {
        color: #555555;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #dddddd;
        background: #ffffff;
        margin-top: 10px;
        margin-bottom: 16px;
      }
      textarea {
        color: #555555;
        border-radius: 8px;
        border: 1px solid #dddddd;
        background: #ffffff;
        margin-top: 10px;
        margin-bottom: 16px;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: normal;
        -webkit-box-sizing: border-box; //谷歌浏览器
        -moz-box-sizing: border-box; //火狐浏览器
        box-sizing: border-box; //其它浏览器
        width: 100%;
        padding: 11px;
        resize: none;
      }
      input[type="text"]:focus {
        outline: none;
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers，webkit内核浏览器 */
        color: #888888;
        font-size: 18px;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #888888;
        font-size: 18px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #888888;
        font-size: 18px;
      }
    }

    .flavor {
      margin-top: 10px;
      background: #ffffff;
      padding: 0 16px;
      padding-bottom: 6px;
      display: flex;
      flex-direction: column;

      .flavor-title {
        font-size: 18px;
        font-weight: 400;
        color: #555555;
        display: flex;
        align-items: center;
        margin: 16px 0;

        span {
          font-size: 16px;
          font-weight: 400;
          color: #6649c4;
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        img {
          width: 19px;
          height: 19px;
        }
      }

      .flavor-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .flavor-item {
          width: 47%;
          max-width: 47%;
          height: 45px;
          min-height: 45px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #eeeeee;
          font-size: 16px;
          font-weight: 400;
          color: #555555;
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 10px;
          }
        }
      }

      .flavor-list-empty {
        margin: 10px 0 16px 0;
        font-size: 13px;
        font-weight: 400;
        color: #999999;
      }
    }

    .voltage {
      margin-top: 10px;
      background: #ffffff;
      padding: 16px 16px 0 16px;

      .main-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        span {
          font-size: 18px;
          font-weight: 400;
          color: #555555;
        }
      }

      .voltage-content {
        overflow-y: auto;

        .voltage-one {
          margin: 0 0 20px 0;
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
          margin: 16px 0;

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
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px -2px 6px 1px rgba(0, 0, 0, 0.149);
    display: flex;
    align-items: center;

    .footer-button {
      width: 90%;
      margin: 0 auto;
      height: 45px;
      background: #6649c4;
      border-radius: 8px;
      border: 1px solid #6649c4;
      font-size: 18px;
      font-weight: normal;
      color: #ffffff;
    }
  }

  .flavor-popup {
    display: flex;
    flex-direction: column;

    .flavor-header {
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #eeeeee;
      padding: 16px 0;

      img {
        width: 19px;
        height: 19px;
        margin-left: 16px;
      }

      .header-title {
        width: 150px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: #555555;
        position: absolute;
        left: 50%;
        margin-left: -75px;
      }

      .header-dome {
        margin-left: auto;
        margin-right: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #6649c4;
      }
    }

    .flavor-content {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      overflow: hidden;

      span {
        font-size: 13px;
        font-weight: 400;
        color: #999999;
        margin-bottom: 16px;
      }

      .flavor-list {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;

        .flavor-item:last-child {
          margin-bottom: 16px;
        }

        .flavor-item {
          height: 65px;
          min-height: 65px;
          background: #ffffff;
          border-radius: 10px;
          margin-bottom: 10px;
          border: 1px solid #eeeeee;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 400;
          color: #555555;

          .flavor-picture {
            width: 45px;
            height: 45px;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 50%;
          }

          .flavor-checked {
            width: 22px;
            height: 22px;
            margin-left: auto;
            margin-right: 10px;
          }
        }
      }

      .flavor-list-empty {
        text-align: center;
        margin: 50px 0;
        font-size: 22px;
        font-weight: bold;
        color: #555555;
      }
    }
  }

  /deep/ .van-popup {
    overflow: hidden;
  }
}
</style>
