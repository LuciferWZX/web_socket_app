import React, { FC, Fragment, useEffect } from 'react';
import { useModel, history, useDispatch } from 'umi';
import { useMount } from 'ahooks';
import { TokenItem } from '@/type';
import store from 'storejs';
const InitDataWrapper: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { socketProperty } = useModel('@@initialState', (model) => ({
    socketProperty: model.initialState,
  }));
  useEffect(() => {
    if (!socketProperty) {
      history.replace('/connectLayout/connect');
    }
  }, [socketProperty]);
  useMount(() => {
    const list: TokenItem[] | undefined = store.get('tokenList');
    if (list) {
      dispatch({
        type: 'layout/save',
        payload: {
          tokenList: list,
        },
      });
    }
  });
  return <Fragment>{children}</Fragment>;
};
export default InitDataWrapper;
