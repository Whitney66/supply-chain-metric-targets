import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface MultiSelectDropdownProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  options,
  selectedValues,
  onChange,
  placeholder = '请选择',
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleAll = () => {
    if (selectedValues.length === options.length) {
      onChange([]);
    } else {
      onChange(options);
    }
  };

  const handleToggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const displayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === options.length) return '全部';
    if (selectedValues.length === 1) return selectedValues[0];
    return `已选${selectedValues.length}项`;
  };

  const isAllSelected = selectedValues.length === options.length && options.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white min-w-[280px] flex items-center justify-between hover:border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{displayText()}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-[280px] bg-white border border-gray-300 rounded shadow-lg max-h-[280px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-3 py-2">
            <label className="flex items-center cursor-pointer hover:bg-gray-100 rounded px-1 py-1">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleToggleAll}
                className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500 bg-white checked:bg-blue-500 checked:border-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">全选</span>
            </label>
          </div>
          <div className="py-1">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleToggleOption(option)}
                  className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500 bg-white checked:bg-blue-500 checked:border-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 whitespace-nowrap">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}