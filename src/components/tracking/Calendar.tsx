import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type ViewType = 'daily' | 'weekly' | 'monthly';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  stepData: Record<string, number>;
}

export function Calendar({ onDateSelect, stepData }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('daily');

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getStepsForDate = (date: Date) => {
    return stepData[formatDate(date)] || 0;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      switch (view) {
        case 'daily':
          direction === 'prev' ? newDate.setDate(newDate.getDate() - 1) : newDate.setDate(newDate.getDate() + 1);
          break;
        case 'weekly':
          direction === 'prev' ? newDate.setDate(newDate.getDate() - 7) : newDate.setDate(newDate.getDate() + 7);
          break;
        case 'monthly':
          direction === 'prev' ? newDate.setMonth(newDate.getMonth() - 1) : newDate.setMonth(newDate.getMonth() + 1);
          break;
      }
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getWeekDays = () => {
    const days = [];
    const current = new Date(currentDate);
    current.setDate(current.getDate() - current.getDay());
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const renderDaily = () => (
    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-2">
        {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </h3>
      <div className="text-3xl font-bold text-teal-600">
        {getStepsForDate(currentDate).toLocaleString()} steps
      </div>
    </div>
  );

  const renderWeekly = () => (
    <div className="grid grid-cols-7 gap-2">
      {getWeekDays().map((date, index) => (
        <motion.div
          key={index}
          className={`p-2 rounded-lg cursor-pointer ${
            formatDate(date) === formatDate(currentDate) ? 'bg-teal-100 dark:bg-teal-900' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={() => onDateSelect(date)}
        >
          <div className="text-sm font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div className="text-lg font-semibold">{date.getDate()}</div>
          <div className="text-sm text-teal-600">{getStepsForDate(date).toLocaleString()}</div>
        </motion.div>
      ))}
    </div>
  );

  const renderMonthly = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-sm p-1">{day}</div>
        ))}
        {days.map((date, index) => (
          <motion.div
            key={index}
            className={`p-2 rounded-lg ${date ? 'cursor-pointer' : ''} ${
              date && formatDate(date) === formatDate(currentDate) ? 'bg-teal-100 dark:bg-teal-900' : ''
            }`}
            whileHover={date ? { scale: 1.05 } : {}}
            onClick={() => date && onDateSelect(date)}
          >
            {date && (
              <>
                <div className="text-lg font-semibold">{date.getDate()}</div>
                <div className="text-sm text-teal-600">{getStepsForDate(date).toLocaleString()}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as ViewType[]).map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-4 py-2 rounded-lg capitalize ${
                view === viewType
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {viewType}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateDate('next')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'daily' && renderDaily()}
      {view === 'weekly' && renderWeekly()}
      {view === 'monthly' && renderMonthly()}
    </div>
  );
}