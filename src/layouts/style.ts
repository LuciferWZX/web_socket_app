import styled from 'styled-components';
export const StyledLayout = styled.div`
  min-height: 600px;
`;
export const StyledContent = styled.div`
  height: calc(100vh - 36px);
`;
export const StyledHeader = styled.div`
  height: 36px;
  background-color: #487eb0;
  box-shadow: 0 1px 1px #487eb0;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  .ant-tag {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .setting-btn {
    -webkit-app-region: no-drag;
    color: orange;
  }
`;
export const StyledTooltip = styled.div`
  .switch-div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`;
