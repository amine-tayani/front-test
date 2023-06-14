"use client";

import React from "react";
import { Props } from "@/app/types/item";
import { Droppable } from "react-beautiful-dnd";

const RightDropzone: React.FC<Props> = ({ items, handleInputChange }) => {
  return (
    <Droppable droppableId="right">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="min-h-200px bg-neutral-100 rounded-lg p-4"
        >
          {items.map((item) => (
            <div key={item.id} className="bg-blue-200 p-2 m-2">
              {item.type === "text" && (
                <input
                  type="text"
                  value={item.input as string}
                  onChange={(event) => handleInputChange(event, item.id)}
                />
              )}
              {item.type === "select" && (
                <select
                  value={item.input as string}
                  onChange={(event) => handleInputChange(event, item.id)}
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
                  onChange={(event) => handleInputChange(event, item.id)}
                />
              )}
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default RightDropzone;
