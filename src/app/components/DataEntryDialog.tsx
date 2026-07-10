import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { LogisticsRecord } from '../App';

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

const CATEGORY_OPTIONS = ["香化", "酒水"];

interface DataEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<LogisticsRecord, 'id' | 'updatedBy' | 'updatedAt'>) => void;
  initialData?: LogisticsRecord;
  mode: 'add' | 'edit';
}

export function DataEntryDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: DataEntryDialogProps) {
  const [formData, setFormData] = useState({
    effectiveDate: '',
    indicatorName: '',
    category: '',
    targetValue: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        effectiveDate: initialData.effectiveDate,
        indicatorName: initialData.indicatorName,
        category: initialData.category,
        targetValue: initialData.targetValue,
      });
    } else {
      setFormData({
        effectiveDate: '',
        indicatorName: '',
        category: '',
        targetValue: '',
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? '新增数据' : '编辑数据'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? '添加新的指标目标值配置'
              : '编辑现有的指标目标值配置'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="effectiveDate">生效日期</Label>
            <Input
              id="effectiveDate"
              type="date"
              value={formData.effectiveDate}
              onChange={(e) =>
                setFormData({ ...formData, effectiveDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="indicatorName">指标名称</Label>
            <select
              id="indicatorName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.indicatorName}
              onChange={(e) =>
                setFormData({ ...formData, indicatorName: e.target.value })
              }
              required
            >
              <option value="">请选择指标名称</option>
              {INDICATOR_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">品类</Label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">请选择品类</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetValue">目标值</Label>
            <Input
              id="targetValue"
              type="text"
              placeholder="请输入目标值"
              value={formData.targetValue}
              onChange={(e) =>
                setFormData({ ...formData, targetValue: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {mode === 'add' ? '添加' : '保存'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}