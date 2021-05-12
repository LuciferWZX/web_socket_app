import React, { FC } from 'react';
import { StyledJsonEditor } from './style';
import ReactJson from 'react-json-view';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';

const JsonEditor: FC = () => {
  const dispatch = useDispatch();
  const { jsonSetting, msg } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.jsonSetting === right.jsonSetting && left.msg === right.msg;
    },
  );

  const onPaste = (e: any) => {
    const parseText = e.clipboardData.getData('Text');
    try {
      const data = JSON.parse(parseText);
      dispatch({
        type: 'layout/save',
        payload: {
          msg: data,
        },
      });
    } catch (e) {
      //setJson(parseText);
      dispatch({
        type: 'layout/save',
        payload: {
          msg: parseText,
        },
      });
    }
  };
  return (
    <StyledJsonEditor onPaste={onPaste}>
      <ReactJson
        src={msg}
        name={false}
        style={{ width: '100%' }}
        displayDataTypes={jsonSetting.displayDataTypes}
        displayObjectSize={jsonSetting.displayObjectSize}
        theme={'google'}
        onEdit={(edit) => {
          dispatch({
            type: 'layout/save',
            payload: {
              msg: edit.updated_src,
            },
          });
        }}
        onAdd={(edit) => {
          dispatch({
            type: 'layout/save',
            payload: {
              msg: edit.updated_src,
            },
          });
        }}
        onDelete={(edit) => {
          dispatch({
            type: 'layout/save',
            payload: {
              msg: edit.updated_src,
            },
          });
        }}
      />
    </StyledJsonEditor>
  );
};
export default JsonEditor;
