import React from "react";
import { FORM_TYPES, COLOR_SCHEMES } from "../../constants";

interface FormTypeDropdownProps {
  onFormTypeSelect: (formType: string) => void;
  className?: string;
}

export const FormTypeDropdown: React.FC<FormTypeDropdownProps> = ({
  onFormTypeSelect,
  className = "",
}) => (
  <div
    className={`bg-white shadow-lg pb-6 min-w-[250px] z-50 transition-all duration-200 ease-out opacity-100 translate-y-0 relative ${className}`}
    style={{
      animation: "dropdownSlideIn 0.2s ease-out",
    }}
  >
    {/* Caret pointing up */}
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>

    <div className="p-4 mb-3 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-700">Choose a page type</h3>
    </div>
    {FORM_TYPES.map(({ type, label, icon: Icon, color }) => {
      const colorScheme = COLOR_SCHEMES[color];
      return (
        <button
          key={type}
          onClick={() => onFormTypeSelect(type)}
          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3"
        >
          <div
            className="rounded-[6px] p-1 w-[30px] h-[30px] flex items-center justify-center"
            style={{
              border: `1px solid ${colorScheme.border}`,
              backgroundColor: colorScheme.background,
            }}
          >
            <Icon size={16} color={colorScheme.icon} />
          </div>
          {label}
        </button>
      );
    })}
  </div>
);
