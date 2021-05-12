import { ImmerReducer } from 'umi';
import { SendMsg, TokenItem } from '@/type';

export interface JsonSetting {
  displayDataTypes: boolean;
  displayObjectSize: boolean;
}
export interface LayoutModelState {
  //socketList
  sendList: SendMsg[];
  jsonSetting: JsonSetting;
  msg: any;
  addTokenModalVisible: boolean;
  tokenList: TokenItem[];
}
export interface LayoutModelType {
  // 命名空间
  namespace: 'layout';
  // 模块状态
  state: LayoutModelState;
  // 网络操作
  effects: {};
  // 本地操作
  reducers: {
    // 保存到state
    save: ImmerReducer<LayoutModelState>;
  };
}
const LayoutModel: LayoutModelType = {
  namespace: 'layout',
  state: {
    sendList: [],
    jsonSetting: {
      displayDataTypes: true, //展示数据类型
      displayObjectSize: true, //展示大小
    },
    msg: undefined,
    addTokenModalVisible: false,
    tokenList: [],
  },
  effects: {},
  reducers: {
    save(state: LayoutModelState, { payload }: any) {
      Object.keys(payload).forEach((key) => {
        // @ts-expect-error
        state[key] = payload[key];
      });
    },
  },
};
export default LayoutModel;
