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
    <div class="content"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onClickHeaderReturn() {
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

  .header {
    background: #6649c4;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
    padding: 16px 0 16px 0;

    .header-return {
      position: absolute;
      left: 10px;
    }
  }
}
</style>
