import React from 'react';
import { Trash2, FileText, Plus, Upload } from 'lucide-react';
import { Button } from './ui/button';

interface TableActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onImport: () => void;
  onAddData: () => void;
  onAdd: () => void;
  onAnnotate?: () => void;
}

export function TableActions({ 
  selectedCount,
  onDeleteSelected,
  onImport,
  onAddData,
  onAdd,
  onAnnotate
}: TableActionsProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          onClick={onImport}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="sm"
        >
          <Upload className="w-4 h-4 mr-1" />
          导入
        </Button>
        <Button
          onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          新增
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (window.confirm(`确定要批量删除选中的 ${selectedCount} 条记录吗？`)) {
              onDeleteSelected();
            }
          }}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          批量删除
        </Button>
        <Button 
          onClick={onAnnotate}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="sm"
        >
          <FileText className="w-4 h-4 mr-1" />
          需求标注
        </Button>
        
        {selectedCount > 0 && (
          <span className="text-sm text-gray-600 ml-2">
            已选择 {selectedCount} 条
          </span>
        )}
      </div>
    </div>
  );
}