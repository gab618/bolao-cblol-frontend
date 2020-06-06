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
    margin-bottom: 15px;
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

  .MuiPaper-root {
    background-color: #2c3036;
  }

  .MuiTablePagination-selectIcon {
    color: #fff;
  }

  .MuiTablePagination-menuItem {
    color: #000;
  }
`;
