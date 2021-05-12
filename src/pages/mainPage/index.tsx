import React, { FC } from 'react';
import { StyledMainPage } from './style';
import JsonEditor from '@/pages/mainPage/JsonEditor';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { useModel } from '@@/plugin-model/useModel';
import { useLockFn, useRequest } from 'ahooks';
import request from '@/request';
import dayjs from 'dayjs';
import store from 'storejs';
const MainPage: FC = () => {
  const dispatch = useDispatch();
  const { socketProperty } = useModel('@@initialState', (model) => ({
    socketProperty: model.initialState,
  }));
  const { msg, sendList } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.msg === right.msg && left.sendList === right.sendList;
    },
  );
  const { run, loading } = useRequest((msg: any) => {
    return request(`${socketProperty?.address}/debug_tool`, {
      method: 'POST',
      data: {
        token: socketProperty?.token,
        msg: msg,
      },
    });
  });
  const sendMsg = useLockFn(async () => {
    const data: { msg: string } = await run(msg);
    message.destroy();
    if (data.msg === 'send successfully') {
      message.success('发送成功');
      const newMsgList = sendList.concat({
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        msg: msg,
      });
      dispatch({
        type: 'layout/save',
        payload: {
          sendList: newMsgList,
        },
      });
      store.set('sendList', newMsgList);
    } else {
      message.success('发送失败');
    }
  });
  return (
    <StyledMainPage>
      <div className={'record'}>112</div>
      <div className={'json'}>
        <JsonEditor />
        <Button
          loading={loading}
          onClick={sendMsg}
          className={'send-btn'}
          size={'large'}
          type={'primary'}
          block={true}
        >
          发送消息
        </Button>
      </div>
    </StyledMainPage>
  );
};
export default MainPage;
