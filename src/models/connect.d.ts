import { LayoutModelState } from '@/models/layout';
export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    layout?: boolean;
  };
}
export interface ConnectState {
  loading: Loading;
  layout: LayoutModelState;
}
