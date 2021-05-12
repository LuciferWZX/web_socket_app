import styled from 'styled-components';
export const StyledMainPage = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  .record {
    width: 200px;
  }
  .json {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px;
    overflow: auto;

    word-break: break-all;

    .send-btn {
      margin-top: 10px;
    }
  }
`;
export const StyledJsonEditor = styled.div`
  flex: 1;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0);
  :hover {
    border-color: #74b9ff;
  }
`;
