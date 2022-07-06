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
      <div class="header-save">Save</div>
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
            :key="index"
          >
            <span>{{ item.title }}</span>
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
          <van-tab title="Recommended" name="recommended">
            <div class="recommended">
              <div class="recommended-header">
                Hot
                <!-- 过滤气泡弹出框 Filter -->
                <van-popover
                  v-model="showFilterPopover"
                  trigger="click"
                  placement="bottom-end"
                  :actions="filterList"
                  @select="onSelectFilter"
                  :get-container="getContainer"
                  :close-on-click-action="false"
                >
                  <template #reference>
                    <span class="recommended-header-filter">
                      Filter <img src="@/assets/icons/icon_filter.png" />
                    </span>
                  </template>
                </van-popover>
              </div>
              <div class="recommended-list">
                <div
                  class="recommended-item"
                  v-for="(item, index) in recommendedList"
                  :key="index"
                >
                  <div class="recommended-item-left">
                    <div class="item-left-title">
                      {{ item.text }}
                      <div
                        class="item-left-label"
                        v-for="(label, index1) in item.label"
                        :key="index1"
                      >
                        {{ label }}
                      </div>
                    </div>
                    <div class="item-left-msg">{{ item.used }} used</div>
                    <div class="item-left-msg">
                      {{ item.explain }}
                    </div>
                  </div>
                  <div class="recommended-item-right">
                    <van-button
                      type="default"
                      @click="onClickApply(index)"
                      :class="item.usageState ? 'button-cancel' : 'button-use'"
                      >{{ item.usageState ? "Cancel" : "Use" }}</van-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="My Settings" name="mySettings">
            <div class="my-setting" v-if="mySettingList.length > 0">
              <div class="my-setting-header">
                <img src="@/assets/icons/icon_create.png" />
                Create
              </div>
              <div class="my-setting-list">
                <div
                  class="my-setting-item"
                  v-for="(item, index) in mySettingList"
                  :key="index"
                >
                  <div class="my-setting-item-left">
                    <div class="item-left-title">
                      {{ item.text }}
                      <div
                        class="item-left-label"
                        v-for="(label, index1) in item.label"
                        :key="index1"
                      >
                        {{ label }}
                      </div>
                    </div>
                    <div class="item-left-msg">{{ item.used }} used</div>
                    <div class="item-left-msg">
                      {{ item.explain }}
                    </div>
                  </div>
                  <div class="my-setting-item-right">
                    <van-button
                      type="default"
                      @click="onClickApply(index)"
                      :class="item.usageState ? 'button-cancel' : 'button-use'"
                      >{{ item.usageState ? "Cancel" : "Use" }}</van-button
                    >
                  </div>
                </div>
              </div>
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
      filterList: [
        { text: "Omni hub", className: "" },
        { text: "Rosin", className: "" },
        { text: "Apple bomb", className: "" },
        { text: "Banana", className: "" }
      ],
      selectFilter: "",
      selectVoltage: [
        {
          title: "Wind Land"
        },
        {
          title: "Soul fly"
        },
        {
          title: "GOD BLESS"
        },
        {
          title: "Wind Land"
        },
        {
          title: "Wind Land Soul fly test test"
        }
      ],
      activeSetting: "recommended", //recommended or mySettings
      recommendedList: [
        {
          text: "Wind Land", //名称

          label: ["Omni hub"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: false //使用状态
        },
        {
          text: "Find you soul", //名称
          label: ["Rosin"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: true //使用状态
        },
        {
          text: "Soul fly", //名称
          label: ["Rosin", "Apple bomb"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: false //使用状态
        },
        {
          text: "Wind Land", //名称

          label: ["Omni hub"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: false //使用状态
        },
        {
          text: "Find you soul", //名称
          label: ["Rosin"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: true //使用状态
        },
        {
          text: "Soul fly", //名称
          label: ["Rosin", "Apple bomb"], //标签
          used: "19258", //使用人数
          explain: "Best Experience for rosin (Description)", //说明
          usageState: false //使用状态
        }
      ],
      mySettingList: []
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
    onClickDeleteMyVoltage(index) {
      this.selectVoltage.splice(index, 1);
    },
    onClickApply(index) {
      if (this.selectVoltage.length >= 5) {
        this.$toast({
          type: "fail",
          duration: "3000",
          position: "bottom",
          message: "Only five voltage curves can be selected at most."
        });
        return;
      }
      this.recommendedList[index].usageState = !this.recommendedList[index]
        .usageState;
    },
    onClickCreateMySetting() {},
    getContainer() {
      // 返回一个特定的 DOM 节点，作为挂载的父节点
      return document.querySelector(".recommended-header-filter");
    },
    onSelectFilter(item, index) {
      if (item) {
        if (item.text == this.selectFilter) {
          item.className = "";
          this.selectFilter = "";
          return;
        }
        this.filterList.forEach(element => {
          element.className = "";
        });
        item.className = "active-filter";
        this.selectFilter = item.text;
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
      min-height: 130px;
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

        .my-voltage-item {
          height: 35px;
          background: #f1edff;
          border-radius: 30px;
          font-size: 13px;
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
            width: 20px;
            height: 20px;
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

        /deep/ .van-tabs__content {
          height: calc(100% - 45px);
        }

        /deep/ .van-tab__pane {
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
        }

        .recommended-list,
        .my-setting-list {
          display: flex;
          flex-direction: column;
          overflow-y: auto;

          .recommended-item,
          .my-setting-item {
            height: 95px;
            min-height: 95px;
            margin-bottom: 16px;
            padding: 0 16px;
            border: 1px solid #eeeeee;
            border-radius: 10px;
            display: flex;

            .recommended-item-left,
            .my-setting-item-left {
              padding: 10px 0;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;

              .item-left-title {
                font-size: 16px;
                font-weight: 400;
                color: #555555;
                display: flex;
                align-items: center;

                .item-left-label {
                  font-size: 12px;
                  padding: 0 5px;
                  margin-left: 5px;
                  color: #6649c4;
                  border-radius: 5px;
                  border: 1px solid #755bca;
                }
              }

              .item-left-msg {
                font-size: 13px;
                font-weight: 400;
                color: #999999;
              }
            }

            .recommended-item-right,
            .my-setting-item-right {
              margin-left: auto;
              display: flex;
              align-items: center;

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
/deep/ .van-popover {
  .active-filter {
    color: #6649c4;
    background: #f1edff;
    border-radius: 8px;
  }
}
/deep/ .van-popover__action-text {
  justify-content: flex-start;
}
/deep/ .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
</style>
