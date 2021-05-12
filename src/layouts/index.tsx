import React, { FC } from 'react';
import {
  StyledContent,
  StyledHeader,
  StyledLayout,
  StyledTooltip,
} from './style';
import { Button, Popover, Switch, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { JsonEditSetting } from '@/type';
import { history } from 'umi';
const Layout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { socketProperty } = useModel('@@initialState', (model) => ({
    socketProperty: model.initialState,
  }));
  const { jsonSetting } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.jsonSetting === right.jsonSetting;
    },
  );
  const changeSetting = (checked: boolean, setting: JsonEditSetting): void => {
    switch (setting) {
      case JsonEditSetting.type: {
        dispatch({
          type: 'layout/save',
          payload: {
            jsonSetting: {
              ...jsonSetting,
              displayDataTypes: checked,
            },
          },
        });
        break;
      }
      case JsonEditSetting.size: {
        dispatch({
          type: 'layout/save',
          payload: {
            jsonSetting: {
              ...jsonSetting,
              displayObjectSize: checked,
            },
          },
        });
        break;
      }
    }
  };
  const content = (
    <StyledTooltip>
      <div className={'switch-div'}>
        <Switch
          onChange={(checked) => {
            changeSetting(checked, JsonEditSetting.type);
          }}
          checked={jsonSetting.displayDataTypes}
          style={{ marginRight: 10 }}
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />
        显示类型
      </div>
      <div className={'switch-div'}>
        <Switch
          onChange={(checked) => {
            changeSetting(checked, JsonEditSetting.size);
          }}
          checked={jsonSetting.displayObjectSize}
          style={{ marginRight: 10 }}
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />
        显示size
      </div>
    </StyledTooltip>
  );
  const goSetting = () => {
    history.replace('/connectLayout/connect');
  };
  return (
    <StyledLayout>
      <StyledHeader>
        {socketProperty?.address && (
          <Tag className={'ant-tag'} onClick={goSetting} color={'green'}>
            当前连接地址：{socketProperty.address}
          </Tag>
        )}
        {socketProperty?.address && (
          <Popover placement={'topRight'} content={content} trigger="hover">
            <Button className={'setting-btn'} type={'link'}>
              设置
            </Button>
          </Popover>
        )}
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};
export default Layout;
