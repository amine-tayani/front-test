"use client";

import React from "react";
import { ResultProps } from "@/app/types/item";

const Result: React.FC<ResultProps> = ({ items, showResults }) => {
  return (
    <div>
      {items?.length > 0 && showResults && (
        <div className="mt-8 flex justify-center">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full max-w-lg text-sm text-left text-neutral-300">
              <thead className="text-xs text-neutral-800 uppercase bg-neutral-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    value
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="bg-neutral-100 ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
                    >
                      {item.id}
                    </th>
                    <td className="px-6 py-4 text-neutral-900">{item.type}</td>
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

export default Result;
