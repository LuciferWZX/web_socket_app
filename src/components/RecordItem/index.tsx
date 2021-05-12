import React, { FC, memo, useRef } from 'react';
import { StyledRecordItem } from './style';
import { Button, Input, Space, Tag } from 'antd';
import { useHover, useReactive, useUpdateEffect } from 'ahooks';
import {
  CheckOutlined,
  CloseOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
interface IProps {
  time: string;
  title?: string;
  msg: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onEditTitle?: (newTitle: string | undefined) => void;
}
interface IState {
  isEdit: boolean;
  title: string | undefined;
}
const RecordList: FC<IProps> = ({
  onEditTitle,
  title,
  time,
  msg,
  onClick,
  onDelete,
}) => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const state = useReactive<IState>({
    isEdit: false,
    title: '',
  });
  useUpdateEffect(() => {
    state.title = title;
  }, [title]);
  return (
    <StyledRecordItem ref={ref} onClick={onClick}>
      <div
        className={'title'}
        onDoubleClick={() => {
          state.isEdit = true;
        }}
      >
        {state.isEdit ? (
          <div className={'edit-title'}>
            <Input
              className={'edit-input'}
              size={'small'}
              onChange={(e) => {
                state.title = e.target.value;
              }}
              onPressEnter={(_) => {
                onEditTitle?.(state.title);
                state.isEdit = false;
              }}
              value={state.title}
            />
            <Space direction={'horizontal'}>
              <Button
                onClick={() => {
                  state.isEdit = false;
                }}
                danger={true}
                type={'primary'}
                size={'small'}
                icon={<CloseOutlined />}
              />
              <Button
                onClick={() => {
                  onEditTitle?.(state.title);
                  state.isEdit = false;
                }}
                type={'primary'}
                icon={<CheckOutlined />}
                size={'small'}
              />
            </Space>
          </div>
        ) : (
          title ?? '未命名'
        )}
      </div>
      {isHovering && (
        <PlusCircleFilled
          onClick={onDelete}
          rotate={45}
          className={'delete-icon'}
        />
      )}
      <div className={'record-item'}>
        时间:
        <Tag className={'content'} color={'green'}>
          {time}
        </Tag>
      </div>
      <div className={'record-item'}>
        消息:
        <Tag className={'content'} style={{ width: '100%' }} color={'cyan'}>
          {msg}
        </Tag>
      </div>
    </StyledRecordItem>
  );
};
export default memo(RecordList);
