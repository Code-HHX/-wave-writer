import store from "@/store";
import log from "@/util/log";

import StoreType, {
  RECEIVED_ENTER_DIY_TEMPERATURE_CURVE,
  RECEIVED_EXIT_DIY_TEMPERATURE_CURVE
} from "@/bluetooth/store/StoreType";

import router from "@/router";
import { DeviceId, WriterSetting } from "./BluetoothData";
import {
  BLUETOOTH_MODULE_NAME,
  STATE_CURRENT_HUB_SETTING
} from "./store/StoreType";

//设备写服务与Characteristic
const DEVICE_READ_SERVICE_UUID = "0000180a-0000-1000-8000-00805f9b34fb"; //读取服务

//设备读服务与Characteristic
const DEVICE_WRITE_SERVER_UUID = "0000180d-0000-1000-8000-00805f9b34fb"; //可读可写服务
const NOTIFY_CHARACTERISTIC_UUID = "00001680-0000-1000-8000-00805f9b34fb"; //Notify(监听)
//电池服务
const BATTERY_SERVICE_UUID = "0000180f-0000-1000-8000-00805f9b34fb"; //电池服务
const BATTERY_CHARACTERISTIC_UUID = "00002a19-0000-1000-8000-00805f9b34fb"; //电池   Characteristic

const READ_CHARACTERISTIC_UUID = "00001681-0000-1000-8000-00805f9b34fb";
const SAVE_CHARACTERISTIC_UUID = "00001682-0000-1000-8000-00805f9b34fb";
//预热类型
export const PREHEAT_TYPE_ENTER = 1;
export const PREHEAT_TYPE_ENTER_START = 2;
export const PREHEAT_TYPE_STOP = 3;
export const PREHEAT_TYPE_STOP_NO_EXIT = 4;

//预热状态
const ENTER_PREHEAT = 1;
const EXIT_PREHEAT = 2;
const START_PREHEAT = 3;
const END_PREHEAT = 4;

export const PREHEAT_STATUS = {
  ENTER_PREHEAT,
  EXIT_PREHEAT,
  START_PREHEAT,
  END_PREHEAT
};

//烟弹类型
export const INGREDIRENT_TYPE_NICOTINE = 1;
export const INGREDIRENT_TYPE_THC = 2;
export const INGREDIRENT_TYPE_CBD = 3;
export const INGREDIRENT_TYPE_WAX = 4;
export const INGREDIRENT_TYPE_SUPPLEMENT = 5;
export const INGREDIRENT_TYPE_DELTA_8 = 6;

//设备类型
export const DEVICE_TYPE_MODEL_S = 48185;
export const DEVICE_TYPE_MODEL_X = 48186;
export const DEVICE_TYPE_MODEL_E = 48187;

//品牌类型
const BRAND_UNICODE = 2;
const BRAND_DIME = 3;
const BRAND_ANGEL = 4;

/****************************************************************************************************************/
//新版协议的常量
const COMMAND_BATCH_ID = 0x01;
const COMMAND_POD_ID = 0x02;
const COMMAND_OIL = 0x03;
const COMMAND_BRAND = 0x04;
const COMMAND_CAPACITY = 0x05;
const COMMAND_FLAVOR = 0x06;
const COMMAND_MANUFACTURE = 0x07;
const COMMAND_COUNTRY = 0x08;
const COMMAND_CITY = 0x09;
const COMMAND_MAX_SECOND = 0x0a;
const COMMAND_THICKNESS = 0x0b;
const COMMAND_CARTRIDGE_FLAG = 0x0c;
const COMMAND_OIL_CONTENT = 0x0d;
const COMMAND_ATOMIZING_WIRE = 0x20;
const COMMAND_VOLTAGE = 0x21;
const COMMAND_RESISTANCE = 0x22;
const COMMAND_CONSTANT_TEMPERATURE = 0x23;
const COMMAND_HEATING_FACTOR = 0x24;

const COMMAND_PREHEAT_AND_TIME = 0x40;
const COMMAND_PREHEAT_NAME = 0x41;
const COMMAND_DIY_TEMPERATURE_AND_TIME = 0x42;
const COMMAND_DIY_TEMPERATURE_NAME = 0x43;
const COMMAND_WRITER_PARAMS = 0x45;
const COMMAND_DEVICE_ID_PARAMS = 0x46;
const COMMAND_HUB_PARAMS = 0x47;

const COMMAND_CARTRIDGE_TOTAL_COUNT = 0x50;
const COMMAND_CARTRIDGE_TOTAL_SECOND = 0x51;
const COMMAND_CARTRIDGE_USAGE_SECOND = 0x52;
const COMMAND_CARTRIDGE_TODAY_SECOND = 0x53;
const COMMAND_CARTRIDGE_REAL_TEMPERATURE = 0x54;
const COMMAND_CARTRIDGE_STATUS = 0x55;
const COMMAND_CARTRIDGE_SYNC_TIME = 0x56;
const COMMAND_CARTRIDGE_ACTIVE_TIME = 0x57;
const COMMAND_CARTRIDGE_PRODUCT_TIME = 0x58;
const COMMAND_CARTRIDGE_CLEAR_PUFF_TIME = 0x59;
const COMMAND_CARTRIDGE_TODAY_PUFF = 0x5a;

const COMMAND_DEVICE_HW_VERSION = 0x60;
const COMMAND_DEVICE_BT_VERSION = 0x61;
const COMMAND_DEVICE_IS_INSERT_CARTRIDGE = 0x62;
const COMMAND_DEVICE_IS_NEED_SYNC = 0x63;
const COMMAND_DEVICE_IS_CACHE_COA = 0x64;
const COMMAND_DEVICE_IS_OUTPUT_MODE = 0x65;
const COMMAND_DEVICE_IS_LOCK = 0x66;
const COMMAND_DEVICE_IS_BIND = 0x67;
const COMMAND_DEVICE_LOCK_EXPIRED_TIME = 0x68;
const COMMAND_DEVICE_BATTERY = 0x69;
const COMMAND_DEVICE_MAC_ADDRESS = 0x6a;
const COMMAND_DEVICE_ENCRYPT_TYPE = 0x6b;
const COMMAND_DEVICE_SYNC_TIME = 0x6c;
const COMMAND_DEVICE_USER_ID_FLAG = 0x6d;

const COMMAND_CACHE_DATA_NUMBER = 0x90;
const COMMAND_CACHE_DATA_CONTENT = 0x91;

const COMMAND_INGREDIENT_NAME = 0x30;
const COMMAND_INGREDIENT_PROPORTION = 0x31;
const COMMAND_SOLVENT_NAME = 0x32;
const COMMAND_SOLVENT_PROPORTION = 0x33;
const COMMAND_REPORT_COS_NUMBER = 0x34;

const COMMAND_LOCK_DEVICE = 0xe1;
const COMMAND_UNLOCK_DEVICE = 0xe2;
const COMMAND_SYNC_OFFLINE_DATA = 0xe3;
const COMMAND_SYNC_TIME = 0xe4;
const COMMAND_SYNC_COA_ATA = 0xe5;
const COMMAND_QUERY_OFFLINE_CARTRIDGE_INFO = 0xe6;

const COMMAND_DIY_MODE = 0xf1;
const COMMAND_PREHEAT_MODE = 0xf2;
const COMMAND_NORMAL_MODE = 0xf3;
const COMMAND_REVERSE1 = 0xf4;
const COMMAND_REVERSE2 = 0xf5;
const COMMAND_PREHEAT_STATUS = 0xf6;
const COMMAND_PREHEAT_PARAM_CHANGED = 0xf7;
const COMMAND_REVERSE3 = 0xf8;
const COMMAND_DIY_PARAM_CHANGE = 0xf9;

const COMMAND_WRITER_SETTING_DATA = 0xc1;
const COMMAND_WRITER_PREPARE_DATA = 0xc2;

class PreheatTemperatureAndTime {
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

class DiyTemperatureAndTime {
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

class SyncData {
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

class QueryCommand {
  _queryCommand = [];

  addCommand(commandType) {
    this._queryCommand.push(commandType);
  }

  generateCommand() {
    if (this._queryCommand.length === 0) {
      return new DataView(Buffer.from(this._queryCommand));
    }
    //总数据长度 =  aa cc 总数据长度 编码长度 各个编码 校验帧（FF） 结束帧（FAAF）
    const size = 2 + 1 + 1 + this._queryCommand.length + 1 + 2;
    const buffer = Buffer.alloc(size);

    let i = 0;
    buffer[i++] = 0xaa;
    buffer[i++] = 0xcc;
    buffer[i++] = size;
    buffer[i++] = this._queryCommand.length;
    this._queryCommand.forEach(item => {
      buffer[i++] = item;
    });

    let checkSum = 0;
    buffer.forEach((item, index) => {
      checkSum += buffer[index];
    });

    buffer[i++] = checkSum;
    buffer[i++] = 0xfa;
    buffer[i++] = 0xaf;

    let sendData = [];
    buffer.map((item, index) => {
      sendData.push(item.toString(16));
    });
    log(`发送的数据 ${sendData.join(",")}`);

    return new DataView(buffer.buffer);
  }
}

class ControlCommand {
  constructor(controlType) {
    this._controlType = controlType;
  }

  _sendCommand = []; //待发送的命令
  _encodeNumberCommands = []; //编码命令集
  //总数据长度 =  aa dd 总数据长度 控制指令 控制的编码数量 数据域 校验帧（FF） 结束帧（FAAF）
  _controlPackageSize = 2 + 1 + 1 + 1 + 2;
  _controlType = 0;

  static createCommand(controlType) {
    const controlCommand = new ControlCommand(controlType);
    return controlCommand;
  }

  //控制指令(开关类型)
  addSwitchCommand(isEnable) {
    ++this._controlPackageSize;
    this._sendCommand.push(isEnable ? 1 : 0);
    return this;
  }

  addCustomCommand(data) {
    ++this._controlPackageSize;
    this._sendCommand.push(data);
    return this;
  }

  addEncodeCommand(encode, data) {
    this._encodeNumberCommands.push({ encode, data });
    this._controlPackageSize += data.byteLength + 2;

    for (let i = 0; i < data.byteLength; i++) {
      this._sendCommand.push(data.getUint8(i));
    }
    return this;
  }

  generateCommand() {
    if (!(this._encodeNumberCommands.length === 0)) {
      this._controlPackageSize += 1;
    }

    let i = 0;
    const buffer = Buffer.alloc(this._controlPackageSize);
    buffer[i++] = 0xaa;
    buffer[i++] = 0xdd;
    buffer[i++] = this._controlPackageSize;
    buffer[i++] = this._controlType;
    if (!(this._encodeNumberCommands.length === 0)) {
      buffer[i++] = this._encodeNumberCommands.length;
    }

    this._encodeNumberCommands.forEach(item => {
      buffer[i++] = item.encode;
      buffer[i++] = item.data.byteLength;
    });

    this._sendCommand.forEach(item => {
      buffer[i++] = item;
    });

    let checkSum = 0;
    for (let j = 0; j < buffer.byteLength; j++) {
      checkSum += buffer[j];
    }

    buffer[i++] = checkSum;
    buffer[i++] = 0xfa;
    buffer[i++] = 0xaf;

    let syncDataHex = [];

    for (let j = 0; j < buffer.byteLength; j++) {
      syncDataHex.push(buffer[j].toString(16));
    }
    log(`发送的离线查询数据 ${syncDataHex.join(",")}`);
    return new DataView(buffer.buffer);
  }
}

class SaveCommand {
  _sendCommands = []; //待发送的命令
  _encodeNumberCommands = []; //编码命令集
  //总数据长度 =  aa dd 总数据长度 控制的编码数量 数据域 校验帧（FF） 结束帧（FAAF）
  _controlPackageSize = 2 + 1 + 1 + 2;

  static createCommand() {
    return new SaveCommand();
  }

  addEncodeCommand(encode, dataView) {
    this._encodeNumberCommands.push({ encode, data: dataView });
    this._controlPackageSize += dataView.byteLength + 2;
    this._sendCommands.push(dataView);
    return this;
  }

  generateCommand() {
    if (!(this._encodeNumberCommands.length === 0)) {
      this._controlPackageSize += 1;
    }

    let i = 0;
    const buffer = Buffer.alloc(this._controlPackageSize);
    buffer[i++] = 0xaa;
    buffer[i++] = 0xbb;
    buffer[i++] = this._controlPackageSize;

    if (!(this._encodeNumberCommands.byteLength === 0)) {
      buffer[i++] = this._encodeNumberCommands.length;
    }

    this._encodeNumberCommands.forEach(item => {
      buffer[i++] = item.encode;
      buffer[i++] = item.data.byteLength;
    });

    this._sendCommands.forEach(item => {
      for (let j = 0; j < item.byteLength; j++) {
        buffer[i++] = item.getUint8(j);
      }
    });

    let checkSum = 0;
    for (let j = 0; j < buffer.byteLength; j++) {
      checkSum += buffer[j];
    }

    buffer[i++] = checkSum;
    buffer[i++] = 0xfa;
    buffer[i++] = 0xaf;

    let syncDataHex = [];
    for (let j = 0; j < buffer.byteLength; j++) {
      syncDataHex.push(buffer[j].toString(16));
    }
    // aa,bb,a,1,6d,1,fd,db,fa,af
    log(`发送的离线查询数据 ${syncDataHex.join(",")}`);
    return new DataView(buffer.buffer);
  }
}

class BluetoothRepository {
  _cacheServices = {};
  _cacheCharacteristics = {};
  _decoder = new TextDecoder();
  _server = null;
  device = null;
  _isFire = false;
  _isDiy = false;
  _timeoutFireId = -1;
  _diyTimeoutFireId = -1;
  _notifySignal = null;
  _notifySignal2 = null;
  _rejectNotifySignal2 = null;
  _syncSmokeDataSignal = null;
  _isReceivedQueryNotify = false;
  _isReceivedQueryNotify2 = false;
  _isReceivedSyncSmokeDataNotify = { isReceived: false, ret: 0 };

  _didDidconnectEvent = null;

  constructor() {
    this._didDidconnectEvent = this.didDisconnect.bind(this);
    //监听设备的连接状态
    if (navigator.bluetooth && navigator.bluetooth.addEventListener) {
      navigator.bluetooth.addEventListener(
        "reconnectDevice",
        this.didReconnectDevice.bind(this)
      );
    }
    if (navigator.bluetooth2 && navigator.bluetooth2.addEventListener) {
      navigator.bluetooth2.addEventListener(
        "reconnectDevice",
        this.didReconnectDevice.bind(this)
      );
    }

    if (navigator.bluetooth2 && navigator.bluetooth2.addEventListener) {
      navigator.bluetooth2.addEventListener(
        "receiveScanDevice",
        this.onReceiveScanDevice.bind(this)
      );
    }
    if (navigator.bluetooth && navigator.bluetooth.addEventListener) {
      navigator.bluetooth.addEventListener(
        "receiveScanDevice",
        this.onReceiveScanDevice.bind(this)
      );
    }
  }

  async onReceiveScanDevice(e) {
    const deviceList = e.target;
    log(`device list = ${deviceList}`);

    store.commit(
      `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_SCAN_DEVICE_LIST}`,
      deviceList
    );
  }

  async didReconnectDevice(e) {
    if (this.device) {
      this.device.removeEventListener(
        "gattserverdisconnected",
        this._didDidconnectEvent
      );
    }
    let device = e.target;

    await this.connectDevice(device);
  }

  async waitQueryNotify() {
    return new Promise(resolve => {
      if (this._isReceivedQueryNotify) {
        resolve();
        this._notifySignal = null;
      } else {
        this._notifySignal = resolve;
      }
      this._isReceivedQueryNotify = false;
    });
  }

  async waitHandleNotify() {
    return new Promise((resolve, reject) => {
      this._rejectNotifySignal2 = reject;
      if (this._isReceivedQueryNotify2) {
        resolve();
        this._notifySignal2 = null;
      } else {
        this._notifySignal2 = resolve;
      }
      this._isReceivedQueryNotify2 = false;
    });
  }

  async waitSyncSmokeDataNotify() {
    return new Promise(resolve => {
      if (this._isReceivedSyncSmokeDataNotify.isReceived) {
        resolve(this._isReceivedSyncSmokeDataNotify.ret);
        this._syncSmokeDataSignal = null;
      } else {
        this._syncSmokeDataSignal = resolve;
      }
      this._isReceivedSyncSmokeDataNotify = { isReceived: false, ret: 0 };
    });
  }

  async startPair(callback) {
    this.disconnect();
    let bluetooth;
    if (navigator.bluetooth2) {
      bluetooth = navigator.bluetooth2;
    } else {
      bluetooth = navigator.bluetooth;
    }
    const device = await bluetooth.requestDevice({
      filters: [{ namePrefix: "HB" }],
      optionalServices: [
        DEVICE_READ_SERVICE_UUID,
        DEVICE_WRITE_SERVER_UUID,
        BATTERY_SERVICE_UUID
      ],
      token: null
    });

    this.device = device;
    this.connectDevice(device);
  }

  async cancelSearch() {
    let bluetooth;
    if (navigator.bluetooth2) {
      bluetooth = navigator.bluetooth2;
    } else {
      bluetooth = navigator.bluetooth;
    }
    bluetooth.cancelSearch();
  }

  didDisconnect(e) {
    log("设备连接断开");
    this._server = null;
    //提交状态到vuex
    store.commit(
      `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_MAC_ADDRESS}`,
      ""
    );
    store.commit(
      `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CONNECT_STATE}`,
      StoreType.ConnectState.CONNECT_STATE_DISCONNECTED
    );
  }

  async connectDevice(device, isDirectConnect = false) {
    this.device = device;
    //监听设备的连接状态
    device.removeEventListener(
      "gattserverdisconnected",
      this._didDidconnectEvent
    );
    device.addEventListener("gattserverdisconnected", this._didDidconnectEvent);

    if (isDirectConnect) {
      this._server = await device.gatt.directConnect();
    } else {
      this._server = await device.gatt.connect();
    }

    log(`device name = ${device.name}`);

    // if (device.name.trim().length !== 14) {
    //     this._server.disconnect()
    //     return
    // }
    store.commit(
      `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_DEVICE_NAME}`,
      device.name
    );

    //缓存好service
    this._cacheServices.readService = await this._server.getPrimaryService(
      DEVICE_READ_SERVICE_UUID
    );

    this._cacheServices.readService.readCharacteristics = await this._cacheServices.readService.getCharacteristic(
      READ_CHARACTERISTIC_UUID
    );
    this._cacheServices.readService.saveCharacteristics = await this._cacheServices.readService.getCharacteristic(
      SAVE_CHARACTERISTIC_UUID
    );

    // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {deviceName: device.name.trim()})
    //打开notifacition
    await this.enableNotification();
    await this.fetchDeviceData();
    localStorage.getItem("");
    // store.dispatch("fetchRecommendVoltage");
    // store.dispatch("fetchLocalDisposableVoltage");
    // store.dispatch("fetchLocalVoltage");
    store.commit(
      `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CONNECT_STATE}`,
      StoreType.ConnectState.CONNECT_STATE_CONNECTED
    );
  }

  async afterConnectHandle() {
    await this.writeUserIDFlag();
    //提交状态到vuex
    // store.commit(StoreType.COMMIT_TYPE.COMMIT_CONNECT_STATE, StoreType.connectState.CONNECT_STATE_CONNECTED)
  }

  async _querySend(buffer) {
    await this._cacheServices.readService.readCharacteristics.writeValue(
      buffer
    );
    await this.waitQueryNotify();
    const queryResultDataView = await this._cacheServices.readService.readCharacteristics.readValue();
    await this.handleReadData(queryResultDataView);
  }

  async _fetchDeviceInfoWhenConnected() {
    const queryCommandType = [
      COMMAND_DEVICE_MAC_ADDRESS,
      COMMAND_BATCH_ID,
      COMMAND_POD_ID,
      COMMAND_DEVICE_IS_INSERT_CARTRIDGE
    ];
    const queryCommand = new QueryCommand();
    queryCommandType.forEach(item => {
      queryCommand.addCommand(item);
    });

    const command = queryCommand.generateCommand();
    await this._querySend(command.buffer);
  }

  async fetchDeviceData() {
    const queryCommandType = [
      COMMAND_DEVICE_MAC_ADDRESS,
      COMMAND_DEVICE_HW_VERSION,
      COMMAND_DEVICE_BT_VERSION,
      COMMAND_DEVICE_BATTERY,
      COMMAND_HUB_PARAMS,
      COMMAND_CARTRIDGE_FLAG
    ];
    const queryCommand = new QueryCommand();
    queryCommandType.forEach(item => {
      queryCommand.addCommand(item);
    });

    const command = queryCommand.generateCommand();
    await this._querySend(command.buffer);
  }

  //打开notification
  async enableNotification() {
    const notifyCharacteristic = await this._cacheServices.readService.getCharacteristic(
      NOTIFY_CHARACTERISTIC_UUID
    );
    await notifyCharacteristic.startNotifications();
    const that = this;
    notifyCharacteristic.addEventListener(
      "characteristicvaluechanged",
      event => {
        const characteristic = event.target;
        const data = characteristic.value;
        const length = data.byteLength;
        const header1 = data.getUint8(0);
        const header2 = data.getUint8(1);
        let notifyData = [];
        for (let i = 0; i < data.byteLength; i++) {
          notifyData.push(data.getUint8(i).toString(16));
        }
        log(`接收的原始数据 ${notifyData.join(",")}`);

        if (length === 4 && header1 === 0xbb && header2 === 0xdd) {
          const flag = data.getUint8(2);
          const ret = data.getUint8(3);
          log(`标志位： ${flag.toString(16)}`);
          switch (flag) {
            case 0xcc:
              {
                //查询结果
                log(`查询结果: ${ret}`);
                if (that._notifySignal) {
                  //如果进入了promise
                  this._notifySignal();
                } else {
                  //没有进入到promise，通知先到了
                  this._isReceivedQueryNotify = true;
                }
                this._syncSmokeDataSignal = null;
              }
              break;
            case 0xdd:
              {
                //操作结果
                log(`操作结果: ${ret}`);
              }
              break;
            case 0xf1:
              {
                //diy模式
                log(`DIY模式: ${ret}`);
                store.commit(
                  StoreType.COMMIT_TYPE.COMMIT_TASTE_SETTING,
                  ret === 1 ? 3 : 2
                );
              }
              break;
            case 0xf2:
              {
                //预热模式
                log(`预热模式: ${ret}`);
                store.commit(
                  StoreType.COMMIT_TYPE.COMMIT_TASTE_SETTING,
                  ret === 1 ? 1 : 2
                );
              }
              break;
            case 0xf3:
              {
                //吸烟模式
                log(`吸烟模式: ${ret}`);
              }
              break;
            case 0xf4:
              {
                //烟弹插入状态
                log(`烟弹插入状态: ${ret}`);
                store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {
                  isInsert: ret === 1
                });
                if (ret !== 1) {
                  store.commit(
                    StoreType.COMMIT_TYPE.COMMIT_OUTPUT_MODE_TYPE,
                    -1
                  );
                }
              }
              break;
            case 0xf5:
              {
                //点火状态
                this._isFire = ret === 1;
                if (this._isFire) {
                  log(`开始点火`);
                  if (this._timeoutFireId !== -1)
                    clearTimeout(this._timeoutFireId);
                } else {
                  log(`停止点火`);
                  if (this._timeoutFireId !== -1)
                    clearTimeout(this._timeoutFireId);

                  this.syncSmokeData();
                }
                store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {
                  isFire: ret === 1
                });
              }
              break;
            case 0xf6:
              {
                //预热点火
                log(`预热点火: ${ret}`);
                store.commit(
                  StoreType.COMMIT_TYPE.COMMIT_PREHEAT_STATUS,
                  ret === 1
                );
              }
              break;
            case 0xf7:
              {
                //改变预热参数
                log(`改变预热参数: ${ret}`);
                const queryCommandType = [COMMAND_PREHEAT_AND_TIME];
                const queryCommand = new QueryCommand();
                queryCommandType.forEach(item => {
                  queryCommand.addCommand(item);
                });

                const command = queryCommand.generateCommand();
                this._querySend(command.buffer);
              }

              break;
            case 0xf8:
              {
                //diy点火
                log(`diy点火: ${ret}`);

                this._isDiy = ret === 1;
                if (this._isDiy) {
                  log(`diy点火开始`);
                  if (this._diyTimeoutFireId !== -1)
                    clearTimeout(this._diyTimeoutFireId);
                } else {
                  log(`diy点火结束`);
                  if (this._diyTimeoutFireId !== -1)
                    clearTimeout(this._diyTimeoutFireId);
                  this.syncSmokeData();
                }
                store.commit(
                  `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.COMMIT_TEMPERATURE_MODE_STATUS}`,
                  ret === 1
                );
              }
              break;
            case 0xf9:
              {
                //改变diy参数结果
                log(`改变diy参数结果: ${ret}`);
                const queryCommandType = [
                  COMMAND_DIY_TEMPERATURE_AND_TIME,
                  COMMAND_DIY_TEMPERATURE_NAME
                ];
                const queryCommand = new QueryCommand();
                queryCommandType.forEach(item => {
                  queryCommand.addCommand(item);
                });

                const command = queryCommand.generateCommand();
                this._querySend(command.buffer);
              }

              break;
            case 0xe1: //锁定设备
              log(`锁定设备: ${ret}`);
              break;
            case 0xe2: //解锁设备
              log(`解锁设备: ${ret}`);
              break;
            case 0xe3: //同步离线数据结果
              log(`同步离线数据结果: ${ret}`);
              if (that._syncSmokeDataSignal) {
                //如果进入了promise
                this._syncSmokeDataSignal(ret === 1);
                this._syncSmokeDataSignal = null;
              } else {
                //没有进入到promise，通知先到了
                this._isReceivedSyncSmokeDataNotify = {
                  isReceived: ret === 1,
                  ret
                };
              }

              break;
            case 0xe4: //同步时间
              log(`同步时间: ${ret}`);
              break;
            case 0xe5:
              {
                if (ret === 0x00) {
                  this._rejectNotifySignal2("Read error, please try it again.");
                } else if (ret === 0x01) {
                  //查询结果
                  log(`查询结果: ${ret}`);
                  if (that._notifySignal2) {
                    //如果进入了promise
                    this._notifySignal2();
                  } else {
                    //没有进入到promise，通知先到了
                    this._isReceivedQueryNotify2 = true;
                  }
                } else {
                  store.commit(
                    `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CURRENT_WRITER_SETTING}`,
                    null
                  );
                  this._rejectNotifySignal2(
                    ret === 0x02
                      ? "Please connect the device."
                      : ret === 0x03
                      ? "Read error, please confirm the device readable?"
                      : "Low power, please charge."
                  );
                }
              }
              break;
            case 0xba: //电量百分比
              // console.log(`电量百分比: ${ret}`)
              store.commit(
                `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.COMMIT_BATTERY_CHANGED}`,
                ret
              );
              break;
            default:
              if (this._isFire) {
                this._timeoutFire();
              }
              break;
          }
        }
      }
    );
    this._cacheServices.readService.notify = notifyCharacteristic;
  }

  handleReadData(readvalue) {
    const length = readvalue.byteLength;
    if (length === 0) return;
    const header1 = readvalue.getUint8(0);
    const header2 = readvalue.getUint8(1);

    //判断数据头
    if (
      length > 3 &&
      header1 === 0xaa &&
      (header2 === 0xcc || header2 === 0xdd || header2 === 0xc1)
    ) {
      const dataSize = readvalue.getUint8(2); //整段读取数据的长度

      let i = 3;
      if (length !== dataSize) {
        return;
      }

      //长度判断通过
      let encodeNumberLength;
      if (header2 === 0xcc) {
        //判断操作帧 cc是查询
        encodeNumberLength = readvalue.getUint8(i); //获取查询到的编码数量多少
      } else {
        encodeNumberLength = readvalue.getUint8(++i);
      }

      log(`处理的编码数量 ${encodeNumberLength}`);

      ++i;

      //取出解析编码对照表
      const encodeNumberByteArray = Buffer.from(
        readvalue.buffer.slice(i, i + encodeNumberLength * 2)
      );
      //日志使用，记录解析到的编码
      const encodeNumberList = [];

      //i移动到真实的数据域位置
      i += encodeNumberLength * 2;
      //截取出真实的数据域数据
      const realData = readvalue.buffer.slice(i, length - 3);

      let currentEncodeNumber = 0; //当前的编码
      let parseIndex = 0; //数据域中的各个编码的开始位置

      for (let j = 0; j < encodeNumberByteArray.byteLength; j++) {
        const item = encodeNumberByteArray.readUInt8(j); //取出编码对照表
        if (j % 2 === 0) {
          //偶数是编码的值 这里是从0开始，所以第一个是偶数
          encodeNumberList.push(item);
          currentEncodeNumber = item;
        } else {
          //奇数是编码的数据的长度
          this.handleRealData(
            currentEncodeNumber,
            realData.slice(parseIndex, parseIndex + item)
          );
          //解析完向前移动游标索引
          parseIndex += item;
        }
      }

      log(`处理的编码为 ${encodeNumberList.map(item => item.toString(16))}`);
    }
  }

  handleRealData(currentEncodeNumber, realData) {
    const dataView = new DataView(realData);
    switch (currentEncodeNumber) {
      case COMMAND_BATCH_ID: {
        const batchId = dataView.getUint32(realData, true);
        log(`批次号：${batchId}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_BATCH_ID}`,
          batchId
        );
        break;
      }
      case COMMAND_POD_ID: {
        let podIdHex = [];
        for (let i = 0; i < dataView.byteLength; i++) {
          podIdHex.push(dataView.getUint8(i).toString(16));
        }
        const podId = podIdHex.join("").toUpperCase();
        log(`烟弹id：${podId}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_POD_ID}`,
          podId
        );
        // if (this._lastPodId !== '' && this._lastPodId !== podId) {
        //   //更换了不同的烟弹
        //
        // }
        // storeRepository.findSelectedConcentrateByPodId(podId)
        break;
      }
      case COMMAND_OIL: {
        const oilType = dataView.getUint8(0);
        log(`烟油类型：${oilType}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_OIL_TYPE}`,
          oilType
        );
        break;
      }
      case COMMAND_BRAND: {
        const brandType = dataView.getUint8(0);
        log(`品牌类型：${brandType}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {brandType})
        break;
      }
      case COMMAND_CAPACITY: {
        const capacity = dataView.getUint16(0, true);
        log(`溶剂容量：${capacity}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {capacity})
        break;
      }
      case COMMAND_FLAVOR: {
        const flavor = dataView.getUint16(0, true);
        log(`口味编码：${flavor}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {flavor})
        break;
      }
      case COMMAND_MANUFACTURE: {
        const manufacture = dataView.getUint8(0);
        log(`厂商：${manufacture}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {manufacture})
        break;
      }
      case COMMAND_COUNTRY: {
        const country = dataView.getUint8(0);
        log(`国家：${country}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {country})
        break;
      }
      case COMMAND_CITY: {
        const city = dataView.getUint8(0);
        log(`城市：${city}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {city})
        break;
      }
      case COMMAND_MAX_SECOND: {
        const maxSecond = dataView.getUint16(0, true);
        log(`最大秒数：${maxSecond}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_MAX_PUFF}`,
          maxSecond
        );
        break;
      }
      case COMMAND_THICKNESS: {
        const thickness = dataView.getUint16(0, true);
        log(`浓稠度：${thickness}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {thickness})
        break;
      }
      case COMMAND_CARTRIDGE_FLAG: {
        const cartridgeFlag = dataView.getUint16(0, true);
        log(`烟弹标识：${cartridgeFlag}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CARTRIDGE_FLAG}`,
          cartridgeFlag
        );
        break;
      }
      case COMMAND_OIL_CONTENT: {
        const oilContent = dataView.getUint16(0, true);
        log(`烟弹含量：${oilContent}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {oilContent})
        break;
      }
      case COMMAND_ATOMIZING_WIRE: {
        const atomizingWire = dataView.getUint16(0, true);
        log(`雾化丝编码：${atomizingWire}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {atomizingWire})
        break;
      }
      case COMMAND_VOLTAGE: {
        const voltage = dataView.getUint16(0, true);
        log(`电压：${voltage}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {voltage})
        break;
      }
      case COMMAND_RESISTANCE: {
        const R = dataView.getUint16(0, true);
        log(`阻值：${R}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {R})
        break;
      }
      case COMMAND_CONSTANT_TEMPERATURE: {
        const constantTemperature = dataView.getUint16(0, true);
        log(`恒温：${constantTemperature}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {constantTemperature})
        break;
      }
      case COMMAND_HEATING_FACTOR: {
        const heatingFactor = dataView.getUint16(0, true);
        log(`加热系数：${heatingFactor}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {heatingFactor})
        break;
      }
      case COMMAND_PREHEAT_AND_TIME: {
        const preheatTemperatureAndTime = new PreheatTemperatureAndTime(
          dataView
        );
        log(
          `预热温度：${preheatTemperatureAndTime.preheatTemperature} 预热时间:${preheatTemperatureAndTime.preheatSecond}`
        );
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_PREHEAT}`,
          {
            time: preheatTemperatureAndTime.preheatSecond,
            temperature: preheatTemperatureAndTime.preheatTemperature
          }
        );
        break;
      }
      case COMMAND_PREHEAT_NAME: {
        const preheatNameLength = dataView.buffer.byteLength;

        //先判断是否全是0
        let isAllZero = true;
        for (let i = 0; i < preheatNameLength; i++) {
          if (dataView.getUint8(i) !== 0) {
            isAllZero = false;
            break;
          }
        }

        if (isAllZero) {
          store.commit(
            `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_PREHEAT_NAME}`,
            ""
          );
        } else {
          let endStringIndex = -1;
          for (let i = 0; i < preheatNameLength; i++) {
            if (dataView.getUint8(i) === 0) {
              endStringIndex = i;
              break;
            }
          }

          const preheatName = Buffer.from(
            dataView.buffer.slice(0, endStringIndex)
          ).toString("utf-8");
          log(`预热名称:${preheatName}`);
          store.commit(
            `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_PREHEAT}`,
            preheatName
          );
        }
        break;
      }
      case COMMAND_DIY_TEMPERATURE_AND_TIME: {
        const diyTemperatureAndTime = new DiyTemperatureAndTime(dataView);
        log(`diy时间:${diyTemperatureAndTime.diyTime} `);
        log(
          `diy温度:${diyTemperatureAndTime.secondTemperature.map(
            item => item.y
          )}`
        );
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_DIY}`,
          {
            time: diyTemperatureAndTime.diyTime,
            secondTemperature: diyTemperatureAndTime.secondTemperature
          }
        );
        break;
      }
      case COMMAND_DIY_TEMPERATURE_NAME:
        {
          const diyTemperatureNameLength = dataView.buffer.byteLength;

          //先判断是否全是0
          let isAllZero = true;
          for (let i = 0; i < diyTemperatureNameLength; i++) {
            if (dataView.getUint8(i) !== 0) {
              isAllZero = false;
              break;
            }
          }
          if (isAllZero) {
            log(`diy温度名称:空`);
            store.commit(
              `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_DIY_NAME}`,
              ""
            );
          } else {
            let endDiyTemperatureNameIndex = -1;
            for (let i = 0; i < diyTemperatureNameLength; i++) {
              if (dataView.getUint8(i) === 0) {
                endDiyTemperatureNameIndex = i;
                break;
              }
            }

            const diyTemperatureName = Buffer.from(
              dataView.buffer.slice(0, endDiyTemperatureNameIndex)
            ).toString("utf-8");
            store.commit(
              StoreType.COMMIT_TYPE.STATE_DIY_NAME,
              diyTemperatureName
            );
          }
        }

        break;
      case COMMAND_WRITER_PARAMS: {
        const writerSetting = new WriterSetting(dataView);
        writerSetting.toString();
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CURRENT_WRITER_SETTING}`,
          writerSetting
        );
        break;
      }
      case COMMAND_HUB_PARAMS: {
        const writerSetting = new WriterSetting(dataView);
        writerSetting.toString();
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CURRENT_HUB_SETTING}`,
          writerSetting
        );
        break;
      }
      case COMMAND_DEVICE_ID_PARAMS: {
        const deviceId = new DeviceId(dataView);
        deviceId.toString();
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_DEVICE_ID}`,
          deviceId
        );

        break;
      }
      case COMMAND_CARTRIDGE_TOTAL_COUNT: {
        const totalCount = dataView.getUint16(0, true);
        log(`总吸烟口数：${totalCount}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CURRENT_PUFF}`,
          totalCount
        );
        break;
      }
      case COMMAND_CARTRIDGE_TOTAL_SECOND: {
        const totalSecond = dataView.getUint16(0, true);
        log(`总吸烟秒数：${totalSecond}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_TOTAL_SECONDS}`,
          totalSecond
        );
        break;
      }
      case COMMAND_CARTRIDGE_TODAY_PUFF: {
        const todayPuff = dataView.getUint16(0, true);
        log(`当天吸烟口数：${todayPuff}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_TODAY_PUFF}`,
          todayPuff
        );
        break;
      }
      case COMMAND_CARTRIDGE_USAGE_SECOND: {
        const usageSecond = dataView.getUint16(0, true);
        log(`当前使用的秒数：${usageSecond}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_USAGE_SECONDS}`,
          usageSecond
        );
        break;
      }
      case COMMAND_CARTRIDGE_TODAY_SECOND: {
        const todaySecond = dataView.getUint16(0, true);
        log(`当天吸烟秒数：${todaySecond}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_TODAY_SECONDS}`,
          todaySecond
        );
        break;
      }
      case COMMAND_CARTRIDGE_REAL_TEMPERATURE: {
        const realTemperature = dataView.getUint16(0, true);
        log(`实时温度：${realTemperature}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {realTemperature})
        break;
      }
      case COMMAND_CARTRIDGE_STATUS: {
        const cartridgeStatus = dataView.getUint8(0);
        log(`烟弹状态：${cartridgeStatus}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {cartridgeStatus})
        break;
      }
      case COMMAND_CARTRIDGE_SYNC_TIME: {
        const syncTimeData = SyncData.create(new DataView(realData));
        log(`同步离线数据数据: ${JSON.stringify(syncTimeData)}`);
        store.commit(StoreType.COMMIT_TYPE.STATE_SMOKE_DATA, syncTimeData);
        break;
      }
      case COMMAND_CARTRIDGE_ACTIVE_TIME: {
        const activeTime = dataView.getUint16(0, true);
        log(`激活时间：${activeTime}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_ACTIVE_TIME}`,
          activeTime
        );
        break;
      }
      case COMMAND_DEVICE_HW_VERSION: {
        const hwVersion = Buffer.from(dataView.buffer).toString("utf-8");
        log(`硬件版本：${hwVersion}`);
        this.uploadDeviceInfo(hwVersion);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_DEVICE_VERSION}`,
          hwVersion
        );
        break;
      }
      case COMMAND_DEVICE_BT_VERSION: {
        const btVersion = Buffer.from(dataView.buffer).toString("utf-8");
        log(`蓝牙版本：${btVersion}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_BLUETOOTH_VERSION}`,
          btVersion
        );
        break;
      }
      case COMMAND_DEVICE_IS_INSERT_CARTRIDGE: {
        const isInsert = dataView.getUint8(0);
        log(`是否插入烟弹：${isInsert}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_CARTRIDGE_IS_INSERT}`,
          isInsert === 1
        );
        break;
      }
      case COMMAND_DEVICE_IS_NEED_SYNC: {
        const isNeedSync = dataView.getUint8(0);
        log(`是否需要同步：${isNeedSync}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_IS_NEED_SYNC}`,
          isNeedSync === 1
        );
        break;
      }
      case COMMAND_DEVICE_IS_CACHE_COA: {
        const isCacheCOA = dataView.getUint8(0);
        log(`是否缓存coa：${isCacheCOA}`);
        break;
      }
      case COMMAND_DEVICE_IS_OUTPUT_MODE: {
        const outputMode = dataView.getUint8(0);
        log(`输出模式：${outputMode}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_FIRE_MODE}`,
          outputMode
        );
        break;
      }
      case COMMAND_DEVICE_IS_LOCK: {
        const isLock = dataView.getUint8(0);
        log(`是否锁定：${isLock}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {isLock: isLock === 1})
        break;
      }
      case COMMAND_DEVICE_IS_BIND: {
        const isBind = dataView.getUint8(0);
        log(`是否绑定：${isBind}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {isBind: isBind === 1})
        break;
      }
      case COMMAND_DEVICE_LOCK_EXPIRED_TIME:
        break;
      case COMMAND_DEVICE_BATTERY: {
        const battery = dataView.getUint8(0);
        log(`电池百分比：${battery}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_BATTERY}`,
          battery
        );
        break;
      }
      case COMMAND_DEVICE_MAC_ADDRESS: {
        let macAddress = [];
        for (let i = 0; i < dataView.byteLength; i++) {
          let hexAddr = dataView.getUint8(i).toString(16);
          if (hexAddr.length === 1) {
            hexAddr = `0${hexAddr}`;
          }
          macAddress.push(hexAddr);
        }

        this.macAddress = macAddress.join(":").toLocaleUpperCase();
        log(`蓝牙地址：${this.macAddress}`);
        store.commit(
          `${BLUETOOTH_MODULE_NAME}${StoreType.COMMIT_TYPE.STATE_MAC_ADDRESS}`,
          this.macAddress
        );
        break;
      }
      case COMMAND_DEVICE_ENCRYPT_TYPE: {
        const encryptType = dataView.getUint8(0);
        log(`加密类型：${encryptType}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {encryptType})
        break;
      }
      case COMMAND_DEVICE_SYNC_TIME: {
        if (dataView.buffer.byteLength === 7) {
          const year = `${dataView.getUint8(0)}${dataView.getUint8(1)}`;
          const month = dataView.getUint8(2);
          const day = dataView.getUint8(3);
          const hour = dataView.getUint8(4);
          const min = dataView.getUint8(5);
          const sec = dataView.getUint8(6);
          log(`当前时间: ${year}-${month}-${day} ${hour}:${min}:${sec}`);
          // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {currentDeviceTime: `${year}-${month}-${day} ${hour}:${min}:${sec}`})
        }
        break;
      }
      case COMMAND_DEVICE_USER_ID_FLAG:
        {
          const userIdFlag = dataView.getUint16(0, true);
          log(`用户标识：${userIdFlag}`);
        }
        break;
      case COMMAND_CACHE_DATA_NUMBER:
        break;
      case COMMAND_CACHE_DATA_CONTENT:
        break;
      case COMMAND_INGREDIENT_NAME: {
        const ingredientName = dataView.getUint8(0);
        log(`成分名称编码：${ingredientName}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {ingredientName})
        break;
      }
      case COMMAND_INGREDIENT_PROPORTION: {
        const ingredientProportion = dataView.getUint16(0, true);
        log(`成分比例：${ingredientProportion}`);
        // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {ingredientProportion})
        break;
      }
      case COMMAND_SOLVENT_NAME: {
        const solventName = dataView.getUint8(0);
        log(`溶剂名称编码：${solventName}`);
        break;
      }
      case COMMAND_SOLVENT_PROPORTION: {
        const solventProportion = dataView.getUint16(0, true);
        log(`溶剂比例：${solventProportion}`);
        break;
      }
    }
  }

  /**
   * 取消之前的先，然后重新启动timeout
   * @private
   */
  _timeoutFire() {
    log(`待取消的timeoutId ${this._timeoutFireId}`);
    if (this._timeoutFireId !== -1) clearTimeout(this._timeoutFireId);

    this._timeoutFireId = setTimeout(() => {
      log(`准备执行timeout的内容`);
      this._isFire = false;
      store.commit(StoreType.COMMIT_TYPE.COMMIT_IS_FIRE, false);
    }, 500); //500毫秒后收不到

    log(`准备执行的timeoutId ${this._timeoutFireId}`);
  }

  _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  //写入同步时间
  async syncTime(macAddress, deviceType) {
    let r = 0;
    const verSplit = store.state.deviceInfo.version.split("&");
    if (verSplit.length === 2) {
      const hwVersion = parseInt(verSplit[0].replace("HW", ""));
      const fwVersion = parseInt(verSplit[1].replace("FW", ""));
      if (hwVersion === 50) {
        if (fwVersion >= 7) r = Math.trunc(Math.random() * 3 + 1);
        else r = 0;
      } else {
        r = Math.trunc(Math.random() * 3 + 1);
      }
    }

    // let synchronizeTime = await deviceRepository.synchronizeTime(
    //   macAddress,
    //   deviceType,
    //   r
    // );
    // let currentTime = this._base64ToArrayBuffer(synchronizeTime);
    //
    // const syncTimeControlCommand = ControlCommand.createCommand(
    //   COMMAND_SYNC_TIME
    // );
    // syncTimeControlCommand.addEncodeCommand(
    //   COMMAND_DEVICE_ENCRYPT_TYPE,
    //   new DataView(Buffer.from([r]).buffer)
    // );
    // syncTimeControlCommand.addEncodeCommand(
    //   COMMAND_DEVICE_SYNC_TIME,
    //   new DataView(currentTime.slice(0, 7).buffer)
    // );
    // await this._cacheServices.readService.notify.writeValue(
    //   syncTimeControlCommand.generateCommand()
    // );

    // const lockControlCommand = ControlCommand.createCommand(
    //   COMMAND_UNLOCK_DEVICE
    // );
    // lockControlCommand.addEncodeCommand(
    //   COMMAND_DEVICE_ENCRYPT_TYPE,
    //   new DataView(Buffer.from([r]).buffer)
    // );
    // lockControlCommand.addEncodeCommand(
    //   COMMAND_DEVICE_LOCK_EXPIRED_TIME,
    //   new DataView(currentTime.slice(7, 14).buffer)
    // );
    // await this._cacheServices.readService.notify.writeValue(
    //   lockControlCommand.generateCommand()
    // );

    return "";
  }

  isSyncingSmokeData = false;

  //查询是否有需要同步的数据 aa dd 08 e3 00 72 fa af
  async syncSmokeData() {
    const controlCommand = ControlCommand.createCommand(
      COMMAND_SYNC_OFFLINE_DATA
    );
    controlCommand.addSwitchCommand(false);
    const command = controlCommand.generateCommand();
    let ret = false;
    this.isSyncingSmokeData = true;
    do {
      await this._cacheServices.readService.notify.writeValue(command.buffer);
      ret = await this.waitSyncSmokeDataNotify();
      if (ret === 0) break;
      const syncData = await this._cacheServices.readService.notify.readValue();
      this.handleReadData(syncData);

      const sendSyncData = {
        deviceNumber: store.state.deviceInfo.macAddress,
        podId: store.state.deviceInfo.podId,
        totalSmokeTime: store.state.deviceInfo.usageSecond,
        userIdentification: store.state.deviceInfo.userIdFlag,
        ...store.state.deviceInfo.syncTimeData
      };

      // await deviceRepository.syncSmokeData(sendSyncData);
      // store.commit(StoreType.COMMIT_TYPE.COMMIT_SYNC_SMOKE_DATA, {...sendSyncData})
    } while (ret === 1);

    this.isSyncingSmokeData = false;
  }

  //改变输出模式
  async changeOutputMode(mode) {
    const saveCommand = SaveCommand.createCommand();
    saveCommand.addEncodeCommand(
      COMMAND_DEVICE_IS_OUTPUT_MODE,
      new DataView(Buffer.from([mode]).buffer)
    );
    const command = saveCommand.generateCommand();
    await this._cacheServices.readService.saveCharacteristics.writeValue(
      command.buffer
    );
  }

  //写入温度模式
  async writeTemperatureMode(temperatureMode) {
    const name = temperatureMode.name;
    const secondTemperature = temperatureMode.secondTemperature;

    const diyTemperatureAndTime = new DiyTemperatureAndTime();

    secondTemperature.forEach(item => {
      diyTemperatureAndTime.secondTemperature.push(item.y);
    });

    const controlCommand = ControlCommand.createCommand(
      COMMAND_DIY_PARAM_CHANGE
    );
    controlCommand.addEncodeCommand(
      COMMAND_DIY_TEMPERATURE_AND_TIME,
      diyTemperatureAndTime.generateCommand()
    );
    controlCommand.addEncodeCommand(
      COMMAND_DIY_TEMPERATURE_NAME,
      new DataView(Buffer.from(name).buffer)
    );

    // const sendDataView = controlCommand.generateCommand()
    // const length       = sendDataView.byteLength
    // if (length > 20) { //需要分包
    //     let packageSize = length / 20 //分多少个包
    //     const idle      = length % 20 //最后一个包的大小
    //
    //     const sendDataBuffer = sendDataView.buffer
    //
    //     if (idle !== 0) {   //包大小为packageSize + 1
    //         packageSize = Math.trunc(packageSize) + 1
    //     }
    //
    //     for (let i = 0; i < packageSize; i++) {
    //         if (i === packageSize - 1 && idle !== 0) { //是否最后一个而且分包后最后一包
    //             await this._cacheServices.readService.notify.writeValue(sendDataBuffer.slice(i * 20, idle))
    //         } else {
    //             await this._cacheServices.readService.notify.writeValue(sendDataBuffer.slice(i * 20, i * 20 + 20))
    //         }
    //     }
    // } else {
    await this._cacheServices.readService.notify.writeValue(
      controlCommand.generateCommand()
    );
    // }

    diyTemperatureAndTime.secondTemperature = secondTemperature;

    const currentTemperatureMode = store.state.deviceInfo.temperatureMode;
    const result = {
      temperatureMode: {
        ...currentTemperatureMode,
        ...diyTemperatureAndTime,
        name
      }
    };
    store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, result);
  }

  //设置预热 aa,dd,c,40,40,0,3c,0,f,5e,fa,af
  async writePreheat(type, preheatTemperature, preheatSecond) {
    const preheatTemperatureAndTime = new PreheatTemperatureAndTime(null);
    preheatTemperatureAndTime.preheatSecond = preheatSecond;
    preheatTemperatureAndTime.preheatTemperature = preheatTemperature;

    const controlCommand = ControlCommand.createCommand(
      COMMAND_PREHEAT_PARAM_CHANGED
    );
    controlCommand.addEncodeCommand(
      COMMAND_PREHEAT_AND_TIME,
      preheatTemperatureAndTime.generateCommand()
    );

    await this._cacheServices.readService.notify.writeValue(
      controlCommand.generateCommand().buffer
    );
  }

  async startPreheat() {
    const controlCommand = ControlCommand.createCommand(COMMAND_PREHEAT_STATUS);
    controlCommand.addSwitchCommand(true);
    await this._cacheServices.readService.notify.writeValue(
      controlCommand.generateCommand().buffer
    );
  }

  async stopPreheat() {
    const controlCommand = ControlCommand.createCommand(COMMAND_PREHEAT_STATUS);
    controlCommand.addSwitchCommand(false);
    await this._cacheServices.readService.notify.writeValue(
      controlCommand.generateCommand().buffer
    );
  }

  async writeUserIDFlag() {
    // console.log(`user id = ${storeRepository.getUser().id}`);
    // const saveCommand = SaveCommand.createCommand();
    //
    // let dataView = new DataView(Buffer.from([0, 0, 0, 0]).buffer);
    // dataView.setUint32(0, storeRepository.getUser().id, true);
    // saveCommand.addEncodeCommand(COMMAND_DEVICE_USER_ID_FLAG, dataView);
    // await this._cacheServices.readService.saveCharacteristics.writeValue(
    //   saveCommand.generateCommand().buffer
    // );
    // store.commit(StoreType.COMMIT_TYPE.COMMIT_DEVICE_INFO, {
    //   userIdFlag: storeRepository.getUser().id
    // });
  }

  async clearUserIdFlag() {
    const saveCommand = SaveCommand.createCommand();
    saveCommand.addEncodeCommand(
      COMMAND_DEVICE_USER_ID_FLAG,
      new DataView(Buffer.from([0]).buffer)
    );
    await this._cacheServices.readService.saveCharacteristics.writeValue(
      saveCommand.generateCommand().buffer
    );
  }

  disconnect() {
    if (this._server) {
      this._server.disconnect();
      this._server = null;
      this.device = null;
    }
  }

  isConnected() {
    return this._server !== null && this.device != null;
  }

  otaDevice(otaInfo) {
    this._server !== null && this._server.ota(otaInfo);
  }

  uploadDeviceInfo(hwVersion) {
    // this._server !== null &&
    //   this._server.uploadDeviceInfo &&
    //   this._server.uploadDeviceInfo(hwVersion);
  }

  async queryWriter() {
    const controlCommand = ControlCommand.createCommand(
      COMMAND_WRITER_PREPARE_DATA
    );
    controlCommand.addSwitchCommand(false);
    await this._cacheServices.readService.notify.writeValue(
      controlCommand.generateCommand().buffer
    );

    await this.waitHandleNotify();

    const queryCommand = new QueryCommand();
    queryCommand.addCommand(COMMAND_WRITER_PARAMS);
    queryCommand.addCommand(COMMAND_DEVICE_ID_PARAMS);
    await this._querySend(queryCommand.generateCommand().buffer);
  }

  async writeToWriter(writerSetting) {
    writerSetting.micSensitivity = 60;
    writerSetting.touchSensitivity = 250;
    writerSetting.versionFeature = 4;
    writerSetting.toString();
    const controlCommand = ControlCommand.createCommand(
      COMMAND_WRITER_SETTING_DATA
    );

    controlCommand.addEncodeCommand(
      COMMAND_HUB_PARAMS,
      writerSetting.generateCommand()
    );
    const command = controlCommand.generateCommand();
    await this._cacheServices.readService.notify.writeValue(command.buffer);
    store.commit(
      `${BLUETOOTH_MODULE_NAME}${STATE_CURRENT_HUB_SETTING}`,
      writerSetting
    );
  }
}

const bluetoothRepository = new BluetoothRepository();
export default bluetoothRepository;
