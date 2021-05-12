import React, { FC } from 'react';
import {
  StyledContent,
  StyledHeader,
  StyledLayout,
  StyledTooltip,
} from './style';
import { AutoComplete, Button, Popover, Switch, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import { JsonEditSetting } from '@/type';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import AddTokenModal from '@/layouts/AddTokenModal';
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
  const openModal = () => {
    dispatch({
      type: 'layout/save',
      payload: {
        addTokenModalVisible: true,
      },
    });
  };
  return (
    <StyledLayout>
      <StyledHeader>
        <div>
          {socketProperty?.address && (
            <Tag className={'ant-tag'} onClick={goSetting} color={'green'}>
              当前连接地址：{socketProperty.address}
            </Tag>
          )}
          {socketProperty?.address && [
            <Tag className={'ant-tag'} color={'cyan'}>
              当前token：默认
            </Tag>,

            <Button
              key={'add-token'}
              onClick={openModal}
              size={'small'}
              type={'primary'}
              className={'add-btn'}
              icon={<PlusOutlined />}
            />,
          ]}
        </div>
        {socketProperty?.address && (
          <Popover placement={'topRight'} content={content} trigger="hover">
            <Button className={'setting-btn'} type={'link'}>
              设置
            </Button>
          </Popover>
        )}
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <AddTokenModal />
    </StyledLayout>
  );
};
export default Layout;
