import React, { FC, Fragment, useEffect } from 'react';
import { useModel, history } from 'umi';
const InitDataWrapper: FC = ({ children }) => {
  const { socketProperty } = useModel('@@initialState', (model) => ({
    socketProperty: model.initialState,
  }));
  useEffect(() => {
    if (!socketProperty) {
      history.replace('/connectLayout/connect');
    }
  }, [socketProperty]);

  return <Fragment>{children}</Fragment>;
};
export default InitDataWrapper;
