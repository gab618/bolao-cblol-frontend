import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 920px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  span {
    font-weight: bold;
    text-align: center;
    font-size: 24px;
  }

  th {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  td {
    font-size: 18px;
    color: #fff;
  }

  table,
  td,
  th {
    border-bottom: 1px solid rgb(87, 95, 104);
  }

  table {
    height: calc(100vh - 200px);
    max-height: 600px;
  }

  .MuiPaper-root {
    margin-top: 15px;
    background-color: #2c3036;
    height: calc(100vh - 200px);
    max-height: 600px;
  }

  .MuiTablePagination-selectIcon {
    color: #fff;
  }

  .MuiTablePagination-menuItem {
    color: #000;
  }

  .MuiChip-label {
    font-size: 12px !important;
    display: flex;
    align-self: center;
  }

  .MuiAvatar-root {
    min-height: 64px;
    min-width: 64px;
  }

  .MuiFormControlLabel-root {
    color: #fff;
  }

  .MuiFormGroup-root {
    margin-left: 20px;
    margin-top: 8px;
  }
`;
