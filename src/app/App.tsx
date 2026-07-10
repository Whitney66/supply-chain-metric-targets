import React, { useState } from 'react';
import { Header } from './components/Header';
import { FilterSection } from './components/FilterSection';
import { TableActions } from './components/TableActions';
import { DataTable } from './components/DataTable';
import { DataEntryDialog } from './components/DataEntryDialog';
import { ImportDialog } from './components/ImportDialog';
import { AnnotationDialog } from './components/AnnotationDialog';
import { toast } from 'sonner';

export interface LogisticsRecord {
  id: string;
  effectiveDate: string;
  indicatorName: string;
  category: string;
  targetValue: string;
  updatedBy: string;
  updatedAt: string;
}

function App() {
  const [records, setRecords] = useState<LogisticsRecord[]>([
    {
      id: '1',
      effectiveDate: '2026-03-01',
      indicatorName: '全链路订货平均时效（一盘货）',
      category: '香化',
      targetValue: '2.5天',
      updatedBy: '张三',
      updatedAt: '2026-03-13 10:30',
    },
    {
      id: '2',
      effectiveDate: '2026-03-01',
      indicatorName: '仓库入库平均时效',
      category: '酒水',
      targetValue: '1.8天',
      updatedBy: '李四',
      updatedAt: '2026-03-13 11:15',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LogisticsRecord | null>(null);
  
  // 获取当前月份作为认时间
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };
  
  const [filters, setFilters] = useState({
    effectiveDate: '~',
    indicatorName: [] as string[],
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAnnotationDialogOpen, setIsAnnotationDialogOpen] = useState(false);

  const handleAddRecord = (newRecord: Omit<LogisticsRecord, 'id' | 'updatedBy' | 'updatedAt'>) => {
    const now = new Date();
    const timestamp = now.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
    
    const record: LogisticsRecord = {
      ...newRecord,
      id: Date.now().toString(),
      updatedBy: '当前用户',
      updatedAt: timestamp,
    };
    setRecords([...records, record]);
    setIsDialogOpen(false);
    toast.success('数据已成功添加');
  };

  const handleEditRecord = (updatedRecord: Omit<LogisticsRecord, 'id' | 'updatedBy' | 'updatedAt'>) => {
    if (editingRecord) {
      const now = new Date();
      const timestamp = now.toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      });
      
      setRecords(
        records.map((record) =>
          record.id === editingRecord.id
            ? { 
                ...updatedRecord, 
                id: editingRecord.id,
                updatedBy: '当前用户',
                updatedAt: timestamp,
              }
            : record
        )
      );
      setEditingRecord(null);
      setIsDialogOpen(false);
      toast.success('数据已成功更新');
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
    toast.success('数据已成功删除');
  };

  const handleDeleteSelected = () => {
    setRecords(records.filter((record) => !selectedRows.includes(record.id)));
    setSelectedRows([]);
    toast.success(`已删除 ${selectedRows.length} 条数据`);
  };
  
  const openEditDialog = (record: LogisticsRecord) => {
    setEditingRecord(record);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingRecord(null);
    setIsDialogOpen(true);
  };

  const handleFileImport = (file: File) => {
    // 处理文件导入逻辑
    console.log('导入文件:', file.name);
    toast.success(`文件 ${file.name} 导入成功`);
  };

  const openAnnotationDialog = () => {
    setIsAnnotationDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-6 py-4">
        <div className="mb-4">
          <h1 className="text-lg font-medium text-gray-800">
            3.8 供应链数据指标目标值配置表
          </h1>
        </div>
        
        <FilterSection 
          filters={filters} 
          onFiltersChange={setFilters}
          onImport={() => setIsImportDialogOpen(true)}
          onAddData={openAddDialog}
        />
        
        <TableActions
          selectedCount={selectedRows.length}
          onDeleteSelected={handleDeleteSelected}
          onImport={() => setIsImportDialogOpen(true)}
          onAddData={openAddDialog}
          onAdd={openAddDialog}
          onAnnotate={openAnnotationDialog}
        />
        
        <DataTable
          records={records}
          onEdit={openEditDialog}
          onDelete={handleDeleteRecord}
          showMultiSelect={true}
          selectedRows={selectedRows}
          onRowSelect={(id) => {
            if (selectedRows.includes(id)) {
              setSelectedRows(selectedRows.filter(rowId => rowId !== id));
            } else {
              setSelectedRows([...selectedRows, id]);
            }
          }}
          onSelectAll={(ids) => setSelectedRows(ids)}
        />
      </div>

      <DataEntryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingRecord ? handleEditRecord : handleAddRecord}
        initialData={editingRecord || undefined}
        mode={editingRecord ? 'edit' : 'add'}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onFileImport={handleFileImport}
      />

      <AnnotationDialog
        open={isAnnotationDialogOpen}
        onOpenChange={setIsAnnotationDialogOpen}
      />
    </div>
  );
}

export default App;