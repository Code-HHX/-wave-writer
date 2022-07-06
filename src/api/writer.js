import { requestGet, requestPost } from "../config/http-json";

const writer = {
  //首页:查询自定义的固件设置
  async selectCustomFirmwareSettings() {
    let response = await requestGet("/curve/selectCustomFirmwareSettings");
    return response.data;
  },
  //查询TemperatureSetting中的Recommended列表
  async selectRecommendSettingsDetails(params = {}) {
    let response = await requestGet(
      "/curve/selectRecommendSettingsDetails",
      params
    );
    return response.data;
  },
  //查询TemperatureSetting中的My Settings列表
  async selectMySettingsDetails(params = {}) {
    let response = await requestGet("/curve/selectMySettingsDetails", params);
    return response.data;
  }
};

export default writer;
