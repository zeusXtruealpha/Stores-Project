import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Package, Search, Filter, BarChart3, TrendingUp, TrendingDown, AlertTriangle, X, Download } from 'lucide-react';
import './StockRegister.css';

const StockRegister = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock data with damaged items
    const mockData = [
      {
        id: 1,
        dateOfReceipt: '2024-01-15',
        itemCode: 'ITM001',
        descriptionOfMaterials: 'Laptop Dell Inspiron 15 3000 Series',
        challanNo: 'CH001',
        make: 'Dell',
        units: 'pcs',
        qty: 5,
        location: 'Warehouse A',
        remarks: 'Available for allocation',
        type: 'inward',
        damagedQty: 0
      },
      {
        id: 2,
        dateOfReceipt: '2024-01-16',
        itemCode: 'ITM002',
        descriptionOfMaterials: 'Wireless Mouse Logitech MX Master 3',
        challanNo: 'CH002',
        make: 'Logitech',
        units: 'pcs',
        qty: 15,
        location: 'Warehouse B',
        remarks: 'High stock level',
        type: 'inward',
        damagedQty: 0
      },
      {
        id: 3,
        dateOfReceipt: '2024-01-17',
        itemCode: 'ITM003',
        descriptionOfMaterials: 'Office Chair Ergonomic with Lumbar Support',
        challanNo: 'CH003',
        make: 'Steelcase',
        units: 'pcs',
        qty: 8,
        location: 'Warehouse A',
        remarks: 'Ready for dispatch',
        type: 'inward',
        damagedQty: 0
      },
      {
        id: 4,
        dateOfReceipt: '2024-01-18',
        itemCode: 'ITM004',
        descriptionOfMaterials: 'Monitor 24 inch LED Display',
        challanNo: 'CH004',
        make: 'Samsung',
        units: 'pcs',
        qty: 3,
        location: 'Warehouse C',
        remarks: 'Low stock alert',
        type: 'inward',
        damagedQty: 1
      }
    ];
    setStockData(mockData);
  }, []);

  useEffect(() => {
    let filtered = stockData.filter(item => {
      const matchesSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.descriptionOfMaterials.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.challanNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'low-stock' && parseInt(item.qty) < 5) ||
                           (filterType === 'available' && parseInt(item.qty) >= 5) ||
                           (filterType === 'damaged' && (item.damagedQty || 0) > 0) ||
                           (filterType === 'sno' && item.id <= 2) ||
                           (filterType === 'date' && new Date(item.dateOfReceipt).getFullYear() === 2024) ||
                           (filterType === 'itemCode' && item.itemCode.includes('ITM00')) ||
                           (filterType === 'description' && item.descriptionOfMaterials.toLowerCase().includes('laptop')) ||
                           (filterType === 'type' && item.type === 'inward') ||
                           (filterType === 'location' && item.location === 'Warehouse A');
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterType, stockData]);

  const markAsDamaged = (itemId, damagedQuantity) => {
    setStockData(prevData => 
      prevData.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              qty: Math.max(0, item.qty - damagedQuantity),
              damagedQty: (item.damagedQty || 0) + damagedQuantity,
              remarks: item.remarks + ` | ${damagedQuantity} damaged`
            }
          : item
      )
    );
  };

  const downloadData = (format) => {
    const data = filteredData;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${data.map(item => 
          `  <item>\n    <id>${item.id}</id>\n    <dateOfReceipt>${item.dateOfReceipt}</dateOfReceipt>\n    <itemCode>${item.itemCode}</itemCode>\n    <descriptionOfMaterials>${item.descriptionOfMaterials}</descriptionOfMaterials>\n    <challanNo>${item.challanNo}</challanNo>\n    <make>${item.make}</make>\n    <units>${item.units}</units>\n    <qty>${item.qty}</qty>\n    <damagedQty>${item.damagedQty || 0}</damagedQty>\n    <location>${item.location}</location>\n    <remarks>${item.remarks}</remarks>\n    <type>${item.type}</type>\n  </item>`
        ).join('\n')}\n</data>`;
        filename = 'stock_register.xml';
        mimeType = 'application/xml';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'stock_register.json';
        mimeType = 'application/json';
        break;
      case 'excel':
        const headers = ['S.No', 'Date of Receipt', 'Item Code', 'Description Of Materials', 'Challan No', 'Make', 'Units', 'Qty', 'Damaged', 'Location', 'Remarks', 'Type'];
        const csvContent = [
          headers.join(','),
          ...data.map((item, index) => [
            index + 1, item.dateOfReceipt, item.itemCode, `"${item.descriptionOfMaterials}"`, 
            item.challanNo, item.make, item.units, item.qty, item.damagedQty || 0, item.location, `"${item.remarks}"`, item.type
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = 'stock_register.csv';
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

  const totalItems = stockData.length;
  const totalQuantity = stockData.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const damagedItems = stockData.filter(item => (item.damagedQty || 0) > 0).length;

  return (
    <div className="stock-register-container">
      <div className="stock-register-header">
        <h1 className="stock-register-title">
          <Package className="stock-register-title-icon" />
          Stock Register
        </h1>
        <p className="stock-register-subtitle">Monitor and manage your inventory stock levels</p>
      </div>

      {/* Summary Cards - Removed Low Stock Alert */}
      <div className="stock-register-summary-cards">
        <Card className="stock-register-summary-card stock-register-summary-card-blue">
          <CardContent className="stock-register-summary-card-content">
            <div className="stock-register-summary-card-inner">
              <div>
                <p className="stock-register-summary-card-label text-blue-600">Total Items</p>
                <p className="stock-register-summary-card-value text-blue-800">{totalItems}</p>
              </div>
              <Package className="stock-register-summary-card-icon text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="stock-register-summary-card stock-register-summary-card-green">
          <CardContent className="stock-register-summary-card-content">
            <div className="stock-register-summary-card-inner">
              <div>
                <p className="stock-register-summary-card-label text-green-600">Total Quantity</p>
                <p className="stock-register-summary-card-value text-green-800">{totalQuantity}</p>
              </div>
              <TrendingUp className="stock-register-summary-card-icon text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="stock-register-summary-card stock-register-summary-card-red">
          <CardContent className="stock-register-summary-card-content">
            <div className="stock-register-summary-card-inner">
              <div>
                <p className="stock-register-summary-card-label text-red-600">Damaged Items</p>
                <p className="stock-register-summary-card-value text-red-800">{damagedItems}</p>
              </div>
              <X className="stock-register-summary-card-icon text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="stock-register-filter-card">
        <CardContent className="stock-register-filter-content">
          <div className="stock-register-filter-row">
            <div className="stock-register-search-container">
              <div className="relative">
                <Search className="stock-register-search-icon" />
                <Input
                  placeholder="Search by item code, description, or challan number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="stock-register-search-input"
                />
              </div>
            </div>
            <div className="stock-register-filter-controls">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="stock-register-filter-select">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                  <SelectItem value="sno">S.No</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="itemCode">Item Code</SelectItem>
                  <SelectItem value="description">Description</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="stock-register-download-buttons">
            <Button size="sm" onClick={() => downloadData('xml')} className="stock-register-download-btn stock-register-download-btn-blue">
              <Download className="stock-register-download-icon" />
              XML
            </Button>
            <Button size="sm" onClick={() => downloadData('json')} className="stock-register-download-btn stock-register-download-btn-green">
              <Download className="stock-register-download-icon" />
              JSON
            </Button>
            <Button size="sm" onClick={() => downloadData('excel')} className="stock-register-download-btn stock-register-download-btn-purple">
              <Download className="stock-register-download-icon" />
              Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card className="stock-register-table-card">
        <CardHeader>
          <CardTitle className="stock-register-table-title">
            <Package className="stock-register-table-icon" />
            Stock Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="stock-register-table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="stock-register-table-head">S.No</TableHead>
                  <TableHead className="stock-register-table-head">Date of Receipt</TableHead>
                  <TableHead className="stock-register-table-head">Item Code</TableHead>
                  <TableHead className="stock-register-table-head">Description Of Materials</TableHead>
                  <TableHead className="stock-register-table-head">Challan No</TableHead>
                  <TableHead className="stock-register-table-head">Make</TableHead>
                  <TableHead className="stock-register-table-head">Units</TableHead>
                  <TableHead className="stock-register-table-head">Qty</TableHead>
                  <TableHead className="stock-register-table-head">Damaged</TableHead>
                  <TableHead className="stock-register-table-head">Location</TableHead>
                  <TableHead className="stock-register-table-head">Remarks</TableHead>
                  <TableHead className="stock-register-table-head">Type</TableHead>
                  <TableHead className="stock-register-table-head">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id} className="stock-register-table-row">
                    <TableCell className="stock-register-table-cell">{index + 1}</TableCell>
                    <TableCell className="stock-register-table-cell">{new Date(item.dateOfReceipt).toLocaleDateString()}</TableCell>
                    <TableCell className="stock-register-table-cell stock-register-table-cell-code">{item.itemCode}</TableCell>
                    <TableCell className="stock-register-table-cell stock-register-table-cell-desc" title={item.descriptionOfMaterials}>
                      {item.descriptionOfMaterials}
                    </TableCell>
                    <TableCell className="stock-register-table-cell">{item.challanNo}</TableCell>
                    <TableCell className="stock-register-table-cell">{item.make}</TableCell>
                    <TableCell className="stock-register-table-cell">{item.units}</TableCell>
                    <TableCell className="stock-register-table-cell stock-register-table-cell-qty">
                      <div className="flex items-center gap-2">
                        {item.qty}
                        {parseInt(item.qty) < 5 && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="stock-register-table-cell font-semibold text-red-600">
                      {item.damagedQty || 0}
                    </TableCell>
                    <TableCell className="stock-register-table-cell">{item.location}</TableCell>
                    <TableCell className="stock-register-table-cell stock-register-table-cell-remarks" title={item.remarks}>
                      {item.remarks}
                    </TableCell>
                    <TableCell className="stock-register-table-cell">
                      <Badge className="stock-register-badge">
                        Stock
                      </Badge>
                    </TableCell>
                    <TableCell className="stock-register-table-cell">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="text-xs"
                            disabled={item.qty <= 0}
                          >
                            Mark Damaged
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Damage</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to mark 1 unit of "{item.descriptionOfMaterials}" as damaged? 
                              This will reduce the available quantity and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => markAsDamaged(item.id, 1)}>
                              Mark as Damaged
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="stock-register-empty-state">
              <Package className="stock-register-empty-icon" />
              <p>No stock items found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockRegister;
