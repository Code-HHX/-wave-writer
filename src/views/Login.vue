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
        v-model.trim="email"
        placeholder="Email"
        maxlength="30"
      />
      <input
        ref="email"
        class="pwd"
        type="password"
        v-model.trim="pwd"
        placeholder="Password"
        minlength="6"
        maxlength="20"
      />
      <div class="forgot" @click="onClickForgot">Forgot password?</div>
      <van-button
        class="button-login"
        type="default"
        @click="onClickLogin"
        v-waves
      >
        Log in
      </van-button>
      <div class="apply" @click="onClickApply">
        No account?&nbsp;<span>Apply&nbsp;></span>
      </div>
    </div>
    <!-- Tips提示 -->
    <van-popup
      class="tips-popup"
      v-model="showTips"
      round
      :style="{ width: '88%' }"
    >
      <div class="header">Tips</div>
      <div class="content">
        <div class="content-msg">{{ tipsMsg }}</div>
        <van-button
          type="default"
          class="content-button"
          @click="onClickTipsOK"
          v-waves
        >
          OK
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pwd: "",
      showTips: false,
      tipsMsg: ""
    };
  },
  created() {},
  mounted() {
    if (process.env.NODE_ENV === "dev") {
      this.email = "ikrusher";
      this.pwd = "123456";
    }
  },
  computed: {},
  watch: {
    showTips(value) {
      if (!value) this.tipsMsg = "";
    }
  },
  methods: {
    onClickForgot() {
      this.$router.push("ResetPassword");
    },
    onClickLogin() {
      if (this.$utils.isNullAndEmpty(this.email)) {
        this.tipsMsg = "E-mail cannot be empty.";
        this.showTips = true;
        return;
      }
      if (this.$utils.isNullAndEmpty(this.pwd)) {
        this.tipsMsg = "Password cannot be empty.";
        this.showTips = true;
        return;
      }
      // if (!this.$utils.isEmail(this.email)) {
      //   this.tipsMsg = "Please enter the correct E-mail.";
      //   this.showTips = true;
      //   return;
      // }
      if (this.pwd.length < 6) {
        this.tipsMsg = "Please enter the correct Password.";
        this.showTips = true;
        return;
      }

      this.$api.user
        .login({
          userName: this.email,
          password: this.pwd
        })
        .then(res => {
          if (res.code == 200) {
            this.$store.dispatch("login", res.data);
            setTimeout(() => {
              this.$router.replace("Home");
            }, 500);
          } else {
            this.tipsMsg = res.message;
            this.showTips = true;
          }
        })
        .catch(error => {});

      // this.$router.replace("Home");
    },
    onClickTipsOK() {
      this.showTips = false;
    },
    onClickApply() {
      this.$router.push("Register");
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

    .button-login {
      border-radius: 8px;
      border: none;
      background: #ffffff;
      color: #6649c4;
      font-size: 18px;
      font-weight: bold;
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

  .tips-popup {
    .header {
      font-size: 18px;
      font-weight: bold;
      color: #555555;
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;
    }

    .content {
      padding: 20px 23px 15px 23px;
      font-size: 18px;
      font-weight: 400;
      color: #555555;
      display: flex;
      flex-direction: column;
      align-items: center;

      .content-button {
        margin-top: 30px;
        background: #f1edff;
        width: 100%;
        border: none;
        border-radius: 8px;
        color: #6649c4;
      }
    }
  }
}
</style>
