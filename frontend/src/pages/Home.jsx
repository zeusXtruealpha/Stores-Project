import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, Package, Calendar, BarChart3, Users, MapPin, X, Download, Search, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import InventoryCalendar from '../components/InventoryCalendar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Home.css';

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    inwardCount: 0,
    outwardCount: 0,
    inStore: 0,
    damagedCount: 0,
    recentTransactions: [],
    monthlyData: [],
    allData: [],
    locationData: []
  });

  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllData, setFilteredAllData] = useState([]);

  useEffect(() => {
    // Mock dashboard data
    const mockData = {
      totalItems: 156,
      inwardCount: 89,
      outwardCount: 67,
      inStore: 22, // inwardCount - outwardCount
      damagedCount: 5,
      recentTransactions: [
        {
          id: 1,
          itemCode: 'ITM005',
          descriptionOfMaterials: 'USB Keyboard',
          qty: 8,
          type: 'inward',
          dateOfReceipt: new Date().toISOString().split('T')[0],
          transactionBy: 'Admin User'
        },
        {
          id: 2,
          itemCode: 'ITM003',
          descriptionOfMaterials: 'Office Chair Ergonomic',
          qty: 3,
          type: 'outward',
          dateOfReceipt: '2024-01-20',
          transactionBy: 'John Doe'
        },
        {
          id: 3,
          itemCode: 'ITM002',
          descriptionOfMaterials: 'Wireless Mouse',
          qty: 5,
          type: 'damaged',
          dateOfReceipt: '2024-01-19',
          transactionBy: 'Jane Smith'
        }
      ],
      monthlyData: [
        { month: 'Jan', inward: 45, outward: 32 },
        { month: 'Feb', inward: 52, outward: 41 },
        { month: 'Mar', inward: 38, outward: 28 },
        { month: 'Apr', inward: 61, outward: 45 },
        { month: 'May', inward: 55, outward: 38 },
        { month: 'Jun', inward: 48, outward: 35 }
      ],
      allData: [
        { sno: 1, dateOfReceipt: '2024-01-15', itemCode: 'ITM001', descriptionOfMaterials: 'Laptop Dell Inspiron', challanNo: 'CH001', make: 'Dell', units: 'pcs', qty: 5, location: 'Warehouse A', remarks: 'Available for allocation', type: 'inward' },
        { sno: 2, dateOfReceipt: '2024-01-10', itemCode: 'ITM002', descriptionOfMaterials: 'Wireless Mouse', challanNo: 'CH002', make: 'Logitech', units: 'pcs', qty: 2, location: 'Warehouse B', remarks: 'Good condition', type: 'outward' },
        { sno: 3, dateOfReceipt: '2024-01-17', itemCode: 'ITM003', descriptionOfMaterials: 'USB Cable Type-C', challanNo: 'CH003', make: 'Samsung', units: 'pcs', qty: 10, location: 'Warehouse A', remarks: 'New stock', type: 'inward' },
        { sno: 4, dateOfReceipt: '2024-01-15', itemCode: 'ITM004', descriptionOfMaterials: 'Monitor 24 inch', challanNo: 'CH004', make: 'Samsung', units: 'pcs', qty: 3, location: 'Warehouse C', remarks: 'Ready to dispatch', type: 'inward' },
        { sno: 5, dateOfReceipt: '2025-06-14', itemCode: 'ITM005', descriptionOfMaterials: 'USB Keyboard', challanNo: 'CH005', make: 'Logitech', units: 'pcs', qty: 8, location: 'Warehouse A', remarks: 'Latest stock', type: 'damaged' }
      ],
      locationData: [
        { location: 'Warehouse A', items: 85 },
        { location: 'Warehouse B', items: 45 },
        { location: 'Warehouse C', items: 26 }
      ]
    };
    setDashboardData(mockData);
    setFilteredAllData(mockData.allData);
  }, []);

  useEffect(() => {
    let filtered = dashboardData.allData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descriptionOfMaterials.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.challanNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
        (filterBy === 'sno' && item.sno <= 3) ||
        (filterBy === 'date' && new Date(item.dateOfReceipt).getFullYear() === 2024) ||
        (filterBy === 'itemCode' && item.itemCode.includes('ITM00')) ||
        (filterBy === 'description' && item.descriptionOfMaterials.toLowerCase().includes('usb')) ||
        (filterBy === 'type' && item.type === 'inward') ||
        (filterBy === 'location' && item.location === 'Warehouse A');
      
      return matchesSearch && matchesFilter;
    });
    setFilteredAllData(filtered);
  }, [searchTerm, filterBy, dashboardData.allData]);

  const downloadData = (format) => {
    const data = filteredAllData;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${data.map(item => 
          `  <item>\n    <sno>${item.sno}</sno>\n    <dateOfReceipt>${item.dateOfReceipt}</dateOfReceipt>\n    <itemCode>${item.itemCode}</itemCode>\n    <descriptionOfMaterials>${item.descriptionOfMaterials}</descriptionOfMaterials>\n    <challanNo>${item.challanNo}</challanNo>\n    <make>${item.make}</make>\n    <units>${item.units}</units>\n    <qty>${item.qty}</qty>\n    <location>${item.location}</location>\n    <remarks>${item.remarks}</remarks>\n    <type>${item.type}</type>\n  </item>`
        ).join('\n')}\n</data>`;
        filename = 'inventory_data.xml';
        mimeType = 'application/xml';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'inventory_data.json';
        mimeType = 'application/json';
        break;
      case 'excel':
        const headers = ['S.No', 'Date of Receipt', 'Item Code', 'Description Of Materials', 'Challan No', 'Make', 'Units', 'Qty', 'Location', 'Remarks', 'Type'];
        const csvContent = [
          headers.join(','),
          ...data.map(item => [
            item.sno, item.dateOfReceipt, item.itemCode, `"${item.descriptionOfMaterials}"`, 
            item.challanNo, item.make, item.units, item.qty, item.location, `"${item.remarks}"`, item.type
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = 'inventory_data.csv';
        mimeType = 'text/csv';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="home-container">
      <div className="home-inner">
        <div className="home-header">
          <h1 className="home-title">
            <BarChart3 className="home-title-icon" />
            Dashboard
          </h1>
          <p className="home-subtitle">Welcome to your inventory management dashboard</p>
        </div>

        {/* Summary Cards - Side by Side */}
        <div className="summary-cards">
          <Card className="summary-card summary-card-blue">
            <CardContent className="summary-card-content">
              <div className="summary-card-inner">
                <div>
                  <p className="summary-card-label">Total Items</p>
                  <p className="summary-card-value">{dashboardData.totalItems}</p>
                </div>
                <Package className="summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card summary-card-green">
            <CardContent className="summary-card-content">
              <div className="summary-card-inner">
                <div>
                  <p className="summary-card-label">Inward</p>
                  <p className="summary-card-value">{dashboardData.inwardCount}</p>
                </div>
                <TrendingUp className="summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card summary-card-red">
            <CardContent className="summary-card-content">
              <div className="summary-card-inner">
                <div>
                  <p className="summary-card-label">Outward</p>
                  <p className="summary-card-value">{dashboardData.outwardCount}</p>
                </div>
                <TrendingDown className="summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card summary-card-purple">
            <CardContent className="summary-card-content">
              <div className="summary-card-inner">
                <div>
                  <p className="summary-card-label">InStore</p>
                  <p className="summary-card-value">{dashboardData.inStore}</p>
                </div>
                <Package className="summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="summary-card summary-card-orange">
            <CardContent className="summary-card-content">
              <div className="summary-card-inner">
                <div>
                  <p className="summary-card-label">Damaged</p>
                  <p className="summary-card-value">{dashboardData.damagedCount}</p>
                </div>
                <X className="summary-card-icon" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Data Table with Calendar Side by Side */}
        <div className="data-table-with-calendar">
          {/* All Data Table - 75% width */}
          <Card className="data-table-card">
            <CardHeader>
              <CardTitle className="data-table-title">
                <div className="data-table-title-left">
                  <BarChart3 className="data-table-icon" />
                  All Data
                </div>
                <div className="data-table-controls">
                  <div className="search-container">
                    <Search className="search-icon" />
                    <Input
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="filter-select">
                      <Filter className="filter-icon" />
                      <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="sno">S.No</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="itemCode">Item Code</SelectItem>
                      <SelectItem value="description">Description</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="download-buttons">
                    <Button size="sm" onClick={() => downloadData('xml')} className="download-btn download-btn-blue">
                      <Download className="download-icon" />
                      XML
                    </Button>
                    <Button size="sm" onClick={() => downloadData('json')} className="download-btn download-btn-green">
                      <Download className="download-icon" />
                      JSON
                    </Button>
                    <Button size="sm" onClick={() => downloadData('excel')} className="download-btn download-btn-purple">
                      <Download className="download-icon" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-th">S.NO</th>
                      <th className="table-th">DATE OF RECEIPT</th>
                      <th className="table-th">ITEM CODE</th>
                      <th className="table-th">DESCRIPTION OF MATERIALS</th>
                      <th className="table-th">CHALLAN NO</th>
                      <th className="table-th">MAKE</th>
                      <th className="table-th">UNITS</th>
                      <th className="table-th">QTY</th>
                      <th className="table-th">LOCATION</th>
                      <th className="table-th">REMARKS</th>
                      <th className="table-th">TYPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllData.map((item) => (
                      <tr key={item.sno} className="table-row">
                        <td className="table-td">{item.sno}</td>
                        <td className="table-td">{new Date(item.dateOfReceipt).toLocaleDateString()}</td>
                        <td className="table-td table-td-code">{item.itemCode}</td>
                        <td className="table-td">{item.descriptionOfMaterials}</td>
                        <td className="table-td">{item.challanNo}</td>
                        <td className="table-td">{item.make}</td>
                        <td className="table-td">{item.units}</td>
                        <td className="table-td">{item.qty}</td>
                        <td className="table-td">{item.location}</td>
                        <td className="table-td">{item.remarks}</td>
                        <td className="table-td">
                          <Badge 
                            variant={item.type === 'inward' ? 'default' : item.type === 'outward' ? 'secondary' : 'destructive'}
                            className={`badge badge-${item.type}`}
                          >
                            {item.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Calendar - 25% width */}
          <div className="calendar-sidebar">
            <InventoryCalendar />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="two-column-layout">
          {/* Recent Transactions */}
          <Card className="recent-transactions-card">
            <CardHeader>
              <CardTitle className="card-title">
                <Calendar className="card-icon card-icon-green" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="transactions-list">
                {dashboardData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-left">
                      {transaction.type === 'inward' ? (
                        <TrendingUp className="transaction-icon transaction-icon-green" />
                      ) : transaction.type === 'outward' ? (
                        <TrendingDown className="transaction-icon transaction-icon-red" />
                      ) : (
                        <X className="transaction-icon transaction-icon-orange" />
                      )}
                      <div>
                        <p className="transaction-code">{transaction.itemCode}</p>
                        <p className="transaction-desc">{transaction.descriptionOfMaterials}</p>
                        <p className="transaction-by">By: {transaction.transactionBy}</p>
                      </div>
                    </div>
                    <div className="transaction-right">
                      <Badge 
                        variant={transaction.type === 'inward' ? 'default' : transaction.type === 'outward' ? 'destructive' : 'secondary'}
                        className={`transaction-badge transaction-badge-${transaction.type}`}
                      >
                        {transaction.type}
                      </Badge>
                      <p className="transaction-qty">Qty: {transaction.qty}</p>
                      <p className="transaction-date">{new Date(transaction.dateOfReceipt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Statistics */}
          <Card className="statistics-card">
            <CardHeader className="stats-header">
              <CardTitle className="card-title">
                <BarChart3 className="card-icon" />
                Live Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="stats-content">
              <div className="space-y-4">
                <div className="stat-item">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 p-2 rounded-full text-blue-600 bg-blue-100">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Today's Inward</p>
                        <p className="text-sm text-gray-600">Items received today</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-lg px-3 py-1">12</Badge>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 p-2 rounded-full text-red-600 bg-red-100">
                        <TrendingDown className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Today's Outward</p>
                        <p className="text-sm text-gray-600">Items dispatched today</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-lg px-3 py-1">8</Badge>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 p-2 rounded-full text-purple-600 bg-purple-100">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Stock Value</p>
                        <p className="text-sm text-gray-600">Total inventory value</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-lg px-3 py-1">$45K</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Two Column Layout - 50/50 split */}
        <div className="bottom-two-column-layout">
          {/* Storage Locations */}
          <Card className="storage-locations-card">
            <CardHeader>
              <CardTitle className="card-title">
                <MapPin className="card-icon card-icon-indigo" />
                Storage Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="locations-list">
                {dashboardData.locationData.map((location, index) => (
                  <div key={index} className="location-item">
                    <div className="location-left">
                      <MapPin className="location-icon" />
                      <div>
                        <p className="location-name">{location.location}</p>
                        <p className="location-type">Storage Location</p>
                      </div>
                    </div>
                    <div className="location-right">
                      <p className="location-count">{location.items}</p>
                      <p className="location-label">Items</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Analysis */}
          <Card className="monthly-analysis-card">
            <CardHeader>
              <CardTitle className="card-title">
                <BarChart3 className="card-icon card-icon-blue" />
                Monthly Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dashboardData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="inward" fill="#10B981" name="Inward" />
                  <Bar dataKey="outward" fill="#EF4444" name="Outward" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
