import { requestPostForm } from "@/config/http-json";

const user = {
  async login(params) {
    let response = await requestPostForm("/user/doLogin", params);
    return response.data;
  }
};

export default user;
