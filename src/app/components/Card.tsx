import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { CardProps, Item } from "../types/item";

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
  min-height: 80px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;
`;

const Card: React.FC<CardProps> = ({ item, index }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    item.input = e.target.value;
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Item>
            {item.type === "text" && (
              <input
                className="border-2 border-gray-300 p-2"
                type="text"
                value={item.input as string}
                onChange={(event) => handleInputChange(event)}
              />
            )}
            {item.type === "select" && (
              <select
                value={item.input as string}
                onChange={(event) => handleInputChange(event)}
              >
                {item.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {item.type === "checkbox" && (
              <input
                type="checkbox"
                checked={item.input as boolean}
                onChange={(event) => handleInputChange(event)}
              />
            )}
          </Item>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
