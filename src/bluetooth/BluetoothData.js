import log from "@/util/log";
export class SyncData {
  year = 0;
  month = 0;
  day = 0;
  timeSlot = {};

  static create(dataView) {
    const syncData = new SyncData();

    syncData.year = dataView.getUint16(0, true);
    syncData.month = dataView.getUint8(2);
    syncData.day = dataView.getUint8(3);
    for (let i = 0; i < 24; i++) {
      syncData.timeSlot[i] = dataView.getUint16(4 + i * 2, true);
    }
    return syncData;
  }
}

export class DiyTemperatureAndTime {
  diyTime = 6;
  secondTemperature = [];

  constructor(dataView) {
    if (dataView instanceof DataView) {
      if (dataView.byteLength === 21) {
        for (let i = 0; i < 10; i++) {
          this.secondTemperature.push({
            x: i + 1,
            y: new DataView(dataView.buffer.slice(i * 2, i * 2 + 2)).getUint16(
              0,
              true
            )
          });
        }
        this.diyTime = dataView.getUint8(20);
      }
    }
  }

  generateCommand() {
    const dataView = new DataView(Buffer.alloc(21).buffer);

    for (let i = 0; i < 10; i++) {
      if (i <= this.secondTemperature.length) {
        dataView.setUint16(i * 2, this.secondTemperature[i], true);
      }
    }
    dataView.setUint8(20, this.diyTime);
    return dataView;
  }
}

export class PreheatTemperatureAndTime {
  preheatTemperature = 0;
  preheatSecond = 0;

  constructor(dataView) {
    if (dataView instanceof DataView) {
      if (dataView.byteLength === 3) {
        this.preheatTemperature = dataView.getUint16(0, true);
        this.preheatSecond = dataView.getUint8(2);
      }
    }
  }

  generateCommand() {
    const dataView = new DataView(Buffer.alloc(3).buffer);
    dataView.setUint16(0, this.preheatTemperature, true);
    dataView.setUint8(2, this.preheatSecond);
    return dataView;
  }
}

export class WriterSetting {
  isSupportNfc = false; //nfc开关  是正的，1是打开，0是关闭，默认关闭  u8类型
  isSupportPreheat = false; //预热开关  是正的，1是打开，0是关闭，默认关闭 u8类型
  preheatVoltage = 1800; //默认默认1.8V u16类型 1.8 * 1000
  preheatCount = 3; //默认3 u8类型
  preheatTime = 3000; //默认3秒   u16类型  3 * 1000
  isSupportLight = false; //是反的，0是亮，1是灭，默认关闭，  u8类型
  diyVoltage = [-100, -100, -100, -100, -100, -100]; //10个范围0-4200,0V-4.2V,无默认值 u16 * 10
  micSensitivity = 60; //默认60  u8类型
  touchSensitivity = 100; //默认100  u8类型
  writeLimit = 0; // allcnt 限制烧录多少个设备  u16类型
  versionFeature; //功能特性 1,2,3,4,5 ，5为全功能   u8类型

  constructor(dataView) {
    if (dataView instanceof DataView) {
      if (dataView.byteLength === 33) {
        this.isSupportNfc = dataView.getUint8(0) === 1;
        this.isSupportPreheat = dataView.getUint8(1) === 1;
        this.preheatVoltage = dataView.getUint16(2, true);
        this.preheatCount = dataView.getUint8(4);
        this.preheatTime = dataView.getUint16(5, true);
        this.isSupportLight = dataView.getUint8(7) === 0;
        this.diyVoltage = [];
        for (let i = 0; i < 10; i++) {
          this.diyVoltage.push(dataView.getUint16(8 + i * 2, true));
        }
        this.micSensitivity = dataView.getUint8(28);
        this.touchSensitivity = dataView.getUint8(29);
        this.writeLimit = dataView.getUint16(30, true);
        this.versionFeature = dataView.getUint8(32);
      }
    } else if (dataView instanceof WriterSetting) {
      this.isSupportNfc = dataView.isSupportNfc;
      this.isSupportPreheat = dataView.isSupportPreheat;
      this.preheatVoltage = dataView.preheatVoltage;
      this.preheatCount = dataView.preheatCount;
      this.preheatTime = dataView.preheatTime;
      this.isSupportLight = dataView.isSupportLight;
      this.diyVoltage = [];
      for (let i = 0; i < 10; i++) {
        this.diyVoltage.push(dataView.diyVoltage[i]);
      }
      this.micSensitivity = dataView.micSensitivity;
      this.touchSensitivity = dataView.touchSensitivity;
      this.writeLimit = dataView.writeLimit;
      this.versionFeature = dataView.versionFeature;
    }
  }

  toString() {
    log(`nfc开关 = ${this.isSupportNfc ? "打开" : "关闭"}`);
    log(`预热开关 = ${this.isSupportPreheat ? "打开" : "关闭"}`);
    log(`预热电压 = ${this.preheatVoltage}`);
    log(`预热次数 = ${this.preheatCount}`);
    log(`预热时间 = ${this.preheatTime}`);
    log(`闪灯开关 = ${this.isSupportLight ? "关闭" : "打开"}`);
    log(`diy电压 = ${this.diyVoltage}`);
    log(`mic灵敏度 = ${this.micSensitivity}`);
    log(`触摸灵敏度 = ${this.touchSensitivity}`);
    log(`烧录设备限制数量 = ${this.writeLimit}`);
    log(`版本功能特性 = ${this.versionFeature}`);
  }

  generateCommand() {
    const dataView = new DataView(Buffer.alloc(33).buffer);
    dataView.setUint8(0, this.isSupportNfc ? 1 : 0);
    dataView.setUint8(1, this.isSupportPreheat ? 1 : 0);
    dataView.setUint16(2, this.preheatVoltage, true);
    dataView.setUint8(4, this.preheatCount);
    dataView.setUint16(5, this.preheatTime, true);
    dataView.setUint8(7, this.isSupportLight ? 0 : 1);
    this.diyVoltage.forEach((item, index) => {
      dataView.setUint16(8 + index * 2, item, true);
    });

    dataView.setUint8(28, this.micSensitivity);
    dataView.setUint8(29, this.touchSensitivity);
    dataView.setUint16(30, this.writeLimit, true);
    dataView.setUint8(32, this.versionFeature);
    return dataView;
  }
}
export class DeviceId {
  type = 0;
  productNumber = 0;
  atomizedType = 0;
  productCustomType = 0;
  atomizedR = 0;
  productWeek = 0;
  productYear = 0;
  productManufacture = 0;
  deviceNumber = 0;
  deviceNumberHex = "";
  constructor(dataView) {
    if (dataView instanceof DataView) {
      if (dataView.byteLength === 12) {
        this.type = dataView.getUint8(0);
        this.productNumber = dataView.getUint8(1);
        this.atomizedType = dataView.getUint8(2);
        this.productCustomType = dataView.getUint8(3);
        this.atomizedR = dataView.getUint8(4);
        this.productWeek = dataView.getUint8(5);
        this.productYear = dataView.getUint8(6);
        this.productManufacture = dataView.getUint8(7);
        this.deviceNumber = dataView.getUint32(8, false);

        let deviceNumberHex = [];
        for (var i = 0; i < 4; i++) {
          let hex = dataView.getUint8(8 + i).toString(16);
          if (hex.length === 1) {
            hex = `0${hex}`;
          }
          deviceNumberHex.push(hex);
        }
        this.deviceNumberHex = deviceNumberHex.join(":").toUpperCase();
      }
    }
  }

  toString() {
    log(`烟杠类型 = ${this.type.toString(16)}`);
    log(`产品编号 = ${this.productNumber.toString(16)}`);
    log(`发热丝类型 = ${this.atomizedType.toString(16)}`);
    log(`产品次级型 = ${this.productCustomType.toString(16)}`);
    log(`发热丝阻值 = ${this.atomizedR.toString(16)}`);
    log(`生产周数 = ${this.productWeek.toString(16)}`);
    log(`年 = ${this.productYear.toString(16)}`);
    log(`厂家 = ${this.productManufacture.toString(16)}`);
    log(`设备编号 = ${this.deviceNumber.toString(16)}`);
  }

  toString2() {
    return `烟杠类型 = ${this.type.toString(
      16
    )}<br>产品编号 = ${this.productNumber.toString(16)}<br>
    发热丝类型 = ${this.atomizedType.toString(16)}<br>
    产品次级型 = ${this.productCustomType.toString(16)}<br>
    发热丝阻值 = ${this.atomizedR.toString(16)} <br>
    生产周数 = ${this.productWeek.toString(16)} <br>
    年 = ${this.productYear.toString(16)} <br>
    厂家 = ${this.productManufacture.toString(16)} <br>
    设备编号 = ${this.deviceNumber} <br>
    `;
  }
}
export class LocalCurve {
  diyName = "";
  diyVoltage = [2100, 2100, 2100, 2100, 2100, 2100, 2100, 2100];
  constructor(diyName) {
    this.diyName = diyName;
  }
}

