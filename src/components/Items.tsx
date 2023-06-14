"use client";

import React from "react";
import { Item } from "./Dropzone";

interface ItemProps {
  items: Item[];
}

const ItemsTable: React.FC<ItemProps> = ({ items }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4">Saved Items</h2>
      <table className="table-auto mt-2">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.value.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
