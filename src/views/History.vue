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
      <div
        class="history-item"
        v-for="(item, index) in historyList"
        :key="index"
      >
        <div class="history-header">
          <div class="header-title">Customize</div>
          <div class="header-time">{{ item.time }}</div>
        </div>
        <div class="item-split"></div>
        <div class="history-content">
          <div class="history-row">
            <div class="history-left-title">NFC Settings</div>
            <div class="history-right-value">{{ item.nfc }}</div>
          </div>
          <div class="history-row">
            <div class="history-left-title">Preheat</div>
            <div class="history-right-value">
              {{ item.preheat }}
            </div>
          </div>
          <div class="history-row">
            <div class="history-left-title">Voltage Curve</div>
            <div class="history-right-value">
              {{ item.voltage }}
            </div>
          </div>
          <van-button
            class="history-button-apply"
            type="default"
            @click="onClickApply"
            >Apply To homepage</van-button
          >
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      historyList: [
        {
          time: "May 28th,2022 14:30",
          nfc: "ON",
          preheat: "4.5v,10s",
          voltage: "2.3v,2.3v,2.3v,2.3v,2.3v"
        },
        {
          time: "May 28th,2022 14:30",
          nfc: "ON",
          preheat: "4.5v,10s",
          voltage: "2.3v,2.3v,2.3v,2.3v,2.3v"
        },
        {
          time: "May 28th,2022 14:30",
          nfc: "ON",
          preheat: "4.5v,10s",
          voltage: "2.3v,2.3v,2.3v,2.3v,2.3v"
        },
        {
          time: "May 28th,2022 14:30",
          nfc: "ON",
          preheat: "4.5v,10s",
          voltage: "2.3v,2.3v,2.3v,2.3v,2.3v"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onClickHeaderReturn() {
      this.$router.go(-1);
    },
    onClickApply() {
      this.$router.go(-1);
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
