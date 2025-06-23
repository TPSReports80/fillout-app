"use client";

import React, { useEffect, useRef } from "react";
import { Edit, Copy, Trash2, Flag, Clipboard } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onSetAsFirst?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    {
      icon: Flag,
      label: "Set as first page",
      onClick: () => {},
      className: "text-black hover:bg-gray-100 [&>svg]:text-blue-600",
    },
    {
      icon: Edit,
      label: "Rename",
      onClick: () => {},
      className: "text-black hover:bg-gray-100 [&>svg]:text-gray-500",
    },
    {
      icon: Clipboard,
      label: "Copy",
      onClick: () => {},
      className: "text-black hover:bg-gray-100 [&>svg]:text-gray-500",
    },
    {
      icon: Copy,
      label: "Duplicate",
      onClick: () => {},
      className: "text-black hover:bg-gray-100 [&>svg]:text-gray-500",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: () => {},
      className: "text-red-600 hover:bg-red-50 border-t border-gray-200",
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px]"
      style={{
        left: x,
        top: y,
        transform: "translateY(-100%)",
      }}
    >
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-md font-bold text-gray-700">Settings</h3>
      </div>
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`w-full px-4 py-2 font-medium text-sm flex items-center gap-3 transition-colors duration-150 ${item.className}`}
        >
          <item.icon size={16} />
          {item.label}
        </button>
      ))}
    </div>
  );
};
