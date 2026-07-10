import React from 'react';
import { Search, Bell, Grid3x3, User } from 'lucide-react';
import platformLogo from 'figma:asset/27d8e0a18a90de1f49354fd85691c9619cdb0e4b.png';
import userAvatar from 'figma:asset/d3b42e3873be8e0006aaf7c871651435294522e7.png';

export function Header() {
  const menuItems = [
    '数据分析',
    '库存分析',
    '跟踪分析',
    '采购分析',
    '提货分析',
    '风险预警',
    '渠道分析',
    '自定义分析',
    '数据填报',
  ];

  return (
    <header className="bg-blue-600 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={platformLogo} alt="平台Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-medium">大数据平台</span>
          </div>
          
          <nav className="flex items-center gap-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded transition-colors ${
                  item === '数据填报'
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-700'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              className="w-64 px-4 py-1.5 rounded bg-white text-gray-800 text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          
          <button className="p-2 hover:bg-blue-700 rounded">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 hover:bg-blue-700 rounded">
            <Grid3x3 className="w-5 h-5" />
          </button>
          
          <button className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-white">
            <img src={userAvatar} alt="用户头像" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}