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
      History
    </div>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="No more data"
          loading-text="Loading more..."
          :error.sync="error"
          error-text="Load fail! Click reload"
          @load="onLoad"
        >
          <div
            class="history-item"
            v-for="(item, index) in historyList"
            :key="index"
          >
            <div class="history-header">
              <div class="header-title">Customize</div>
              <div class="header-time">{{ item.createTime }}</div>
            </div>
            <div class="item-split"></div>
            <div class="history-content">
              <div class="history-row">
                <div class="history-left-title">NFC Settings</div>
                <div class="history-right-value">
                  {{ item.isSupportNfc ? `ON` : `OFF` }}
                </div>
              </div>
              <div class="history-row">
                <div class="history-left-title">Preheat</div>
                <div class="history-right-value">
                  {{
                    item.isSupportPreheat
                      ? `${(item.preheatVoltage / 1000).toFixed(1)}v, ${(
                          item.preheatTime / 1000
                        ).toFixed(1)}s`
                      : `OFF`
                  }}
                </div>
              </div>
              <div class="history-row">
                <div class="history-left-title">Voltage Curve</div>
                <div class="history-right-value">
                  {{
                    item.diyVoltage
                      .map(item => `${(item / 1000).toFixed(1)}v`)
                      .join(", ")
                  }}
                </div>
              </div>
              <van-button
                class="history-button-apply"
                type="default"
                @click="onClickApply(item)"
                >Apply To homepage</van-button
              >
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import writer from "@/api/writer";
import log from "@/util/log";
import { WriterSetting } from "@/bluetooth/BluetoothData";

export default {
  name: "History",
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      historyList: [],
      pageNum: 1
    };
  },
  created() {},
  async mounted() {},
  computed: {},
  methods: {
    onClickHeaderReturn() {
      this.$router.go(-1);
    },
    onClickApply(item) {
      const setting = new WriterSetting();
      Object.assign(setting, item);
      setting.diyVoltage = [].concat(item.diyVoltage.map(item => item * -1));
      this.$router.replace({
        name: "Home",
        params: {
          setting
        }
      });
    },
    async onRefresh() {
      this.refreshing = true;
      this.onLoad();
    },
    async onLoad() {
      //如果是刷新
      if (this.refreshing) {
        this.pageNum = 1;
        this.historyList = [];
      }
      try {
        let response = await writer.curveHistory(this.pageNum);
        const history = response.data;
        const total = response.total;
        log(history);
        this.historyList = this.historyList.concat(
          history.map(item => {
            const setting = new WriterSetting();
            setting.id = item.id;
            setting.diyVoltage = item.heatingVoltage
              .split(",")
              .slice(0, 6)
              .map(item => parseInt(item));
            setting.isSupportNfc = item.nfcSettings === 1;
            setting.isSupportPreheat = item.preheatSetting === 1;
            setting.modeName = item.modeName;
            setting.preheatTime = item.preheatTime;
            setting.preheatVoltage = item.preheatVoltage;
            setting.createTime = item.createTime;
            return setting;
          })
        );

        //刷新结束
        if (this.refreshing) {
          this.refreshing = false;
        } else {
          this.loading = false;
        }
        if (this.historyList.length >= total) {
          this.finished = true;
        }
        this.pageNum += 1;
      }catch (e) {
        this.loading = false;
        this.error = true;
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
  }

  .content {
    height: 100%;
    padding: 0 16px;
    overflow-y: auto;

    .history-item:last-child {
      margin-bottom: 16px;
    }

    .history-item {
      margin-top: 16px;
      background: #ffffff;
      border-radius: 10px;

      .history-header {
        display: flex;
        align-items: center;
        padding: 16px 16px;

        .header-title {
          font-size: 16px;
          font-weight: bold;
          color: #555555;
        }

        .header-time {
          font-size: 16px;
          font-weight: 400;
          color: #999999;
          margin-left: auto;
        }
      }

      .history-content {
        display: flex;
        flex-direction: column;
        padding: 0 16px;

        .history-row {
          display: flex;
          align-items: center;
          margin-top: 16px;

          .history-left-title {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
          }

          .history-right-value {
            font-size: 14px;
            font-weight: 400;
            color: #555555;
            margin-left: auto;
          }
        }

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
    }
  }
}
</style>
