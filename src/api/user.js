import {
  requestGet,
  requestGetForm,
  requestPost,
  requestPostForm
} from "@/config/http-json";

const user = {
  async login(params = {}) {
    let response = await requestPostForm("/user/doLogin", params);
    return response;
  },
  async sendEmail(params = {}) {
    let response = await requestPostForm("/user/sendEmail", params);
    return response;
  },
  async verificationCode(params = {}) {
    let response = await requestGetForm("/user/verificationCode", params);
    return response;
  },
  async retrievePassword(params = {}) {
    let response = await requestPostForm("/user/retrievePassword", params);
    return response;
  },
  async registerBrandUser(params = {}) {
    let response = await requestPost("/user/registerBrandUser", params);
    return response;
  }
};

export default user;
