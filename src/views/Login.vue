<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/logo/logo_wave_writer.png" />
    </div>
    <div class="content">
      <input
        ref="email"
        class="email"
        type="text"
        v-model="email"
        placeholder="Email"
      />
      <input
        ref="email"
        class="pwd"
        type="password"
        v-model="pwd"
        placeholder="Password"
      />
      <div class="forgot">Forgot password?</div>
      <button class="button-login" @click="onClickLogin" v-waves>
        Log in
      </button>
      <div class="apply">No account?&nbsp;<span>Apply&nbsp;></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pwd: ""
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onClickLogin() {
      this.$router.replace("Home");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background: #6649c4;
  position: relative;
  overflow: hidden;

  .header {
    text-align: center;

    img {
      margin: 150px 0 150px 0;
      width: 272px;
    }
  }

  .content {
    padding: 0 25px;
    display: flex;
    flex-direction: column;

    .pwd {
      margin: 15px 0;
    }

    .forgot {
      font-size: 18px;
      font-weight: normal;
      color: #d6cdf2;
      margin-left: auto;
      margin-bottom: 100px;
    }

    .apply {
      display: flex;
      margin-top: 15px;
      margin-left: auto;
      font-size: 18px;
      font-weight: normal;
      color: #d6cdf2;

      span {
        color: #ffffff;
      }
    }
  }
}
</style>
