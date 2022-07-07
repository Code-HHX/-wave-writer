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
      Reset Password
    </div>
    <div class="content">
      <div class="step" v-if="step == 1">
        <img src="@/assets/icons/icon_email.png" />
        <div class="title">Enter email</div>
        <div class="msg">Please enter your registered email address</div>
        <input
          ref="email"
          class="input-email"
          type="text"
          v-model="email"
          placeholder="Email address"
          maxlength="30"
        />
        <van-button
          class="button-confirm"
          type="default"
          @click="onClickConfirm"
          :style="time > 0 ? 'background:#A7A9AC;' : ''"
          :disabled="time > 0 ? true : false"
        >
          Confirm
          <div v-show="time > 0">&nbsp;({{ time }}s)</div>
        </van-button>
      </div>
      <div class="step" v-else-if="step == 2">
        <img src="@/assets/icons/icon_email2.png" />
        <div class="title">Verification code</div>
        <div class="msg">
          We have sent an email with a verification code to your mailbox. Please
          enter the verification code you received. The verification code is
          valid for 30 minutes.
        </div>
        <!-- 验证码输入框 -->
        <van-password-input
          :gutter="10"
          :mask="false"
          :value="verificationCode"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="verificationCode"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
      <div class="step" v-else-if="step == 3">
        <img src="@/assets/icons/icon_password.png" />
        <div class="title">Reset password</div>
        <div class="msg">
          Please reset your login password. After the setting is successful, the
          original password will be invalid. Please use the new password to log
          in to the APP
        </div>
        <input
          ref="new-pwd"
          class="input-email"
          type="password"
          v-model="pwd"
          placeholder="New password"
          maxlength="30"
        />
        <input
          ref="confirm-pwd"
          class="input-email"
          type="password"
          v-model="confirmPwd"
          placeholder="Confirm password"
          maxlength="30"
        />
        <van-button class="button-confirm" type="default" @click="onClickReset">
          Reset
        </van-button>
      </div>
    </div>
    <!-- Tips提示 -->
    <van-popup
      class="tips-popup"
      v-model="showTips"
      round
      :style="{ width: '88%' }"
    >
      <div class="tips-header">Tips</div>
      <div class="tips-content">
        <div class="tips-content-msg">{{ tipsMsg }}</div>
        <van-button
          type="default"
          class="tips-button"
          @click="onClickTipsOK"
          v-waves
        >
          OK
        </van-button>
      </div>
    </van-popup>
    <!-- Success成功提示 -->
    <van-popup
      class="success-popup"
      v-model="showSuccessPopup"
      round
      :style="{ width: '88%' }"
      :close-on-click-overlay="false"
    >
      <div class="success-content">
        <img src="@/assets/icons/icon_success.png" />
        <div class="success-title">Password has been reset</div>
        <div class="success-msg">Please log in with new password</div>
        <van-button
          type="default"
          class="success-button"
          @click="onClickLogin"
          v-waves
        >
          Log in
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      step: 1,
      email: "807288057@qq.com",
      time: 0,
      showTips: false,
      tipsMsg: "",
      verificationCode: "",
      showKeyboard: true,
      pwd: "",
      confirmPwd: "",
      showSuccessPopup: false
    };
  },
  created() {},
  mounted() {},
  watch: {
    verificationCode(value) {
      if (value.length >= 6) {
        this.step++;
      }
    }
  },
  computed: {},
  methods: {
    onClickHeaderReturn() {
      if (this.step == 3) {
        this.pwd = "";
        this.confirmPwd = "";
        this.verificationCode = "";
        this.step = 1;
        return;
      } else if (this.step == 2) {
        this.verificationCode = "";
        this.step = 1;
        return;
      } else if (this.step == 1) {
        this.$router.go(-1);
        return;
      }
    },
    onClickConfirm() {
      if (this.$utils.isNullAndEmpty(this.email)) {
        this.tipsMsg = "E-mail cannot be empty.";
        this.showTips = true;
        return;
      }
      if (!this.$utils.isEmail(this.email)) {
        this.tipsMsg = "Please enter the correct E-mail.";
        this.showTips = true;
        return;
      }
      this.$toast({
        type: "success",
        duration: "1000",
        position: "middle",
        message: "send success."
      });
      this.time = 60;
      this.countDown();
      this.step++;
    },
    countDown() {
      this.time = 60;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    onClickReset() {
      this.showSuccessPopup = true;
    },
    onClickTipsOK() {
      this.showTips = false;
    },
    onClickLogin() {
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
    padding: 0 25px;

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 130px;
        height: 130px;
        margin-top: 40px;
      }

      .title {
        margin-top: 20px;
        font-size: 22px;
        font-weight: bold;
        color: #555555;
      }

      .msg {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
        color: #555555;
        line-height: 25px;
        text-align: center;
        margin-bottom: 50px;
      }

      .input-email {
        color: #555555;
        margin-bottom: 16px;
        background: #f8f6ff;
        border-radius: 8px;
        border: 1px solid #6649c4;
      }

      .button-confirm {
        width: 100%;
        height: 45px;
        background: #6649c4;
        border-radius: 8px;
        border: 1px solid #6649c4;
        font-size: 18px;
        font-weight: normal;
        color: #ffffff;

        /deep/ .van-button__text {
          display: flex;
        }
      }

      /deep/ .van-password-input__item {
        width: 45px;
        height: 45px;
        border-radius: 8px;
        border: 1px solid #6649c4;
      }
    }
  }
}
.tips-popup {
  .tips-header {
    font-size: 18px;
    font-weight: bold;
    color: #555555;
    padding: 15px 0;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
  }

  .tips-content {
    padding: 20px 23px 15px 23px;
    font-size: 18px;
    font-weight: 400;
    color: #555555;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tips-button {
      margin-top: 30px;
      background: #f1edff;
      width: 100%;
      border: none;
      border-radius: 8px;
      color: #6649c4;
    }
  }
}

.success-popup {
  .success-content {
    padding: 50px 23px 15px 23px;
    font-size: 18px;
    font-weight: 400;
    color: #555555;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 110px;
      height: 110px;
    }

    .success-title {
      margin-top: 30px;
      font-size: 18px;
      font-weight: bold;
      color: #6d6e71;
    }

    .success-msg {
      margin-top: 10px;
      font-size: 18px;
      font-weight: 400;
      color: #808285;
    }

    .success-button {
      margin-top: 50px;
      background: #6649c4;
      width: 100%;
      border: 1px solid #6649c4;
      border-radius: 8px;
      color: #ffffff;
    }
  }
}
</style>
