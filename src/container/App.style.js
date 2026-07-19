import styled from "styled-components";

export const BoardWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  color: #1f2937;

  .sidebar {
    border-right: 1px solid #e5e7eb;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(14px);
    padding: 16px 12px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #111827;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 28px;
  }

  .brandMark {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    color: #fff;
    background: linear-gradient(135deg, #8b5cf6, #4f46e5);
    box-shadow: 0 10px 22px rgba(79, 70, 229, 0.22);
  }

  .sidebarNav {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .navItem {
    width: 100%;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border-radius: 8px;
    color: #6d5df6;
    background: #f1efff;
    font: inherit;
    font-weight: 700;
    text-align: left;
  }

  .navIcon {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-radius: 4px;
    position: relative;
  }

  .navIcon::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-top: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }

  .mainContent {
    min-width: 0;
    padding: 28px 28px 40px;
    overflow-x: auto;
  }

  .boardHeader {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .boardHeader h1 {
    margin: 0;
    color: #111827;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 800;
  }

  .boardIcon {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: linear-gradient(135deg, #8b5cf6, #5b5ce2);
    box-shadow: 0 12px 28px rgba(91, 92, 226, 0.28);
    position: relative;
  }

  .boardIcon::before,
  .boardIcon::after {
    content: "";
    position: absolute;
    border: 2px solid rgba(255, 255, 255, 0.88);
    border-radius: 3px;
  }

  .boardIcon::before {
    width: 16px;
    height: 16px;
    top: 9px;
    left: 9px;
  }

  .boardIcon::after {
    width: 11px;
    height: 11px;
    right: 9px;
    bottom: 9px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    gap: 22px;
    align-items: flex-start;
    li {
      border-radius: 8px;
      width: 300px!important;
    }
  }

  .board {
    min-width: max-content;
  }

  .list {
    background: rgba(248, 250, 252, 0.92);
    border: 1px solid #e5e7eb;
    box-shadow: 0 16px 35px rgba(15, 23, 42, 0.06);
  }

  .addListPanel {
    background: rgba(255, 255, 255, 0.7);
    border: 1px dashed #cfd6e4;
    box-shadow: none;
    padding: 12px;
  }

  .addListPanel .listFooter {
    justify-content: center;
    border-radius: 8px;
    color: #6d5df6;
    background: #f1efff;
    padding: 12px;
  }

  .addListPanel input {
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
  }

  .listHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .cardCount {
    color: #8b95a7;
    font-size: 14px;
    font-weight: 700;
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

  .taskCard {
    background: #fff;
    border: 1px solid #edf0f5;
    border-radius: 8px;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
    cursor: pointer;
    margin: 12px 0;
    padding: 14px;
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  }

  .taskCard:hover {
    border-color: #d8dffa;
    box-shadow: 0 12px 24px rgba(79, 70, 229, 0.1);
    transform: translateY(-1px);
  }

  .card {
    overflow-wrap: break-word;
    text-transform: capitalize;
    color: #1f2937;
    font-weight: 700;
    line-height: 1.4;
  }

  .cardMeta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
  }

  .metaLeft {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .priorityBadge {
    border-radius: 6px;
    color: #16a34a;
    background: #dcfce7;
    font-size: 12px;
    font-weight: 800;
    padding: 4px 10px;
  }

  .cardDate {
    color: #6b7280;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .assignee {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(135deg, #111827, #6d5df6);
    font-size: 11px;
    font-weight: 800;
    flex: 0 0 auto;
  }

  .listFooter {
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    padding: 10px 2px 2px;
  }

  .addButton {
    background: #6d5df6;
    border: 0;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    padding: 8px 12px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;

    .sidebar {
      border-right: 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .brand {
      margin-bottom: 12px;
    }

    .mainContent {
      padding: 22px 16px 32px;
    }
  }
`;
export const SpanText = styled.div`
  color: #7b8494;
  font-size: 13px;
  font-weight: 500;
  margin-top: 5px;
`
export const TextAreaWrapper = styled.div`
  .area-editable{
    padding: 0;
    border: 2px solid transparent;
    border-radius: 6px;
    background-color:transparent ;
    color: #1f2937;
    font-weight: 800;
    text-transform:capitalize ;
    &:focus-visible{
      border: 2px solid rgb(109 93 246 / 30%);
      outline: none;
    }
  }
`;
