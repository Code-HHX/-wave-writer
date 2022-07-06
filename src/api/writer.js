import { requestGet, requestGetForm, requestPost } from "../config/http-json";

const writer = {
  async selectCustomFirmwareSettings() {
    let response = await requestGetForm("/curve/selectCustomFirmwareSettings");
    return response.data;
  },
  async selectRecommendSettingsDetails(params = {}) {
    let response = await requestGetForm(
      "/curve/selectRecommendSettingsDetails",
      params
    );
    return response.data;
  },
  async selectMySettingsDetails(params = {}) {
    let response = await requestGetForm(
      "/curve/selectMySettingsDetails",
      params
    );
    return response.data;
  },
  async uploadConfig(
    modeId,
    modeName,
    deviceIdentification,
    macAddress,
    firmwareVersion,
    softwareVersion,
    writeSetting
  ) {
    let params = {
      deviceIdentification: deviceIdentification,
      deviceNumber: macAddress,
      firmwareVersion: firmwareVersion,
      softwareVersion: softwareVersion,
      nameIdentification: "HB",
      useVersion: 1,
      modeId,
      modeName,
      nfcSettings: writeSetting.isSupportNfc ? 1 : 0,
      preheatSetting: writeSetting.isSupportPreheat ? 1 : 0,
      preheatVoltage: writeSetting.preheatVoltage,
      preheatTouches: writeSetting.preheatCount,
      preheatTime: writeSetting.preheatTime,
      touchLight: writeSetting.isSupportLight ? 1 : 0,
      heatingVoltage: writeSetting.diyVoltage
        .map(item => Math.abs(item))
        .join(","),
      microphoneSensitivity: writeSetting.micSensitivity,
      touchSensitivity: writeSetting.touchSensitivity
    };
    let response = await requestPost("/curve/uploadFirmwareSetting", params);
    return response;
  },
  async curveHistory(pageNum) {
    let response = await requestGetForm(
      "/curve/selectUploadHistory",
      { pageNum, pageSize: 10 },
      { showLoading: false }
    );
    return response.data;
  }
};

export default writer;
