import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { LogisticsRecord } from '../App';

interface DataTableProps {
  records: LogisticsRecord[];
  onEdit: (record: LogisticsRecord) => void;
  onDelete: (id: string) => void;
  showMultiSelect: boolean;
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
}

export function DataTable({ 
  records, 
  onEdit, 
  onDelete,
  showMultiSelect,
  selectedRows,
  onRowSelect,
  onSelectAll 
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(records.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRecords = records.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentRecords.length && currentRecords.length > 0) {
      onSelectAll([]);
    } else {
      onSelectAll(currentRecords.map(record => record.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {showMultiSelect && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === currentRecords.length && currentRecords.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500"
                  />
                </th>
              )}
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                <span className="text-red-500">*</span> 生效日期
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                <span className="text-red-500">*</span> 指标名称
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                <span className="text-red-500">*</span> 品类
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                <span className="text-red-500">*</span> 目标值
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">更新人员</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">更新时间</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan={showMultiSelect ? 8 : 7} className="px-4 py-8 text-center text-gray-500">
                  暂无数据
                </td>
              </tr>
            ) : (
              currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  {showMultiSelect && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(record.id)}
                        onChange={() => onRowSelect(record.id)}
                        className="w-4 h-4 rounded border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-gray-700">{record.effectiveDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{record.indicatorName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{record.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{record.targetValue}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{record.updatedBy}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{record.updatedAt}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(record)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`确定要删除以下记录吗？\n\n指标名称：${record.indicatorName}\n生效日期：${record.effectiveDate}\n目标值：${record.targetValue}`)) {
                            onDelete(record.id);
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>共 {records.length} 条</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
            <option value={50}>50条/页</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {renderPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-2 text-gray-500">...</span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? 'default' : 'ghost'}
                size="sm"
                onClick={() => goToPage(page as number)}
                className={`h-8 w-8 p-0 ${
                  currentPage === page
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : ''
                }`}
              >
                {page}
              </Button>
            )
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-600">前往</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-12 px-2 py-1 text-sm border border-gray-300 rounded text-center"
            />
            <span className="text-sm text-gray-600">页</span>
          </div>
        </div>
      </div>
    </div>
  );
}