import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, TrendingDown, Clock, Calendar as CalendarIcon } from 'lucide-react';
import './InventoryCalendar.css';

const InventoryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call to Spring Boot backend
    const mockEvents = [
      {
        date: '2024-01-15',
        type: 'inward',
        items: [
          {
            itemCode: 'ITM001',
            descriptionOfMaterials: 'Laptop Dell Inspiron',
            qty: 5,
            transactionBy: 'John Doe',
            time: '10:30:00'
          }
        ]
      },
      {
        date: new Date().toISOString().split('T')[0],
        type: 'inward',
        items: [
          {
            itemCode: 'ITM005',
            descriptionOfMaterials: 'USB Keyboard',
            qty: 8,
            transactionBy: 'Admin User',
            time: new Date().toTimeString().split(' ')[0]
          }
        ]
      }
    ];
    setCalendarEvents(mockEvents);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const events = calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDay(selectedDate, eventDate);
      });
      setSelectedDateEvents(events);
    }
  }, [selectedDate, calendarEvents]);

  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Custom day content for event highlighting
  function renderDay(day) {
    const dateStr = day.toISOString().split('T')[0];
    const event = calendarEvents.find(e => e.date === dateStr);
    if (event) {
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <span className="z-10">{day.getDate()}</span>
          <span className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${event.type === 'inward' ? 'bg-green-400' : event.type === 'outward' ? 'bg-red-400' : 'bg-yellow-400'}`}></span>
        </div>
      );
    }
    return <span>{day.getDate()}</span>;
  }

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <div className="card-title">
          <CalendarIcon className="card-icon" />
          <span>Inventory Calendar</span>
        </div>
      </div>
      <div className="calendar-content">
        <div className="calendar-wrapper">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-xl p-4 pointer-events-auto"
            dayContent={renderDay}
          />
        </div>
        
        {selectedDate && selectedDateEvents.length > 0 && (
          <div className="calendar-events">
            <h4 className="calendar-event-date">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            {selectedDateEvents.map((event, index) => (
              <div key={index}>
                {event.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="calendar-event-item">
                    <div className="calendar-event-header">
                      <div>
                        <p className="calendar-event-code">{item.itemCode}</p>
                        <p className="calendar-event-desc">{item.descriptionOfMaterials}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {item.time} • by {item.transactionBy}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={event.type === 'inward' ? 'default' : 'destructive'} 
                          className="calendar-event-badge mb-1"
                        >
                          {event.type === 'inward' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {item.qty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {selectedDate && selectedDateEvents.length === 0 && (
          <div className="mt-6 text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No transactions on this date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryCalendar;
