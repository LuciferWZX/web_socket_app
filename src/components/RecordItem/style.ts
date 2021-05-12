import styled from 'styled-components';
export const StyledRecordItem = styled.div`
  //overflow: hidden;
  border: 1px solid rgba(72, 219, 251, 1);
  margin-bottom: 10px;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
  position: relative;
  .edit-title {
    display: flex;
    align-items: center;
    .edit-input {
      margin-right: 5px;
    }
  }
  .title {
    font-size: 12px;
    color: rgba(255, 159, 67, 1);
  }
  .delete-icon {
    color: rgba(255, 107, 107, 1);
    position: absolute;
    left: 1px;
    top: 1px;
  }
  :hover {
    background-color: rgba(34, 47, 62, 1);
  }
  .content {
    //width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .record-item {
    display: flex;
    align-items: center;
    :not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;
