import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileImport: (file: File) => void;
}

export function ImportDialog({ open, onOpenChange, onFileImport }: ImportDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!open) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        alert('仅支持.xlsx, .xls格式文件');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        alert('仅支持.xlsx, .xls格式文件');
      }
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onFileImport(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleCancel} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-[600px] max-w-[90vw]">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">导入</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="px-6 py-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
            />
            
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                
                <div>
                  <p className="text-gray-600">
                    拖文件到此处，或
                    <span className="text-blue-500 hover:underline">点击上传</span>
                  </p>
                  {selectedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      已选择: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              仅允许导入.xlsx, .xls格式文件，
              <button className="text-blue-500 hover:underline">
                下载模板
              </button>
            </p>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t">
          <Button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            disabled={!selectedFile}
          >
            确定
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-gray-300 px-8"
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}