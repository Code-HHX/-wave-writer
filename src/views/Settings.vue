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
      Temperature Setting
      <div class="header-save" @click="onClickSave">Save</div>
    </div>
    <div class="content">
      <div class="my-voltage">
        <div class="my-voltage-title">
          My Voltage Curves
          <span style="color: #999999;">（Up to five）</span>
        </div>
        <div class="my-voltage-content">
          <div
            class="my-voltage-item"
            v-for="(item, index) in selectVoltage"
            :key="item.id"
          >
            <span>{{ item.modeName }}</span>
            <img
              src="@/assets/icons/icon_close.png"
              @click="onClickDeleteMyVoltage(index)"
            />
          </div>
        </div>
      </div>
      <div class="voltage-setting">
        <van-tabs
          class="voltage-tabs"
          v-model="activeSetting"
          animated
          swipeable
          color="#6649C4"
          line-width="140px"
          line-height="6px"
          background="#FFFFFF"
          title-inactive-color="#999999"
          title-active-color="#6649c4"
        >
          <!-- Recommended -->
          <van-tab title="Recommended" name="recommended">
            <div class="recommended" v-if="recommendedList.length > 0">
              <div class="recommended-header">
                Hot
                <!-- 过滤气泡弹出框 Filter -->
                <van-popover
                  v-if="filterList.length > 0"
                  v-model="showFilterPopover"
                  trigger="click"
                  placement="bottom-end"
                  :actions="filterList"
                  @select="onSelectFilter"
                  :get-container="getContainer"
                  :close-on-click-action="true"
                >
                  <template #reference>
                    <span
                      class="recommended-header-filter"
                      :style="
                        selectFilter != '' ? 'color:#6649c4' : 'color:#999999'
                      "
                    >
                      Filter
                      <img
                        :src="
                          selectFilter != ''
                            ? require('@/assets/icons/icon_filter_select.png')
                            : require('@/assets/icons/icon_filter.png')
                        "
                      />
                    </span>
                  </template>
                </van-popover>
              </div>
              <van-list
                class="recommended-list"
                v-model="loading_tab1"
                :finished="finished_tab1"
                finished-text="No more data"
                loading-text="Loading more..."
                error-text="Request network error."
                :error.sync="load_error_tab1"
                :immediate-check="false"
                @load="onLoadTab1"
              >
                <div
                  class="recommended-item"
                  v-for="(item, index) in recommendedList"
                  :key="index"
                >
                  <div class="recommended-item-left">
                    <div class="item-left-title">
                      {{ item.modeName }}
                    </div>
                    <div class="item-left-label-list">
                      <div
                        class="item-left-label"
                        v-for="(label, index1) in item.flavorName"
                        :key="index1"
                      >
                        {{ label }}
                      </div>
                    </div>
                    <div class="item-left-msg">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="recommended-item-right">
                    <van-button
                      type="default"
                      @click="
                        onClickApply(index, item.checked, 'recommendedList')
                      "
                      :class="item.checked ? 'button-cancel' : 'button-use'"
                      >{{ item.checked ? "Cancel" : "Use" }}</van-button
                    >
                    <div class="item-right-msg">{{ item.useCount }} used</div>
                  </div>
                </div>
              </van-list>
            </div>
            <div class="recommended" v-else>
              <div class="my-setting-no-setting">
                No recommendation yet
              </div>
            </div>
          </van-tab>
          <!-- My Settings -->
          <van-tab title="My Settings" name="mySettings">
            <div class="my-setting" v-if="mySettingList.length > 0">
              <div class="my-setting-header">
                <div class="header-left" @click="onClickCreateMySetting">
                  <img src="@/assets/icons/icon_create.png" />
                  Create
                </div>
                <!-- 过滤气泡弹出框 Filter -->
                <van-popover
                  v-if="filterList2.length > 0"
                  v-model="showFilterPopover2"
                  trigger="click"
                  placement="bottom-end"
                  :actions="filterList2"
                  @select="onSelectFilter"
                  :get-container="getContainer2"
                  :close-on-click-action="true"
                  :offset="[-1, 8]"
                >
                  <template #reference>
                    <span
                      class="my-setting-header-filter"
                      :style="
                        selectFilter2 != '' ? 'color:#6649c4' : 'color:#999999'
                      "
                    >
                      Filter
                      <img
                        :src="
                          selectFilter2 != ''
                            ? require('@/assets/icons/icon_filter_select.png')
                            : require('@/assets/icons/icon_filter.png')
                        "
                      />
                    </span>
                  </template>
                </van-popover>
              </div>
              <van-list
                class="my-setting-list"
                v-model="loading_tab2"
                :finished="finished_tab2"
                finished-text="No more data"
                loading-text="Loading more..."
                error-text="Request network error."
                :error.sync="load_error_tab2"
                :immediate-check="false"
                @load="onLoadTab2"
              >
                <div
                  class="my-setting-item"
                  v-for="(item, index) in mySettingList"
                  :key="item.id"
                >
                  <div class="my-setting-item-left">
                    <div class="item-left-title">
                      {{ item.modeName }}
                    </div>
                    <div class="item-left-label-list">
                      <div
                        class="item-left-label"
                        v-for="(label, index1) in item.flavorName"
                        :key="index1"
                      >
                        {{ label }}
                      </div>
                    </div>
                    <!-- <div class="item-left-msg">{{ item.useCount }} used</div> -->
                    <div class="item-left-msg">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="my-setting-item-right">
                    <van-button
                      type="default"
                      @click="
                        onClickApply(index, item.checked, 'mySettingsList')
                      "
                      :class="item.checked ? 'button-cancel' : 'button-use'"
                      >{{ item.checked ? "Cancel" : "Use" }}</van-button
                    >
                  </div>
                </div>
              </van-list>
            </div>
            <div class="my-setting" v-else>
              <div class="my-setting-no-setting">
                There is no setting
                <van-button
                  class="no-setting-create-button"
                  type="default"
                  @click="onClickCreateMySetting"
                >
                  Create one
                </van-button>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      showFilterPopover: false,
      showFilterPopover2: false,
      filterList: [],
      filterList2: [],
      selectFilter: "",
      selectFilter2: "",
      selectVoltage: [],
      activeSetting: "recommended", //recommended or mySettings
      recommendedList: [],
      mySettingList: [],
      pageNum_tab1: 1,

      total_tab1: 0,
      loading_tab1: false,
      load_error_tab1: false,
      finished_tab1: false,

      pageNum_tab2: 1,
      total_ta2: 0,
      loading_tab2: false,
      load_error_tab2: false,
      finished_tab2: false
    };
  },
  created() {
    if (this.$route.params.selectVoltage) {
      this.selectVoltage = this.$route.params.selectVoltage;
      window.localStorage.setItem(
        "selectVoltage",
        JSON.stringify(this.selectVoltage)
      );
    } else {
      this.selectVoltage = JSON.parse(
        window.localStorage.getItem("selectVoltage")
      );
      if (!this.selectVoltage) this.selectVoltage = [];
    }
  },
  mounted() {
    let activeSetting = this.$route.params.activeSetting;
    if (activeSetting) this.activeSetting = activeSetting;
    this.getfilterByRecommend();
    this.getRecommendedList();
    this.getMySettingsList();

    //挂载成功后给pop事件绑定一个方法
    // 如果支持 popstate （一般移动端都支持）
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL);
      // 给 popstate 绑定一个方法用来监听页面返回
      window.addEventListener("popstate", this.onClickHeaderReturn, false); //false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickHeaderReturn, false); //false阻止默认事件
  },
  watch: {},
  computed: {},
  methods: {
    onClickSave() {
      let idList = [];
      idList = this.selectVoltage.map(item => {
        return item.id;
      });
      this.$api.writer
        .saveUseSettings({
          id: idList
        })
        .then(res => {
          if (res.code == 200) {
            this.$toast({
              type: "success",
              duration: "1000",
              forbidClick: "true",
              position: "middle",
              message: res.message
            });
            setTimeout(() => {
              this.$router.replace({
                name: "Home",
                params: {
                  refresh: true
                }
              });
            }, 1000);
          } else {
            this.$toast({
              type: "fail",
              duration: "2000",
              position: "middle",
              message: res.message
            });
          }
        })
        .catch(error => {});
    },
    async onLoadTab1() {
      this.pageNum_tab1++;
      await this.getRecommendedList();
      this.loading_tab1 = false;

      if (this.recommendedList.length >= this.total_tab1) {
        this.finished_tab1 = true;
      }
    },
    async onLoadTab2() {
      this.pageNum_tab2++;
      await this.getMySettingsList();
      this.loading_tab2 = false;

      if (this.mySettingList.length >= this.total_tab2) {
        this.finished_tab2 = true;
      }
    },
    async getRecommendedList() {
      await this.$api.writer
        .selectRecommendSettingsDetails({
          pageNum: this.pageNum_tab1,
          pageSize: 10,
          flavorId: this.selectFilter
        })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(element => {
              element.checked = false;
              this.selectVoltage.forEach(item => {
                if (element.id == item.id) {
                  element.checked = true;
                  return;
                }
              });
            });
            this.recommendedList = this.recommendedList.concat(res.data);
            this.total_tab1 = res.total;
            if (res.total <= 10) {
              this.finished_tab1 = true;
            }
          } else {
            this.load_error_tab1 = true;
          }
        })
        .catch(error => {
          this.load_error_tab1 = true;
          this.recommendedList = [];
          this.total_tab1 = 0;
        });
    },
    async getMySettingsList() {
      await this.$api.writer
        .selectMySettingsDetails({
          pageNum: this.pageNum_tab2,
          pageSize: 10,
          flavorId: this.selectFilter2
        })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(element => {
              element.checked = element.useStatus == 0 ? false : true;
              this.selectVoltage.forEach(item => {
                if (element.id == item.id) {
                  element.checked = true;
                  return;
                }
              });
            });
            this.mySettingList = this.mySettingList.concat(res.data);
            this.total_tab2 = res.total;
            if (res.total <= 10) {
              this.finished_tab2 = true;
            }
          } else {
            this.load_error_tab2 = true;
          }
        })
        .catch(error => {
          this.load_error_tab2 = true;
          this.mySettingList = [];
          this.total_tab2 = 0;
        });
    },
    getfilterByRecommend() {
      this.$api.writer
        .selectFlavorByRecommend({
          isRecommend: 0
        })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(element => {
              element.text = element.modeName;
            });
            this.filterList = res.data;
          } else {
            this.filterList = [];
          }
        });
      this.$api.writer
        .selectFlavorByRecommend({
          isRecommend: 1
        })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(element => {
              element.text = element.modeName;
            });
            this.filterList2 = res.data;
          } else {
            this.filterList2 = [];
          }
        });
    },
    onClickHeaderReturn() {
      this.$router.replace("Home");
    },
    onClickDeleteMyVoltage(index) {
      if (this.selectVoltage.length == 1) {
        this.$toast({
          type: "fail",
          duration: "3000",
          position: "middle",
          message: "At least one voltage curve should be selected."
        });
        return;
      }
      let modeId = this.selectVoltage[index].id;
      if (this.recommendedList.findIndex(item => item.id == modeId) != -1) {
        this.recommendedList[
          this.recommendedList.findIndex(item => item.id == modeId)
        ].checked = false;
      }
      if (this.mySettingList.findIndex(item => item.id == modeId) != -1) {
        this.mySettingList[
          this.mySettingList.findIndex(item => item.id == modeId)
        ].checked = false;
      }
      this.selectVoltage.splice(index, 1);
    },
    onClickApply(index, checked, mode) {
      if (this.selectVoltage.length >= 5 && !checked) {
        this.$toast({
          type: "fail",
          duration: "3000",
          position: "middle",
          message: "Only five voltage curves can be selected at most."
        });
        return;
      }
      if (this.selectVoltage.length == 1 && checked) {
        this.$toast({
          type: "fail",
          duration: "3000",
          position: "middle",
          message: "At least one voltage curve should be selected."
        });
        return;
      }
      if (mode == "recommendedList") {
        let modeId = this.recommendedList[index].id;
        this.recommendedList[index].checked = !this.recommendedList[index]
          .checked;
        if (this.recommendedList[index].checked) {
          if (!this.selectVoltage.some(item => item.id == modeId)) {
            this.selectVoltage.push(this.recommendedList[index]);
          }
        } else {
          let cancelIndex = this.selectVoltage.findIndex(
            item => item.id == modeId
          );
          this.selectVoltage.splice(cancelIndex, 1);
        }
      } else if (mode == "mySettingsList") {
        let modeId = this.mySettingList[index].id;
        this.mySettingList[index].checked = !this.mySettingList[index].checked;
        if (this.mySettingList[index].checked) {
          if (!this.selectVoltage.some(item => item.id == modeId)) {
            this.selectVoltage.push(this.mySettingList[index]);
          }
        } else {
          let cancelIndex = this.selectVoltage.findIndex(
            item => item.id == modeId
          );
          this.selectVoltage.splice(cancelIndex, 1);
        }
      }
    },
    onClickCreateMySetting() {
      this.$router.replace("CreateVoltage");
    },
    getContainer() {
      // 返回一个特定的 DOM 节点，作为挂载的父节点
      return document.querySelector(".recommended-header-filter");
    },
    getContainer2() {
      // 返回一个特定的 DOM 节点，作为挂载的父节点
      return document.querySelector(".my-setting-header-filter");
    },
    onSelectFilter(item, index) {
      if (this.activeSetting == "recommended" && item) {
        if (item.id == this.selectFilter) {
          item.className = "";
          this.selectFilter = "";
        } else {
          this.filterList.forEach(element => {
            element.className = "";
          });
          item.className = "active-filter";
          this.selectFilter = item.id;
        }

        this.pageNum_tab1 = 1;
        this.finished_tab1 = false;
        this.total_tab1 = 0;
        this.recommendedList = [];
        this.getRecommendedList();
      } else if (this.activeSetting == "mySettings" && item) {
        if (item.id == this.selectFilter2) {
          item.className = "";
          this.selectFilter2 = "";
        } else {
          this.filterList2.forEach(element => {
            element.className = "";
          });
          item.className = "active-filter";
          this.selectFilter2 = item.id;
        }

        this.pageNum_tab2 = 1;
        this.finished_tab2 = false;
        this.total_tab2 = 0;
        this.mySettingList = [];
        this.getMySettingsList();
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

    .header-save {
      position: absolute;
      right: 10px;
      font-size: 16px;
      font-weight: 400;
      color: #f1edff;
    }
  }

  .content {
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;

    .my-voltage {
      padding: 16px;
      display: flex;
      height: 130px;
      min-height: 130px;
      max-height: 130px;
      overflow: hidden;
      flex-direction: column;
      background: #ffffff;

      .my-voltage-title {
        font-size: 18px;
        font-weight: bold;
        color: #555555;
      }

      .my-voltage-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        overflow-y: auto;

        .my-voltage-item {
          height: 35px;
          background: #f1edff;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 400;
          color: #6649c4;
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: 0 10px;
          margin: 16px 6px 0 0;

          span {
            max-width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            margin-left: 8px;
            width: 18px;
            height: 18px;
          }
        }
      }
    }

    .voltage-setting {
      height: 100%;
      margin-top: 10px;
      padding: 0 16px;
      background: #ffffff;
      overflow: hidden;

      .voltage-tabs {
        height: 100%;

        :deep(.van-tabs__content) {
          height: calc(100% - 45px);
        }

        :deep(.van-tab__pane) {
          height: 100%;
        }
      }
      .recommended,
      .my-setting {
        height: 100%;
        display: flex;
        flex-direction: column;

        .recommended-header,
        .my-setting-header {
          margin: 16px 0;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #555555;

          .header-left {
            display: flex;
            align-items: center;
          }
          span {
            margin-left: auto;
            font-size: 16px;
            font-weight: 400;
            color: #999999;
            display: flex;
            align-items: center;

            img {
              margin-left: 4px;
              width: 20px;
              height: 20px;
            }
          }

          img {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }

          :deep(.van-popover) {
            max-height: 270px;
          }

          :deep(.van-popover__content) {
            height: 100%;
            overflow-y: auto;
          }
        }

        .recommended-list,
        .my-setting-list {
          display: flex;
          flex-direction: column;
          overflow-y: auto;

          .recommended-item,
          .my-setting-item {
            margin-bottom: 16px;
            padding: 0 16px;
            border: 1px solid #eeeeee;
            border-radius: 10px;
            display: flex;
            min-height: 95px;

            .recommended-item-left,
            .my-setting-item-left {
              display: flex;
              flex-direction: column;
              justify-content: center;

              .item-left-title {
                font-size: 16px;
                font-weight: 400;
                color: #555555;
                display: flex;
                align-items: center;
                margin: 10px 0;
              }

              .item-left-label-list {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-left: -2px;

                .item-left-label {
                  font-size: 12px;
                  padding: 0 5px;
                  margin: 0 5px 10px 0;
                  color: #6649c4;
                  border-radius: 5px;
                  border: 1px solid #755bca;
                }
              }

              .item-left-msg {
                font-size: 13px;
                font-weight: 400;
                color: #999999;
                margin-bottom: 10px;
              }
            }

            .recommended-item-right,
            .my-setting-item-right {
              margin-left: auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;

              .button-cancel {
                width: 60px;
                height: 30px;
                color: #6649c4;
                border-radius: 8px;
                border: 1px solid #6649c4;
              }
              .button-use {
                width: 60px;
                height: 30px;
                color: #ffffff;
                background: #6649c4;
                border-radius: 8px;
                border: 1px solid #6649c4;
              }

              .item-right-msg {
                position: absolute;
                bottom: 10px;
                font-size: 13px;
                font-weight: 400;
                color: #999999;
              }
            }
          }
        }

        .my-setting-no-setting {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 400;
          color: #555555;

          .no-setting-create-button {
            height: 40px;
            margin-top: 20px;
            border-radius: 20px;
            background: #f1edff;
            font-size: 16px;
            font-weight: 400;
            color: #6649c4;
          }
        }
      }
    }
  }
}
:deep(.van-popover) {
  .active-filter {
    color: #6649c4;
    background: #f1edff;
    border-radius: 8px;
  }
}
:deep(.van-popover__action-text) {
  justify-content: flex-start;
}
:deep(.van-hairline--bottom::after) {
  border-bottom-width: 0px;
}
</style>
