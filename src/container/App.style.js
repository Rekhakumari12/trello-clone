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
      width: 280px!important;
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
  .card{
    overflow-wrap: break-word;
    text-transform: capitalize;
  }
`;
export const SpanText = styled.div`
  color: gray;
`
export const TextAreaWrapper = styled.div`
  .area-editable{
    padding: 10px;
    border: 2px solid rgb(0 0 0 / 9%);
    border-radius: 5px;
    background-color:transparent ;
    font-weight: bold;
    text-transform:capitalize ;
    &:focus-visible{
      border: 2px solid rgb(12 12 209 / 39%);
      outline: none;
    }
  }
`;


