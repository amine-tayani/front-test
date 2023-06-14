"use client";

import React, { useState } from "react";
import { Item } from "@/app/types/item";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import LeftDropzone from "@/components/LeftDropzone";
import RightDropzone from "@/components/RightDropzone";

const Dropzone: React.FC = () => {
  const [leftItems, setLeftItems] = useState<Item[]>([
    {
      id: "1",
      content: "Item 1",
      input: "",
      type: "text",
    },
    {
      id: "2",
      content: "Item 2",
      input: "",
      type: "checkbox",
    },
    {
      id: "3",
      content: "Item 3",
      input: "",
      type: "select",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ]);

  const [rightItems, setRightItems] = useState<Item[]>([]);

  const [tableData, setTableData] = useState<Item[]>([]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (destination === undefined || destination === null) return null;

    if (destination.index === source.index) return null;

    if (source.droppableId === destination.droppableId) {
      const items =
        source.droppableId === "left" ? [...leftItems] : [...rightItems];
      const draggedItem = items[source.index];

      items.splice(source.index, 1);
      items.splice(destination.index, 0, draggedItem);

      if (source.droppableId === "left") {
        setLeftItems(items);
      } else {
        setRightItems(items);
      }
    } else {
      // Move items between drop zones
      const sourceItems = [...leftItems];
      const destinationItems = [...rightItems];
      const [draggedItem] = sourceItems.splice(source.index, 1);

      draggedItem.input = ""; // Reset input value when moving to the right drop zone

      destinationItems.splice(destination.index, 0, draggedItem);

      setLeftItems(sourceItems);
      setRightItems(destinationItems);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const items = [...rightItems];
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      items[index].input = e.target.value;
      setRightItems(items);
    }
  };

  const handleSave = () => {
    setTableData(rightItems);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Drag and Drop App</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h2 className="text-xl font-bold mb-2">Left Drop Zone</h2>
            <LeftDropzone
              items={leftItems}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-bold mb-2">Right Drop Zone</h2>
            <RightDropzone
              items={rightItems}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </DragDropContext>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>

      {tableData.length > 0 && (
        <div className="mt-8">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-neutral-300">
              <thead className="text-xs text-neutral-800 uppercase bg-neutral-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Input
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id} className="bg-neutral-100 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      {item.id}
                    </th>
                    <td className="px-6 py-4 text-neutral-900">
                      {item.content}
                    </td>
                    <td className="px-6 py-4 text-neutral-900">{item.input}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
