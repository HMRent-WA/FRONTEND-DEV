'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { ko as dayPickerKo } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRetvDateRange } from '@/providers/retv-date-range-provider';

interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  onChange,
}: DatePickerWithRangeProps) {
  const { retvDateRange, setRetvDateRange } = useRetvDateRange(); // 컨텍스트 값 사용

  const handleDateChange = (date: DateRange | undefined) => {
    setRetvDateRange(date);
    onChange(date);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !retvDateRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="pl-2 pr-4">요청 일자</span>
            {retvDateRange?.from ? (
              retvDateRange.to ? (
                <div className="w-full flex justify-around items-center">
                  <span>
                    {format(retvDateRange.from, 'PPP', { locale: ko })}
                  </span>
                  <span>-</span>
                  <span>{format(retvDateRange.to, 'PPP', { locale: ko })}</span>
                </div>
              ) : (
                format(retvDateRange.from, 'PPP', { locale: ko })
              )
            ) : (
              <span className="pl-2">날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={retvDateRange?.from}
            selected={retvDateRange}
            onSelect={handleDateChange}
            numberOfMonths={1}
            locale={dayPickerKo}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
