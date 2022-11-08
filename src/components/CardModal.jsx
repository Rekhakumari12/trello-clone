import React, { useState, memo } from "react";
import SmallButton from "./SmallButton";
import { Modal, Box, Typography, TextareaAutosize } from "@mui/material";
import ReactTextareaAutosize from "react-textarea-autosize";
import { TextAreaWrapper } from "../container/App.style";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  overflowWrap: "break-word",
};

const CardModal = ({ isOpen, setIsOpen, card, data, setData }) => {
  const [description, setDesc] = useState(card.description);
  const [isEdit, setIsEdit] = useState(false);
  const [updateCardTitle, setUpdateCardTitle] = useState(card.cardName);
  const filterData = (entity) => (c) => {
    if (c.id === card.id) {
      if (entity === "desc") {
        return (c.description = description);
      }
      if (entity === "cardTitle") {
        return (c.cardName = updateCardTitle);
      }
    }
  };
  const handleSubmit = () => {
    data.lists[card.listId].cards.filter(filterData("desc"));
    data.lists[card.listId].cards.filter(filterData("cardTitle"));
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
    setIsEdit(false);
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      aria-labelledby="modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextAreaWrapper>
          <ReactTextareaAutosize
            defaultValue={card.cardName}
            className="area-editable"
            onChange={(e) => setUpdateCardTitle(e.target.value)}
            onClick={() => setIsEdit(true)}
            style={{ width: "100%" }}
          />
        </TextAreaWrapper>
        <br />
        <Typography variant="caption" display="block" gutterBottom>
          Status in <u>{card.listName}</u>
          <br />
          Created at <u>{card.createdAt}</u>
        </Typography>
        <br />
        <div className="flex items-center">
          <TextareaAutosize
            className="mr-2 area-editable"
            placeholder="Enter description..."
            style={{
              width: 550,
              border: "1px solid gray",
              padding: "3px 5px",
              borderRadius: "4px",
            }}
            onChange={(e) => setDesc(e.target.value)}
            onClick={() => setIsEdit(true)}
            defaultValue={description}
          />
        </div>
        <br />
        <SmallButton name="close" handleClick={() => setIsOpen(!isOpen)} />
        &nbsp;
        {isEdit && <SmallButton name="save" handleClick={handleSubmit} />}
      </Box>
    </Modal>
  );
};
export default memo(CardModal);
