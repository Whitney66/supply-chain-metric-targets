import React from "react";
import { Search, RotateCcw, FileText, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { MultiSelectDropdown } from "./MultiSelectDropdown";

interface FilterSectionProps {
  filters: {
    effectiveDate: string;
    indicatorName: string[];
  };
  onFiltersChange: (filters: any) => void;
  onImport: () => void;
  onAddData: () => void;
}

const INDICATOR_OPTIONS = [
  "全链路订货平均时效（一盘货）",
  "一线通关平均时效",
  "提货至海综保平均时效",
  "仓库入库平均时效",
  "全链路入库平均时效（直发）",
  "全链路分货平均时效",
  "仓库出库平均时效",
  "二线通关平均时效",
  "门店提货至上架平均时效",
  "监管仓-周转仓调拨平均时效",
];

export function FilterSection({
  filters,
  onFiltersChange,
  onImport,
  onAddData,
}: FilterSectionProps) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-600">
          生效日期
        </label>
        <div className="relative">
          <input
            type="date"
            className="px-3 py-1.5 pl-9 border border-gray-300 rounded text-sm bg-white min-w-[160px] cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filters.effectiveDate.split("~")[0] || ""}
            onChange={(e) => {
              const endDate = filters.effectiveDate.split("~")[1] || "";
              onFiltersChange({
                ...filters,
                effectiveDate: `${e.target.value}~${endDate}`,
              });
            }}
          />
          <Calendar className="w-4 h-4 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <span className="text-gray-500 text-sm">至</span>
        <div className="relative">
          <input
            type="date"
            className="px-3 py-1.5 pl-9 border border-gray-300 rounded text-sm bg-white min-w-[160px] cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filters.effectiveDate.split("~")[1] || ""}
            onChange={(e) => {
              const startDate = filters.effectiveDate.split("~")[0] || "";
              onFiltersChange({
                ...filters,
                effectiveDate: `${startDate}~${e.target.value}`,
              });
            }}
          />
          <Calendar className="w-4 h-4 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">指标名称</label>
          <MultiSelectDropdown
            options={INDICATOR_OPTIONS}
            selectedValues={filters.indicatorName}
            onChange={(values) =>
              onFiltersChange({ ...filters, indicatorName: values })
            }
            placeholder="请选择指标名称"
          />
        </div>

        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
          <Search className="w-4 h-4 mr-1" />
          查询
        </Button>

        <Button
          variant="outline"
          className="border-gray-300"
          onClick={() => onFiltersChange({ effectiveDate: '~', indicatorName: [] })}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          重置
        </Button>
      </div>
    </div>
  );
}