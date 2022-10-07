import styled from "styled-components";

export const BoardWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    li {
      border-radius: 3px;
      width: 280px;
    }
  }
  textarea {
    resize: none;
    border: none;
    font-size: 1rem;
    width: 100%;
    padding: 0;
    font-family: inherit;
  }
  svg {
    path {
      fill: #64748b;
    }
    cursor: pointer;
  }

  input {
    padding: 10px 10px 35px 10px;
    outline: none;
    border-radius: 5px;
  }
`;

export const BoardHeader = styled.div``;

// export const List = styled.li`

// `
