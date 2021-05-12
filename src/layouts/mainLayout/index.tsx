import React, { FC, memo } from 'react';
import { StyledMainLayout } from './style';
const MainLayout: FC = ({ children }) => {
  return <StyledMainLayout>{children}</StyledMainLayout>;
};
export default memo(MainLayout);
