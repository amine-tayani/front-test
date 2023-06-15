"use client";

import React, { useState } from "react";
import { Columns, columnsFromBackend } from "./data";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import Result from "./Result";

const Dropzone = () => {
  const [columns, setColumns] = useState<Columns>(columnsFromBackend);
  const [showResults, setShowResults] = useState(false);

  const onDragEnd = (
    result: DropResult,
    columns: Columns,
    setColumns: React.Dispatch<React.SetStateAction<Columns>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <React.Fragment>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="flex mt-5">
          <div className="flex w-full min-h-[10vh] justify-center m-2">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, _) => (
                    <div
                      className="min-h-[100px] flex flex-col min-w-[341px] mr-[45px] p-[15px] rounded-[5px] bg-[#f3f3f3]"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <span className="text-[#10957d] self-start px-2.5 py-0.5 rounded-[5px] bg-[rgba(16,149,125,0.15)]">
                        {column.title}
                      </span>
                      {column.items.map((item, index) => (
                        <Card key={item.input} item={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowResults(true)}
          className="rounded-full py-2 px-6 text-neutral-100 w-full max-w-xs font-semibold bg-green-500 text-center inline-flex justify-center relative select-none"
        >
          <span className="capitalize m-auto flex flex-row gap-x-3 items-center">
            Save
          </span>
        </button>
      </div>
      {Object.entries(columns).map(([_, column], index) => (
        <Result key={index} items={column.items} showResults={showResults} />
      ))}
    </React.Fragment>
  );
};

export default Dropzone;
