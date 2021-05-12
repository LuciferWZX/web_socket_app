export interface SocketProperty {
  address: string;
  token: string;
}
export enum JsonEditSetting {
  type = 'displayDataTypes',
  size = 'displayObjectSize',
}
export interface SendMsg {
  time: string;
  msg: any;
}
