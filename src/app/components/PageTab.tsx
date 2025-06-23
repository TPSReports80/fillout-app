"use client";

import React, { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MoreVertical,
  Info,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Page } from "../../constants";
import { COLOR_SCHEMES, FORM_TYPES } from "../../constants";

interface PageTabProps {
  page: Page;
  isActive: boolean;
  onSelect: () => void;
  onContextMenu: (pageId: string, x: number, y: number) => void;
}

export const PageTab: React.FC<PageTabProps> = ({
  page,
  isActive,
  onSelect,
  onContextMenu,
}) => {
  const pointerDownTime = useRef<number>(0);
  const hasMoved = useRef(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get color scheme for this form type
  const getColorScheme = (formType: string) => {
    const formTypeObj = FORM_TYPES.find((ft) => ft.type === formType);
    if (formTypeObj) {
      return COLOR_SCHEMES[formTypeObj.color];
    }
    return COLOR_SCHEMES.blue;
  };

  const getFormTypeIcon = (formType: string, isActive: boolean) => {
    const colorScheme = getColorScheme(formType);
    const iconColor = isActive ? colorScheme.icon : "#9CA3AF"; // Tailwind gray-400
    const iconSize = 16;

    switch (formType) {
      case "info":
        return <Info size={iconSize} color={iconColor} />;
      case "details":
        return <FileText size={iconSize} color={iconColor} />;
      case "other":
        return <MapPin size={iconSize} color={iconColor} />;
      case "ending":
        return <CheckCircle size={iconSize} color={iconColor} />;
      default:
        return <Info size={iconSize} color={iconColor} />;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu(page.id, e.clientX, e.clientY);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownTime.current = Date.now();
    hasMoved.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startPos.current) {
      const deltaX = Math.abs(e.clientX - startPos.current.x);
      const deltaY = Math.abs(e.clientY - startPos.current.y);
      if (deltaX > 5 || deltaY > 5) {
        hasMoved.current = true;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const clickDuration = Date.now() - pointerDownTime.current;

    // Only trigger click if it was a short press and didn't move much
    if (clickDuration < 200 && !hasMoved.current) {
      onSelect();
    }

    startPos.current = null;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "opacity-50" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <div
          className={`flex items-center h-8 sm:h-10 px-3 sm:px-4 rounded-lg border transition-all duration-300 ease-out whitespace-nowrap ${
            isActive
              ? "bg-white border-blue-200 text-black shadow-md"
              : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-300 hover:border-gray-300"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Form Type Icon */}
          <div className="mr-1.5 sm:mr-2 flex-shrink-0">
            {getFormTypeIcon(page.formType, isActive)}
          </div>

          {/* Page Name */}
          <div className={`flex-1 min-w-0 ${isActive ? "pr-2 sm:pr-3" : ""}`}>
            <span className="text-xs sm:text-[14px] font-[500] truncate block">
              {page.name}
            </span>
          </div>
        </div>
      </div>

      {/* Context Menu Button - only show when active */}
      {isActive && (
        <button
          onClick={handleContextMenu}
          className="absolute right-0.5 sm:right-1 top-1/2 transform -translate-y-1/2 ml-1 sm:ml-2 p-0.5 sm:p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 z-10"
        >
          <MoreVertical size={12} className="sm:w-3.5 sm:h-3.5" />
        </button>
      )}
    </div>
  );
};
