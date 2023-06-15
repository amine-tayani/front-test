import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardProps } from "../types/item";

const Card: React.FC<CardProps> = ({ item, index }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    item.input = value;
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col justify-center items-start min-h-[80px] max-w-[311px] mt-[15px] px-5 py-0 rounded-[5px] bg-white">
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
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
