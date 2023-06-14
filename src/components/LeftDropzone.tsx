"use client";

import React from "react";
import { Props } from "@/app/types/item";
import { Draggable, Droppable } from "react-beautiful-dnd";

const LeftDropzone: React.FC<Props> = ({ items, handleInputChange }) => {
  return (
    <Droppable droppableId="left">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="min-h-200px bg-neutral-100 rounded-lg p-4"
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-gray-200 p-2 m-2"
                >
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
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default LeftDropzone;
