import React from "react";
import { FormTypeDropdown } from "./FormTypeDropdown";

interface GapButtonProps {
  index: number;
  isHovered: boolean;
  isDropdownOpen: boolean;
  onHover: (index: number) => void;
  onHoverLeave: () => void;
  onToggleDropdown: (index: number) => void;
  onFormTypeSelect: (formType: string, insertIndex: number) => void;
}

export const GapButton: React.FC<GapButtonProps> = ({
  index,
  isHovered,
  isDropdownOpen,
  onHover,
  onHoverLeave,
  onToggleDropdown,
  onFormTypeSelect,
}) => {
  const isVisible = isHovered || isDropdownOpen;

  return (
    <div
      className="relative group transition-all duration-300 ease-out"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => {
        if (!isDropdownOpen) {
          onHoverLeave();
        }
      }}
    >
      <div
        className={`transition-all duration-300 ease-out ${
          isVisible ? "w-8" : "w-2"
        } h-10 flex items-center justify-center`}
      >
        {isVisible && (
          <div className="relative animate-in fade-in duration-200">
            <button
              onClick={() => onToggleDropdown(index)}
              className="w-6 h-6 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-lg hover:scale-110 border border-gray-300 cursor-pointer"
            >
              +
            </button>

            {isDropdownOpen && (
              <div
                className="absolute bottom-full z-50 left-1/2 transform -translate-x-1/2 mb-1"
                data-gap-dropdown
                onClick={(e) => e.stopPropagation()}
              >
                <FormTypeDropdown
                  onFormTypeSelect={(formType) =>
                    onFormTypeSelect(formType, index + 1)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
