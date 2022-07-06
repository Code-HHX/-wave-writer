const CONNECT_STATE_DISCONNECTED = 1;
const CONNECT_STATE_CONNECTING = 2;
const CONNECT_STATE_CONNECTED = 3;

const FIRE_MODE_PREHEAT = 1;
const FIRE_MODE_DOSAGE = 2;
const FIRE_MODE_TEMPERATURE = 3;

const PREHEAT_STATUS_ENTER_PREHEAT = 1;
const PREHEAT_STATUS_EXIT_PREHEAT = 2;
const PREHEAT_STATUS_START_PREHEAT = 3;
const PREHEAT_STATUS_END_PREHEAT = 4;

export const BLUETOOTH_MODULE_NAME = "bluetooth/";

export const STATE_CONNECT_STATE = "connect_state"; //连接状态
export const STATE_CARTRIDGE_IS_INSERT = "cartridge_is_insert"; //是否插入烟弹
export const STATE_BATTERY = "battery"; //电池电量
export const STATE_CURRENT_PUFF = "current_puff"; //总口数
export const STATE_MAX_PUFF = "max_puff"; //最大口数
export const STATE_PREHEAT = "preheat"; //设备的预热
export const STATE_DIY = "diy"; //diy温度
export const STATE_TODAY_SECONDS = "today_seconds"; //今日抽烟秒数
export const STATE_TODAY_PUFF = "today_seconds"; //今日抽烟秒数
export const STATE_TOTAL_SECONDS = "total_seconds"; //今日抽烟秒数
export const STATE_USAGE_SECONDS = "usage_seconds"; //当前烟弹已经使用秒数
export const STATE_DEVICE_VERSION = "device_version"; //设备版本信息
export const STATE_SMOKE_DATA = "smoke_data"; //离线使用的数据
export const STATE_MAC_ADDRESS = "mac_address"; //设备mac 地址
export const STATE_IS_NEED_SYNC = "is_need_sync"; //是否需要同步数据
export const STATE_DEVICE_NAME = "device_name"; //设备名字
export const STATE_FIRE_MODE = "fire_mode"; //点火模式
export const STATE_IS_FIRE = "is_fire"; //是否点火
export const STATE_IS_DIY_FIRE = "is_diy_fire"; //是否diy点火
export const STATE_IS_PREHEAT = "is_preheat"; //是否预热
export const STATE_IS_DIY = "is_diy"; //是否启动diy
export const STATE_BATCH_ID = "batch_id"; //批次id
export const STATE_POD_ID = "pod_id"; //烟弹id
export const STATE_OIL_TYPE = "oil_type"; //烟油类型
export const STATE_BRAND_TYPE = "brand_type"; //品牌类型
export const STATE_CAPACITY = "capacity"; //溶剂容量
export const STATE_FLAVOR = "flavor"; //口味
export const STATE_MANUFACTURE = "manufacture"; //厂商
export const STATE_COUNTRY = "country"; //国家地区
export const STATE_CITY = "city"; //城市地区
export const STATE_THICKNESS = "thickness"; //浓稠度
export const STATE_CARTRIDGE_FLAG = "cartridge_flag"; //烟弹标识符
export const STATE_OIL_CONTENT = "oil_content"; //烟油含量
export const STATE_ATOMIZING_WIRE = "atomizing_wire"; //雾化丝类型
export const STATE_COMMAND_RESISTANCE = "command_resistance"; //阻值
export const STATE_CONSTANT_TEMPERATURE = "constant_temperature"; //恒温
export const STATE_HEATING_FACTOR = "heating_factor"; //加热系数
export const STATE_IS_LOCK = "is_lock"; //设备是否锁定
export const STATE_IS_BIND = "is_bind"; //设备是否绑定
export const STATE_ENCRYPT_TYPE = "encrypt_type"; //加密类型
export const STATE_USER_ID_FLAG = "user_id_flag"; //用户标识
export const STATE_DEVICE_TIME = "sync_time"; //当前时间
export const STATE_PREHEAT_NAME = "preheat_name"; //预热名称
export const STATE_DIY_NAME = "diy_name"; //diy名称
export const STATE_ACTIVE_TIME = "active_time"; //diy名称
export const STATE_BLUETOOTH_VERSION = "bluetooth_version"; //diy名称
//蓝牙不相关的
export const STATE_TEMP_TEMPERATURE_MODE = "temp_temperature_mode"; //保存临时的diy温度变量
export const STATE_DEVICE_INFO_FROM_SERVER = "device_info_from_server"; //保存临时的diy温度变量
export const STATE_PRESET_FROM_SERVER = "preset_from_server"; //修改后的服务器预设参数
export const STATE_PRESET_FROM_SERVER_ORIGIN =
  "state_preset_from_server_origin"; //原始的服务器预设参数，用于恢复默认值
export const STATE_PRESET_IS_CHANGED = "preset_is_changed"; //预设参数是否改变
export const STATE_PRESET_NAME = "preset_name"; //预设参数是否改变
export const STATE_CURRENT_WRITER_SETTING = "current_writer_setting"; //预设参数是否改变
export const STATE_CURRENT_HUB_SETTING = "current_hub_setting"; //预设参数是否改变
export const STATE_DEVICE_ID = "device_id"; //预设参数是否改变
export const STATE_IS_DEVICE_SUPPORT_READ = "is_device_support_read"; //预设参数是否改变

export const STATE_SCAN_DEVICE_LIST = "scan_device_list"; //扫描的蓝牙

export default {
  ConnectState: {
    CONNECT_STATE_DISCONNECTED,
    CONNECT_STATE_CONNECTING,
    CONNECT_STATE_CONNECTED
  },
  COMMIT_TYPE: {
    STATE_CONNECT_STATE,
    STATE_CARTRIDGE_IS_INSERT,
    STATE_BATTERY,
    STATE_CURRENT_PUFF,
    STATE_MAX_PUFF,
    STATE_PREHEAT,
    STATE_DIY,
    STATE_TODAY_SECONDS,
    STATE_TODAY_PUFF,
    STATE_TOTAL_SECONDS,
    STATE_USAGE_SECONDS,
    STATE_DEVICE_VERSION,
    STATE_SMOKE_DATA,
    STATE_MAC_ADDRESS,
    STATE_IS_NEED_SYNC,
    STATE_DEVICE_NAME,
    STATE_FIRE_MODE,
    STATE_IS_FIRE,
    STATE_IS_DIY_FIRE,
    STATE_IS_PREHEAT,
    STATE_BATCH_ID,
    STATE_POD_ID,
    STATE_OIL_TYPE,
    STATE_CAPACITY,
    STATE_FLAVOR,
    STATE_MANUFACTURE,
    STATE_COUNTRY,
    STATE_CITY,
    STATE_THICKNESS,
    STATE_CARTRIDGE_FLAG,
    STATE_OIL_CONTENT,
    STATE_ATOMIZING_WIRE,
    STATE_COMMAND_RESISTANCE,
    STATE_CONSTANT_TEMPERATURE,
    STATE_HEATING_FACTOR,
    STATE_IS_LOCK,
    STATE_IS_BIND,
    STATE_ENCRYPT_TYPE,
    STATE_USER_ID_FLAG,
    STATE_DEVICE_TIME,
    STATE_BRAND_TYPE,
    STATE_PREHEAT_NAME,
    STATE_DIY_NAME,
    STATE_IS_DIY,
    STATE_TEMP_TEMPERATURE_MODE,
    STATE_DEVICE_INFO_FROM_SERVER,
    STATE_ACTIVE_TIME,
    STATE_BLUETOOTH_VERSION,
    STATE_PRESET_FROM_SERVER,
    STATE_PRESET_FROM_SERVER_ORIGIN,
    STATE_PRESET_IS_CHANGED,
    STATE_PRESET_NAME,
    STATE_CURRENT_WRITER_SETTING,
    STATE_CURRENT_HUB_SETTING,
    STATE_DEVICE_ID,
    STATE_IS_DEVICE_SUPPORT_READ,
    STATE_SCAN_DEVICE_LIST
  },
  PREHEAT_TYPE: {
    PREHEAT_STATUS_ENTER_PREHEAT,
    PREHEAT_STATUS_EXIT_PREHEAT,
    PREHEAT_STATUS_START_PREHEAT,
    PREHEAT_STATUS_END_PREHEAT
  },
  FIRE_MODE_TYPE: {
    FIRE_MODE_PREHEAT,
    FIRE_MODE_DOSAGE,
    FIRE_MODE_TEMPERATURE
  }
};
