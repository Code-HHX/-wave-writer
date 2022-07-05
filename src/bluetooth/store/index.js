import bluetoothRepository from "@/bluetooth/BluetoothRepository";
import router from "@/router";
import StoreType from "./StoreType";
import { DeviceId, WriterSetting } from "../BluetoothData";
const BRAND_PRODUCT_MAP = {
  0: {
    3: "GDC",
    4: "stem2"
  },
  1: {
    3: "UZO",
    4: "NORD",
    5: "TIK"
  },
  2: {
    3: "ALLY"
  }
};
export const BluetoothStore = {
  namespaced: true,
  state: () => ({
    isConnected: false, //是否已经连接到蓝牙
    isInsert: false, //是否插入烟弹
    battery: 100, //电池电量
    currentPuff: 0, //总口数
    maxPuff: 10000, //最大口数，目前不需要从设备读取，写死10000秒
    preheat: {
      //读取到的设备的预热
      time: 10, //预热秒数
      temperature: 400 //预热温度
    },
    diy: {
      //diy温度
      time: 0,
      secondTemperature: []
    },
    todaySeconds: 0, // 今日抽烟秒数
    todayPuff: 0, // 今日抽烟口数
    usageSeconds: 0, // 当前烟弹已经使用秒数
    deviceVersion: "", //设备版本信息
    macAddress: "", //设备mac 地址
    isNeedSync: false, //是否需要同步数据
    syncSmokeData: {},
    deviceName: "", //设备名称
    fireMode: -1, //点火模式
    isFire: false, //是否正在点火
    isDiyFire: false, //是否正在diy点火
    isPreheat: false, //预热是否启动
    isDiy: false, //diy是否启动
    batchId: "", //烟弹的批次id
    podId: "", //烟弹id
    oilType: 0, //烟油类型
    brandType: 0, //品牌类型
    capacity: 0, //溶剂容量
    flavor: 0, //口味
    manufacture: 0, //厂商
    country: 0, //国家地区
    city: 0, //城市地区
    thickness: 0, //浓稠度
    cartridgeFlag: 0, //烟弹标识符
    oilContent: 0, //烟油含量
    atomizingWire: 0, //雾化丝类型
    volte: 0, //电压
    r: 0, //电阻
    constantTemperature: 0, //恒温
    heatingFactor: 0, //加热系数
    isLock: false, //设备是否锁定
    isBind: false, //设备是否绑定
    encryptType: 0, //加密类型
    userIdFlag: 0, //用户标识
    currentTime: 0, //当前时间
    preheatName: "", //预热名称
    diyName: "", //diy名称
    activedTime: "",
    bleVersion: "",
    hasError: false,
    //
    tempTemperatureMode: null, //预设界面的临时存储用,
    deviceInfoFromServer: null, //服务器中存储的设备名称
    presets: [],
    isPresetChanged: false,
    presetName: "PRESETS",
    hubSetting: null,
    writerSetting: null,
    deviceId: new DeviceId(),
    isDeviceSupportRead: false,
    insertDeviceName: "Device",
    deviceList: []
  }),
  mutations: {
    [StoreType.COMMIT_TYPE.STATE_CONNECT_STATE](state, payload) {
      if (payload === StoreType.ConnectState.CONNECT_STATE_CONNECTING) {
        return;
      }
      state.isConnected =
        payload === StoreType.ConnectState.CONNECT_STATE_CONNECTED;
    },
    [StoreType.COMMIT_TYPE.STATE_CARTRIDGE_IS_INSERT](state, payload) {
      if (!payload) {
        state.currentPuff = 0;
        state.usageSeconds = 0;
        state.totalSeconds = 0;
        state.todaySeconds = 0;
        state.maxPuff = 0;
      }
      state.isInsert = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_BATTERY](state, payload) {
      state.battery = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CURRENT_PUFF](state, payload) {
      state.currentPuff = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_MAX_PUFF](state, payload) {
      state.maxPuff = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_PREHEAT](state, payload) {
      state.preheat = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DIY](state, payload) {
      state.diy = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_TODAY_SECONDS](state, payload) {
      state.todaySeconds = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_TODAY_PUFF](state, payload) {
      state.todayPuff = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_TOTAL_SECONDS](state, payload) {
      state.totalSeconds = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_USAGE_SECONDS](state, payload) {
      state.usageSeconds = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DEVICE_VERSION](state, payload) {
      state.deviceVersion = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_SMOKE_DATA](state, payload) {
      state.syncSmokeData = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_MAC_ADDRESS](state, payload) {
      state.macAddress = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_NEED_SYNC](state, payload) {
      state.isNeedSync = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DEVICE_NAME](state, payload) {
      state.deviceName = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_FIRE_MODE](state, payload) {
      state.fireMode = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_FIRE](state, payload) {
      state.isFire = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_DIY_FIRE](state, payload) {
      state.isDiyFire = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_PREHEAT](state, payload) {
      state.isPreheat = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_DIY](state, payload) {
      state.isDiy = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_BATCH_ID](state, payload) {
      state.batchId = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_POD_ID](state, payload) {
      state.podId = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_OIL_TYPE](state, payload) {
      state.oilType = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_BRAND_TYPE](state, payload) {
      state.brandType = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CAPACITY](state, payload) {
      state.capacity = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_FLAVOR](state, payload) {
      state.flavor = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_MANUFACTURE](state, payload) {
      state.manufacture = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_COUNTRY](state, payload) {
      state.country = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CITY](state, payload) {
      state.city = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_THICKNESS](state, payload) {
      state.thickness = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CARTRIDGE_FLAG](state, payload) {
      state.cartridgeFlag = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_OIL_CONTENT](state, payload) {
      state.oilContent = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_ATOMIZING_WIRE](state, payload) {
      state.atomizingWire = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_COMMAND_RESISTANCE](state, payload) {
      state.r = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CONSTANT_TEMPERATURE](state, payload) {
      state.constantTemperature = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_HEATING_FACTOR](state, payload) {
      state.heatingFactor = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_LOCK](state, payload) {
      state.isLock = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_BIND](state, payload) {
      state.isBind = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_ENCRYPT_TYPE](state, payload) {
      state.encryptType = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_USER_ID_FLAG](state, payload) {
      state.userIdFlag = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DEVICE_TIME](state, payload) {
      state.currentTime = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DIY_NAME](state, payload) {
      state.diyName = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_PREHEAT_NAME](state, payload) {
      state.preheatName = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_TEMP_TEMPERATURE_MODE](state, payload) {
      state.tempTemperatureMode = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DEVICE_INFO_FROM_SERVER](state, payload) {
      state.deviceInfoFromServer = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_ACTIVE_TIME](state, payload) {
      state.activedTime = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_BLUETOOTH_VERSION](state, payload) {
      state.bluetoothVersion = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_PRESET_FROM_SERVER](state, payload) {
      state.presets = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CURRENT_WRITER_SETTING](state, payload) {
      state.writerSetting = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_CURRENT_HUB_SETTING](state, payload) {
      state.hubSetting = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_PRESET_IS_CHANGED](state, payload) {
      state.isPresetChanged = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_DEVICE_ID](state, payload) {
      state.deviceId = payload;
      // const productManufacture = payload.productManufacture
      // if (productManufacture === 0x01) {
      //   switch (payload.productNumber) {
      //     case 3: //uzo
      //       state.insertDeviceName = "UZO";
      //       break;
      //     case 4: //nord
      //       state.insertDeviceName = "NORD";
      //       break;
      //     default:
      //       state.insertDeviceName = "Device";
      //       break;
      //   }
      // } else if (productManufacture == 0x00) {
      //     switch (payload.productNumber) {
      //
      //     }
      // } else {
      //   state.insertDeviceName = "Device";
      // }
      const productManufacture = BRAND_PRODUCT_MAP[`${payload.productManufacture}`];
      if (productManufacture) {
        state.insertDeviceName = "Unknown";
        return;
      }
      const productName = productManufacture[`${payload.productNumber}`];
      if (productManufacture) {
        state.insertDeviceName = "Unknown";
        return;
      }
      state.insertDeviceName = productName;
    },
    [StoreType.COMMIT_TYPE.STATE_IS_DEVICE_SUPPORT_READ](state, payload) {
      state.isDeviceSupportRead = payload;
    },
    [StoreType.COMMIT_TYPE.STATE_PRESET_NAME](state, payload) {
      state.presetName = payload;
      if (payload === "PRESETS") {
        state.presets.forEach(item => {
          if (item.active) {
            item.active = false;
          }
        });
        state.presets = Object.assign([], state.presets);
      }
    },

    [StoreType.COMMIT_TYPE.STATE_SCAN_DEVICE_LIST](state, payload) {
      state.deviceList = payload;
    },

    setDeviceName(state, payload) {
      let deviceInfoFromServer = Object.assign({}, deviceInfoFromServer);
      deviceInfoFromServer.deviceName = payload;
      state.deviceInfoFromServer = deviceInfoFromServer;
    },
    setInsertDeviceName(state, payload) {
      state.insertDeviceName = payload;
    }
  },
  actions: {
    async changeTemperatureMode({ state, commit, rootState }) {
      if (!state.isPresetChanged) {
        //没有改变
        return;
      }
      let presets = state.presets.filter(item => item.active);
      if (!presets) {
        return;
      }

      let temperature = presets[0].heatingModeList[0].temperature.split(",");
      let sixTemperaturePoint = [];

      let secondTemperature = [];
      temperature.forEach((y, x) => {
        secondTemperature.push({ x: x + 1, y });
        if (x < 6) {
          sixTemperaturePoint.push(y);
        }
      });

      const temperatureMode = {
        name: presets[0].heatingModeList[0].operatingModeName,
        secondTemperature
      };
      await bluetoothRepository.writeTemperatureMode(temperatureMode);
      // await cartridge.saveCustomDiyTemperature(
      //   presets[0].id,
      //   sixTemperaturePoint.join(","),
      //   state.podId
      // );
    },

    async keyDownChangeDiyTemperature({ state, commit, rootState }, params) {
      const { temperature } = params;

      let name = state.diyName;
      let secondTemperature = state.diy.secondTemperature;
      secondTemperature.forEach(item => {
        item.y = temperature;
      });
      const temperatureMode = {
        name,
        secondTemperature
      };
      await bluetoothRepository.writeTemperatureMode(temperatureMode);
      commit(StoreType.COMMIT_TYPE.STATE_PRESET_NAME, "PRESETS");
    },

    async afterConnectHandle(context) {
      const { batchId, podId, macAddress, deviceVersion } = context.state;
      // await device.deviceConnection(batchId, macAddress, podId, deviceVersion);

      // let deviceInfoFromServer = await device.getDeviceInfo(
      //       //   context.state.macAddress
      //       // );
      //       // context.commit(
      //       //   StoreType.COMMIT_TYPE.STATE_DEVICE_INFO_FROM_SERVER,
      //       //   deviceInfoFromServer
      //       // );

      //提交状态到vuex
      context.commit(
        StoreType.COMMIT_TYPE.STATE_CONNECT_STATE,
        StoreType.ConnectState.CONNECT_STATE_CONNECTED
      );
      router.replace({ name: "device" });
    },

    async syncSmokeData(context, payload) {},
    async fetchDataAfterInsert(context) {
      await bluetoothRepository.fetchDeviceData();
    },

    async loadPresets(context) {
      // let presetTypes = await cartridge.presetTypes(context.state.podId);
      // if (presetTypes.length !== 0) {
      //   presetTypes[0]["active"] = true;
      // }
      //
      // context.commit(
      //   StoreType.COMMIT_TYPE.STATE_PRESET_FROM_SERVER,
      //   presetTypes
      // );
    },
    async _setDeviceName({ commit }, payload) {
      commit("setDeviceName", payload);
    }
  },
  getters: {
    getInsertDeviceName(state, getters, rootState) {
      return state.insertDeviceName;
    },
    connectState(state, getters, rootState) {
      return state.isConnected ? "CONNECTED" : "DISCONNECTED";
    },
    battery(state, getters, rootState) {
      if (!state.isConnected) {
        return 0;
      }
      return state.battery;
    },

    coilLife(state, getters, rootState) {
      if (!state.isConnected) {
        return 0;
      }
      if (!state.isInsert) {
        return 0;
      }

      return ((1 - state.currentPuff / 10000) * 100).toFixed(0);
    },

    dailyHitsAvg(state, getters, rootState) {
      if (!state.isConnected) {
        return "";
      }

      if (!state.isInsert) {
        return 0;
      }
      return (state.todaySeconds / state.currentPuff / 5).toFixed(0);
    },

    totalHitAvg(state, getters, rootState) {
      if (!state.isConnected) {
        return "";
      }
      if (!state.isInsert) {
        return 0;
      }
      return (state.usageSeconds / state.currentPuff).toFixed(2);
    },

    currentDiyFirstTemperature(state, getters, rootState) {
      if (
        state.diy.secondTemperature &&
        state.diy.secondTemperature.length > 0
      ) {
        return state.diy.secondTemperature[0].y;
      }
      return 300;
    },
    fireMode(state, getters, rootState) {
      return state.fireMode;
    },
    preheatInfo(state, getters, rootState) {
      return state.preheat;
    },
    diyInfo(state, getters, rootState) {
      return state.diy;
    },
    currentPuff(state, getters, rootState) {
      return state.currentPuff;
    },
    todaySeconds(state, getters, rootState) {
      return state.todaySeconds;
    },
    todayPuff(state, getters, rootState) {
      return state.todayPuff;
    },
    //
    isPreheat(state, getters, rootState) {
      return state.isPreheat;
    },
    getDeviceName(state, getters, rootState) {
      return state.isConnected
        ? (state.deviceInfoFromServer &&
            state.deviceInfoFromServer.deviceName) ||
            ""
        : "";
    },
    isConnected(state, getters, rootState) {
      return state.isConnected;
    },

    presetTypes(state, getters, rootState) {
      return state.presets;
    },
    isInsert(state, getters, rootState) {
      return state.isInsert;
    },
    podId(state, getters, rootState) {
      return state.podId;
    },
    selectedPresetItem(state, getters, rootState) {
      if (getters.presetsIsEmpty) {
        return null;
      }

      let filter = getters.presetTypes.filter(item => item.active);
      return filter[0];
    },

    presetsIsEmpty(state, getters, rootState) {
      return state.presets.length === 0;
    },
    //是否在输出
    isFire(state, getters, rootState) {
      return state.isFire || state.isDiyFire;
    },
    //是否在输出
    hasError(state, getters, rootState) {
      return state.hasError;
    },

    presetName(state, getters, rootState) {
      return state.presetName;
    },
    isPaste(state, getters, rootState) {
      return state.oilType === 4;
    },

    isVoltage(state, getters, rootState) {
      return state.oilType === 5;
    },
    macAddress(state, getters, rootState) {
      return state.macAddress;
    },
    cartridgeFlag(state, getters, rootState) {
      return state.cartridgeFlag;
    },
    writerSetting(state, getters, rootState) {
      return state.writerSetting;
    },
    deviceVersion(state, getters, rootState) {
      return state.deviceVersion;
    },
    deviceId(state, getters, rootState) {
      return state.deviceId;
    },
    getHubSetting(state, getters, rootState) {
      return new WriterSetting();
    },
    getDeviceSetting(state, getters, rootState) {
      return new WriterSetting();
    },

  }
};
