import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        left: rect.left + rect.width / 2,
        top: rect.top, // position above the button
      });
    } else {
      setDropdownPos(null);
    }
  }, [isDropdownOpen]);

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
              ref={buttonRef}
              onClick={() => onToggleDropdown(index)}
              className="w-6 h-6 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-lg hover:scale-110 border border-gray-300 cursor-pointer"
            >
              +
            </button>

            {isDropdownOpen &&
              dropdownPos &&
              ReactDOM.createPortal(
                <div
                  className="z-50"
                  data-gap-dropdown
                  style={{
                    position: "fixed",
                    left: dropdownPos.left,
                    top: dropdownPos.top,
                    transform: "translate(-50%, -100%)",
                    marginBottom: "0.25rem", // mb-1
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FormTypeDropdown
                    onFormTypeSelect={(formType) =>
                      onFormTypeSelect(formType, index + 1)
                    }
                  />
                </div>,
                document.body
              )}
          </div>
        )}
      </div>
    </div>
  );
};
