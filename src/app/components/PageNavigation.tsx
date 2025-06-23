"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PageTab } from "./PageTab";
import { ContextMenu } from "./ContextMenu";
import { NameModal } from "./NameModal";
import { FormTypeDropdown } from "./FormTypeDropdown";
import { GapButton } from "./GapButton";
import { Page, INITIAL_PAGES } from "../../constants";

interface PageNavigationProps {
  onPageChange?: (pageId: string, formType: string) => void;
}

interface ContextMenuState {
  isOpen: boolean;
  pageId: string | null;
  x: number;
  y: number;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  onPageChange,
}) => {
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [activePage, setActivePage] = useState<string>("1");
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    pageId: null,
    x: 0,
    y: 0,
  });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState("");
  const [customPageName, setCustomPageName] = useState("");
  const [hoveredGap, setHoveredGap] = useState<number | null>(null);
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null);
  const [showGapDropdown, setShowGapDropdown] = useState<number | null>(null);
  const [nextId, setNextId] = useState(5); // Start after initial pages
  const [isClient, setIsClient] = useState(false);

  const addMenuRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close add menu when clicking outside
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        addMenuRef.current &&
        !addMenuRef.current.contains(event.target as Node)
      ) {
        setShowAddMenu(false);
      }

      // Close gap dropdown when clicking outside
      if (showGapDropdown !== null) {
        const gapDropdowns = document.querySelectorAll("[data-gap-dropdown]");
        let clickedInsideDropdown = false;

        gapDropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target as Node)) {
            clickedInsideDropdown = true;
          }
        });

        if (!clickedInsideDropdown) {
          setShowGapDropdown(null);
          setHoveredGap(null);
        }
      }
    };

    if (showAddMenu || showGapDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddMenu, showGapDropdown]);

  // Focus input when modal opens
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    if (showNameModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showNameModal]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFormTypeSelect = (formType: string) => {
    setSelectedFormType(formType);
    setShowAddMenu(false);
    setShowNameModal(true);
  };

  const handleGapFormTypeSelect = (formType: string, insertIndex: number) => {
    setSelectedFormType(formType);
    setInsertAtIndex(insertIndex);
    setShowNameModal(true);
  };

  const addPage = (insertIndex?: number) => {
    if (customPageName.trim()) {
      const newPage: Page = {
        id: nextId.toString(),
        name: customPageName.trim(),
        formType: selectedFormType,
      };

      setPages((prevPages) => {
        const newPages = [...prevPages];
        const finalInsertIndex = Math.max(
          0,
          Math.min(calculateInsertIndex(insertIndex), newPages.length)
        );
        newPages.splice(finalInsertIndex, 0, newPage);
        return newPages;
      });

      setNextId((prev) => prev + 1); // Increment for next page
      resetModalState();
    }
  };

  const handlePageSelect = (pageId: string) => {
    if (activePage !== pageId) {
      setActivePage(pageId);
      const selectedPage = pages.find((page) => page.id === pageId);
      onPageChange?.(pageId, selectedPage?.formType || "info");
    }
  };

  const openContextMenu = (pageId: string, x: number, y: number) => {
    setContextMenu({ isOpen: true, pageId, x, y });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, pageId: null, x: 0, y: 0 });
  };

  const resetModalState = () => {
    setShowNameModal(false);
    setCustomPageName("");
    setSelectedFormType("");
    setInsertAtIndex(null);
    setShowGapDropdown(null);
  };

  const calculateInsertIndex = (insertIndex?: number): number => {
    if (insertIndex !== undefined && insertIndex !== null) {
      return Math.min(insertIndex, pages.length);
    }
    const activePageIndex = pages.findIndex((page) => page.id === activePage);
    return activePageIndex !== -1 ? activePageIndex + 1 : pages.length;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addPage(insertAtIndex !== null ? insertAtIndex : undefined);
    } else if (e.key === "Escape") {
      resetModalState();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="p-2 sm:p-4">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          <div className="mr-2 sm:mr-4">
            {isClient && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pages}
                  strategy={horizontalListSortingStrategy}
                  key={pages.length + pages.map((p) => p.id).join("-")}
                >
                  <div className="flex flex-wrap gap-1 sm:gap-2 transition-all duration-300 ease-out">
                    {pages.map((page, index) => (
                      <React.Fragment key={page.id}>
                        <div className="relative transition-all duration-300 ease-out">
                          <PageTab
                            page={page}
                            isActive={activePage === page.id}
                            onSelect={() => handlePageSelect(page.id)}
                            onContextMenu={openContextMenu}
                          />
                        </div>

                        {index < pages.length - 1 && (
                          <GapButton
                            index={index}
                            isHovered={hoveredGap === index}
                            isDropdownOpen={showGapDropdown === index}
                            onHover={setHoveredGap}
                            onHoverLeave={() => setHoveredGap(null)}
                            onToggleDropdown={(gapIndex: number) =>
                              setShowGapDropdown(
                                showGapDropdown === gapIndex ? null : gapIndex
                              )
                            }
                            onFormTypeSelect={handleGapFormTypeSelect}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>

          {/* Add page button with dropdown */}
          <div className="relative" ref={addMenuRef}>
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="h-8 sm:h-10 px-3 sm:px-4 border-1 border-gray-300 rounded-lg text-black hover:border-gray-400 transition-colors duration-200 flex items-center justify-center group cursor-pointer"
            >
              <span className="text-xs sm:text-[14px] font-[500] group-hover:scale-110 transition-transform duration-200">
                + Add page
              </span>
            </button>

            {showAddMenu && (
              <div
                className="absolute bottom-full left-0 mb-1 bg-white shadow-lg border border-gray-200 min-w-[160px] z-50 transition-all duration-200 ease-out opacity-100 translate-y-0"
                style={{
                  animation: "dropdownSlideIn 0.2s ease-out",
                }}
              >
                <FormTypeDropdown onFormTypeSelect={handleFormTypeSelect} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Name Modal */}
      {showNameModal && (
        <NameModal
          isOpen={showNameModal}
          customPageName={customPageName}
          onCustomPageNameChange={setCustomPageName}
          onKeyDown={handleKeyDown}
          onReset={resetModalState}
          onAddPage={() =>
            addPage(insertAtIndex !== null ? insertAtIndex : undefined)
          }
          insertAtIndex={insertAtIndex}
          nameInputRef={nameInputRef}
        />
      )}

      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onRename={closeContextMenu}
          onDuplicate={closeContextMenu}
          onDelete={closeContextMenu}
        />
      )}
    </div>
  );
};
