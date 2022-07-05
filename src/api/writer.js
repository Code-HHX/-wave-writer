import { requestGet } from "../config/http-json";

const writer = {
  async curveModes() {
    let response = await requestGet("/curve/selectCustomFirmwareSettings");
    return response.data;
  }
};

export default writer;
