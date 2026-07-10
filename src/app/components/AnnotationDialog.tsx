import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';

interface AnnotationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnnotationDialog({ open, onOpenChange }: AnnotationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-600">
            <MessageSquare className="w-5 h-5" />
            数据说明
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">需求标注</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <span className="font-medium">生效日期：</span>
                    为目标值更新数据的日期。
                  </p>
                  <p>
                    <span className="font-medium">数据管理原则：</span>
                    保留历史数据，数据增量更新，即只更新目标值变更以后的数据，之前的历史数据不更新。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            知道了
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
