
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, TrendingUp, Package, Calendar, FileText, Download } from 'lucide-react';
import './Inward.css';

const Inward = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [inwardData, setInwardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock data
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
        remarks: 'New stock arrival',
        type: 'inward'
      },
      {
        id: 2,
        dateOfReceipt: '2024-01-16',
        itemCode: 'ITM002',
        descriptionOfMaterials: 'Wireless Mouse Logitech MX Master 3',
        challanNo: 'CH002',
        make: 'Logitech',
        units: 'pcs',
        qty: 10,
        location: 'Warehouse B',
        remarks: 'Bulk purchase',
        type: 'inward'
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
        remarks: 'For office setup',
        type: 'inward'
      }
    ];
    setInwardData(mockData);
  }, []);

  useEffect(() => {
    let filtered = inwardData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descriptionOfMaterials.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.challanNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
        (filterType === 'sno' && item.id <= 2) ||
        (filterType === 'date' && new Date(item.dateOfReceipt).getFullYear() === 2024) ||
        (filterType === 'itemCode' && item.itemCode.includes('ITM00')) ||
        (filterType === 'description' && item.descriptionOfMaterials.toLowerCase().includes('laptop')) ||
        (filterType === 'type' && item.type === 'inward') ||
        (filterType === 'location' && item.location === 'Warehouse A');
      
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterType, inwardData]);

  const downloadData = (format) => {
    const data = filteredData;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${data.map(item => 
          `  <item>\n    <id>${item.id}</id>\n    <dateOfReceipt>${item.dateOfReceipt}</dateOfReceipt>\n    <itemCode>${item.itemCode}</itemCode>\n    <descriptionOfMaterials>${item.descriptionOfMaterials}</descriptionOfMaterials>\n    <challanNo>${item.challanNo}</challanNo>\n    <make>${item.make}</make>\n    <units>${item.units}</units>\n    <qty>${item.qty}</qty>\n    <location>${item.location}</location>\n    <remarks>${item.remarks}</remarks>\n    <type>${item.type}</type>\n  </item>`
        ).join('\n')}\n</data>`;
        filename = 'inward_data.xml';
        mimeType = 'application/xml';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'inward_data.json';
        mimeType = 'application/json';
        break;
      case 'excel':
        const headers = ['S.No', 'Date of Receipt', 'Item Code', 'Description Of Materials', 'Challan No', 'Make', 'Units', 'Qty', 'Location', 'Remarks', 'Type'];
        const csvContent = [
          headers.join(','),
          ...data.map((item, index) => [
            index + 1, item.dateOfReceipt, item.itemCode, `"${item.descriptionOfMaterials}"`, 
            item.challanNo, item.make, item.units, item.qty, item.location, `"${item.remarks}"`, item.type
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = 'inward_data.csv';
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

  const totalItems = inwardData.length;
  const totalQuantity = inwardData.reduce((sum, item) => sum + parseInt(item.qty), 0);

  return (
    <div className="inward-container">
      <div className="inward-inner">
        <div className="inward-header">
          <h1 className="inward-title">
            <TrendingUp className="inward-title-icon" />
            Inward Management
          </h1>
          <p className="inward-subtitle">Track and manage all inward inventory transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="inward-summary-cards">
          <Card className="inward-summary-card inward-summary-card-green">
            <CardContent className="inward-summary-card-content">
              <div className="inward-summary-card-inner">
                <div>
                  <p className="inward-summary-card-label">Total Inward Items</p>
                  <p className="inward-summary-card-value">{totalItems}</p>
                </div>
                <Package className="inward-summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="inward-summary-card inward-summary-card-blue">
            <CardContent className="inward-summary-card-content">
              <div className="inward-summary-card-inner">
                <div>
                  <p className="inward-summary-card-label">Total Quantity</p>
                  <p className="inward-summary-card-value">{totalQuantity}</p>
                </div>
                <TrendingUp className="inward-summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="inward-summary-card inward-summary-card-purple">
            <CardContent className="inward-summary-card-content">
              <div className="inward-summary-card-inner">
                <div>
                  <p className="inward-summary-card-label">Recent Entries</p>
                  <p className="inward-summary-card-value">{inwardData.filter(item => {
                    const today = new Date();
                    const itemDate = new Date(item.dateOfReceipt);
                    const diffTime = Math.abs(today - itemDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 7;
                  }).length}</p>
                </div>
                <Calendar className="inward-summary-card-icon" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="inward-controls">
          <CardHeader>
            <CardTitle className="inward-controls-title">
              <Filter className="inward-controls-icon" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="inward-controls-content">
            <div className="inward-controls-grid">
              <div className="inward-search-container">
                <Search className="inward-search-icon" />
                <Input
                  placeholder="Search by item code, description, or challan number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="inward-search-input"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="inward-filter-select">
                  <Filter className="inward-filter-icon" />
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
            </div>
            <div className="inward-download-buttons">
              <Button size="sm" onClick={() => downloadData('xml')} className="inward-download-btn inward-download-btn-blue">
                <Download className="inward-download-icon" />
                XML
              </Button>
              <Button size="sm" onClick={() => downloadData('json')} className="inward-download-btn inward-download-btn-green">
                <Download className="inward-download-icon" />
                JSON
              </Button>
              <Button size="sm" onClick={() => downloadData('excel')} className="inward-download-btn inward-download-btn-purple">
                <Download className="inward-download-icon" />
                Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Data Table */}
        <Card className="inward-main-card">
          <CardHeader className="inward-card-header">
            <CardTitle className="inward-card-title">
              <FileText className="inward-card-icon" />
              Inward Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="inward-table-container">
            <Table className="inward-table">
              <TableHeader className="inward-table-header">
                <TableRow>
                  <TableHead className="inward-table-th">S.No</TableHead>
                  <TableHead className="inward-table-th">Date of Receipt</TableHead>
                  <TableHead className="inward-table-th">Item Code</TableHead>
                  <TableHead className="inward-table-th">Description Of Materials</TableHead>
                  <TableHead className="inward-table-th">Challan No</TableHead>
                  <TableHead className="inward-table-th">Make</TableHead>
                  <TableHead className="inward-table-th">Units</TableHead>
                  <TableHead className="inward-table-th">Qty</TableHead>
                  <TableHead className="inward-table-th">Location</TableHead>
                  <TableHead className="inward-table-th">Remarks</TableHead>
                  <TableHead className="inward-table-th">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id} className="inward-table-row">
                    <TableCell className="inward-table-td">{index + 1}</TableCell>
                    <TableCell className="inward-table-td">{new Date(item.dateOfReceipt).toLocaleDateString()}</TableCell>
                    <TableCell className="inward-table-td inward-table-code">{item.itemCode}</TableCell>
                    <TableCell className="inward-table-td" title={item.descriptionOfMaterials}>
                      {item.descriptionOfMaterials}
                    </TableCell>
                    <TableCell className="inward-table-td">{item.challanNo}</TableCell>
                    <TableCell className="inward-table-td">{item.make}</TableCell>
                    <TableCell className="inward-table-td">{item.units}</TableCell>
                    <TableCell className="inward-table-td">{item.qty}</TableCell>
                    <TableCell className="inward-table-td">{item.location}</TableCell>
                    <TableCell className="inward-table-td" title={item.remarks}>
                      {item.remarks}
                    </TableCell>
                    <TableCell className="inward-table-td">
                      <Badge className="inward-badge">
                        Inward
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="inward-empty-state">
                <Package className="inward-empty-icon" />
                <p>No inward transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inward;
