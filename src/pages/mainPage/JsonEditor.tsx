import React, { FC, useEffect, useState } from 'react';
import { StyledJsonEditor } from './style';
import ReactJson from 'react-json-view';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';

const JsonEditor: FC = () => {
  const dispatch = useDispatch();
  const { jsonSetting } = useSelector(
    (state: ConnectState) => state.layout,
    (left, right) => {
      return left.jsonSetting === right.jsonSetting;
    },
  );
  const [jsonValue, setJson] = useState({});
  useEffect(() => {
    dispatch({
      type: 'layout/save',
      payload: {
        msg: jsonValue,
      },
    });
  }, [jsonValue]);

  const onPaste = (e: any) => {
    const parseText = e.clipboardData.getData('Text');
    try {
      const data = JSON.parse(parseText);
      setJson(data);
    } catch (e) {
      setJson(parseText);
    }
  };
  return (
    <StyledJsonEditor onPaste={onPaste}>
      <ReactJson
        src={jsonValue}
        name={false}
        style={{ width: '100%' }}
        displayDataTypes={jsonSetting.displayDataTypes}
        displayObjectSize={jsonSetting.displayObjectSize}
        theme={'google'}
        onEdit={(edit) => {
          setJson(edit.updated_src);
        }}
        onAdd={(edit) => {
          setJson(edit.updated_src);
        }}
        onDelete={(edit) => {
          console.log(edit.updated_src);
          setJson(edit.updated_src);
        }}
      />
    </StyledJsonEditor>
  );
};
export default JsonEditor;
