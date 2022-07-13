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
      Sign Up
    </div>
    <div class="content">
      <div class="register-msg">Complete your profiles</div>
      <div class="register-title">Your Email *</div>
      <input
        class="register-input"
        type="text"
        v-model.trim="newAccount.email"
        placeholder="Fairy spirit"
        maxlength="30"
      />
      <div class="register-title">Password *</div>
      <input
        class="register-input"
        type="password"
        v-model.trim="newAccount.password"
        placeholder="Enter login password"
        minlength="6"
        maxlength="20"
      />
      <div class="register-title">Name <span>(Optional)</span></div>
      <input
        class="register-input"
        type="text"
        v-model.trim="newAccount.name"
        placeholder="Enter you name"
        maxlength="30"
      />
      <div class="register-title">Company Name <span>(Optional)</span></div>
      <input
        class="register-input"
        type="text"
        v-model.trim="newAccount.companyName"
        placeholder="Enter your company name"
        maxlength="30"
      />
      <div class="register-title">Brand Name <span>(Optional)</span></div>
      <input
        class="register-input"
        type="text"
        v-model.trim="newAccount.brandName"
        placeholder="Enter the brand name"
        maxlength="30"
      />
      <div class="register-title">Phone Number <span>(Optional)</span></div>
      <input
        class="register-input"
        type="text"
        v-model.trim="newAccount.phoneNumber"
        placeholder="Your phone number"
        maxlength="30"
      />
      <van-button
        class="register-confirm"
        type="default"
        @click="onClickConfirm"
        v-waves
      >
        Confirm
      </van-button>
    </div>
    <!-- Success成功提示 -->
    <van-popup
      class="success-popup"
      v-model="showSuccessPopup"
      round
      :style="{ width: '88%' }"
      :close-on-click-overlay="false"
    >
      <div class="success-content">
        <div class="success-title">
          <img src="@/assets/icons/icon_register_success.png" />
          Successful application
        </div>
        <div class="success-msg">
          Your registration information has been submitted, please log in after
          your account verification is passed
        </div>
        <van-button
          type="default"
          class="success-button"
          @click="onClickOk"
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
  name: "Register",
  data() {
    return {
      newAccount: {
        brandName: "",
        companyName: "",
        email: "",
        name: "",
        password: "",
        phoneNumber: ""
      },
      showSuccessPopup: false
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
    onClickConfirm() {
      if (this.$utils.isNullAndEmpty(this.newAccount.email)) {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: "Please enter your E-mail."
        });
        return;
      }
      if (this.$utils.isNullAndEmpty(this.newAccount.password)) {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: "Please enter login password."
        });
        return;
      }
      if (this.newAccount.password.length < 6) {
        this.$toast({
          type: "fail",
          duration: "2000",
          position: "middle",
          message: "Login password length cannot be less than 6 digits"
        });
        return;
      }
      this.$api.user.registerBrandUser(this.newAccount).then(res => {
        if (res.code == 200) {
          this.showSuccessPopup = true;
        } else {
          this.$toast({
            type: "fail",
            duration: "2000",
            position: "middle",
            message: res.message
          });
        }
      });
    },
    onClickOk() {
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
    height: 100%;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;

    .register-msg {
      margin-top: 16px;
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 400;
      color: #555555;
    }

    .register-title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 400;
      color: #555555;
    }

    .register-input {
      color: #555555;
      background: transparent;
      margin-bottom: 16px;
      height: 45px;
      min-height: 45px;
      border-radius: 8px;
      border: 1px solid #dddddd;
    }

    .register-confirm {
      height: 45px;
      min-height: 45px;
      margin-top: 26px;
      width: 100%;
      background: #6649c4;
      border-radius: 8px;
      border: 1px solid #6649c4;
      font-size: 18px;
      font-weight: normal;
      color: #ffffff;
      margin-bottom: 50px;
    }

    input[type="text"]:focus {
      outline: none;
    }
    input[type="password"]:focus {
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
}
.success-popup {
  .success-content {
    padding: 50px 23px 30px 23px;
    font-size: 18px;
    font-weight: 400;
    color: #555555;
    display: flex;
    flex-direction: column;
    align-items: center;

    .success-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: #6d6e71;

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }

    .success-msg {
      margin-top: 16px;
      font-size: 18px;
      font-weight: normal;
      color: #808285;
      text-align: center;
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
