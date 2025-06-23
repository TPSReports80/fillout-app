"use client";

import React from "react";
import { X } from "lucide-react";

interface NameModalProps {
  isOpen: boolean;
  customPageName: string;
  onCustomPageNameChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onReset: () => void;
  onAddPage: () => void;
  insertAtIndex: number | null;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  customPageName,
  onCustomPageNameChange,
  onKeyDown,
  onReset,
  onAddPage,
  nameInputRef,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Name Your Page
          </h3>
          <button
            onClick={onReset}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="pageName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Page Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="pageName"
            value={customPageName}
            onChange={(e) => onCustomPageNameChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter page name..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAddPage}
            disabled={!customPageName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Create Page
          </button>
        </div>
      </div>
    </div>
  );
};
