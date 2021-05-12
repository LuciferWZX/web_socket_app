import React, { FC, memo } from 'react';
import { StyledRecordList } from './style';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { RecordItem } from '@/components';
import { useMount } from 'ahooks';
import store from 'storejs';
import { SendMsg } from '@/type';
import { Empty } from 'antd';
const RecordList: FC = () => {
  const dispatch = useDispatch();
  const { sendList } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.sendList === right.sendList;
    },
  );
  useMount(() => {
    const list: SendMsg[] | undefined = store.get('sendList');
    if (list) {
      dispatch({
        type: 'layout/save',
        payload: {
          sendList: list,
        },
      });
    }
  });
  const changeMsg = (msg: any) => {
    dispatch({
      type: 'layout/save',
      payload: {
        msg: msg,
      },
    });
  };
  const deleteItem = (index: number) => {
    const newData = sendList.filter((_, ind) => ind !== index);
    dispatch({
      type: 'layout/save',
      payload: {
        sendList: newData,
      },
    });
    store.set('sendList', newData);
  };
  const editTitle = (newTitle: string | undefined, index: number) => {
    const newData = sendList.map((item, ind) => {
      if (ind === index) {
        return {
          ...item,
          title: newTitle,
        };
      }
      return item;
    });
    dispatch({
      type: 'layout/save',
      payload: {
        sendList: newData,
      },
    });
    store.set('sendList', newData);
  };
  return (
    <StyledRecordList>
      {sendList.map((msgItem, index) => {
        return (
          <RecordItem
            title={msgItem.title}
            onEditTitle={(title) => {
              editTitle(title, index);
            }}
            onDelete={() => {
              deleteItem(index);
            }}
            onClick={() => {
              changeMsg(msgItem.msg);
            }}
            key={index}
            time={msgItem.time}
            msg={JSON.stringify(msgItem.msg)}
          />
        );
      })}
      {sendList.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>暂无记录</span>}
        />
      )}
    </StyledRecordList>
  );
};
export default memo(RecordList);
