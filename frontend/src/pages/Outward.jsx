
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingDown, Search, Download, Filter, FileText, Package, AlertTriangle } from 'lucide-react';
import './Outward.css';

const Outward = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [outwardData, setOutwardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock outward data
    const mockData = [
      {
        id: 1,
        dateOfIssue: '2024-01-20',
        itemCode: 'ITM001',
        descriptionOfMaterials: 'Laptop Dell Inspiron 15 3000 Series',
        issueSlipNo: 'IS001',
        make: 'Dell',
        units: 'pcs',
        qty: 2,
        issuedTo: 'John Doe',
        department: 'IT Department',
        location: 'Warehouse A',
        remarks: 'Issued for project work',
        type: 'outward'
      },
      {
        id: 2,
        dateOfIssue: '2024-01-21',
        itemCode: 'ITM002',
        descriptionOfMaterials: 'Wireless Mouse Logitech MX Master 3',
        issueSlipNo: 'IS002',
        make: 'Logitech',
        units: 'pcs',
        qty: 5,
        issuedTo: 'Jane Smith',
        department: 'Design Team',
        location: 'Warehouse B',
        remarks: 'Bulk issue for team',
        type: 'outward'
      },
      {
        id: 3,
        dateOfIssue: '2024-01-22',
        itemCode: 'ITM003',
        descriptionOfMaterials: 'Office Chair Ergonomic with Lumbar Support',
        issueSlipNo: 'IS003',
        make: 'Steelcase',
        units: 'pcs',
        qty: 3,
        issuedTo: 'Mike Johnson',
        department: 'HR Department',
        location: 'Warehouse A',
        remarks: 'New employee setup',
        type: 'outward'
      }
    ];
    setOutwardData(mockData);
  }, []);

  useEffect(() => {
    let filtered = outwardData.filter(item => {
      const matchesSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.descriptionOfMaterials.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.issueSlipNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.issuedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'sno' && item.id <= 2) ||
                           (filterType === 'date' && new Date(item.dateOfIssue).getFullYear() === 2024) ||
                           (filterType === 'itemCode' && item.itemCode.includes('ITM00')) ||
                           (filterType === 'description' && item.descriptionOfMaterials.toLowerCase().includes('laptop')) ||
                           (filterType === 'type' && item.type === 'outward') ||
                           (filterType === 'location' && item.location === 'Warehouse A');
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterType, outwardData]);

  const downloadData = (format) => {
    const data = filteredData;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${data.map(item => 
          `  <item>\n    <id>${item.id}</id>\n    <dateOfIssue>${item.dateOfIssue}</dateOfIssue>\n    <itemCode>${item.itemCode}</itemCode>\n    <descriptionOfMaterials>${item.descriptionOfMaterials}</descriptionOfMaterials>\n    <issueSlipNo>${item.issueSlipNo}</issueSlipNo>\n    <make>${item.make}</make>\n    <units>${item.units}</units>\n    <qty>${item.qty}</qty>\n    <issuedTo>${item.issuedTo}</issuedTo>\n    <department>${item.department}</department>\n    <location>${item.location}</location>\n    <remarks>${item.remarks}</remarks>\n    <type>${item.type}</type>\n  </item>`
        ).join('\n')}\n</data>`;
        filename = 'outward_register.xml';
        mimeType = 'application/xml';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'outward_register.json';
        mimeType = 'application/json';
        break;
      case 'excel':
        const headers = ['S.No', 'Date of Issue', 'Item Code', 'Description Of Materials', 'Issue Slip No', 'Make', 'Units', 'Qty', 'Issued To', 'Department', 'Location', 'Remarks', 'Type'];
        const csvContent = [
          headers.join(','),
          ...data.map((item, index) => [
            index + 1, item.dateOfIssue, item.itemCode, `"${item.descriptionOfMaterials}"`, 
            item.issueSlipNo, item.make, item.units, item.qty, item.issuedTo, item.department, item.location, `"${item.remarks}"`, item.type
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = 'outward_register.csv';
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

  const totalItems = outwardData.length;
  const totalQuantity = outwardData.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const uniqueDepartments = [...new Set(outwardData.map(item => item.department))].length;

  return (
    <div className="outward-container">
      <div className="outward-header">
        <h1 className="outward-title">
          <TrendingDown className="outward-title-icon" />
          Outward Register
        </h1>
        <p className="outward-subtitle">Track and manage all outbound inventory movements</p>
      </div>

      {/* Summary Cards */}
      <div className="outward-summary-cards">
        <Card className="outward-summary-card outward-summary-card-red">
          <CardContent className="outward-summary-card-content">
            <div className="outward-summary-card-inner">
              <div>
                <p className="outward-summary-card-label">Total Issues</p>
                <p className="outward-summary-card-value">{totalItems}</p>
              </div>
              <TrendingDown className="outward-summary-card-icon" />
            </div>
          </CardContent>
        </Card>

        <Card className="outward-summary-card outward-summary-card-orange">
          <CardContent className="outward-summary-card-content">
            <div className="outward-summary-card-inner">
              <div>
                <p className="outward-summary-card-label">Total Quantity</p>
                <p className="outward-summary-card-value">{totalQuantity}</p>
              </div>
              <Package className="outward-summary-card-icon" />
            </div>
          </CardContent>
        </Card>

        <Card className="outward-summary-card outward-summary-card-purple">
          <CardContent className="outward-summary-card-content">
            <div className="outward-summary-card-inner">
              <div>
                <p className="outward-summary-card-label">Departments</p>
                <p className="outward-summary-card-value">{uniqueDepartments}</p>
              </div>
              <FileText className="outward-summary-card-icon" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="outward-filter-card">
        <CardContent className="outward-filter-content">
          <div className="outward-filter-row">
            <div className="outward-search-container">
              <div className="relative">
                <Search className="outward-search-icon" />
                <Input
                  placeholder="Search by item code, description, issue slip, or issued to..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="outward-search-input"
                />
              </div>
            </div>
            <div className="outward-filter-controls">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="outward-filter-select">
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
          </div>
          <div className="outward-download-buttons">
            <Button size="sm" onClick={() => downloadData('xml')} className="outward-download-btn outward-download-btn-blue">
              <Download className="outward-download-icon" />
              XML
            </Button>
            <Button size="sm" onClick={() => downloadData('json')} className="outward-download-btn outward-download-btn-green">
              <Download className="outward-download-icon" />
              JSON
            </Button>
            <Button size="sm" onClick={() => downloadData('excel')} className="outward-download-btn outward-download-btn-purple">
              <Download className="outward-download-icon" />
              Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Outward Table */}
      <Card className="outward-table-card">
        <CardHeader>
          <CardTitle className="outward-table-title">
            <TrendingDown className="outward-table-icon" />
            Outward Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="outward-table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="outward-table-head">S.No</TableHead>
                  <TableHead className="outward-table-head">Date of Issue</TableHead>
                  <TableHead className="outward-table-head">Item Code</TableHead>
                  <TableHead className="outward-table-head">Description Of Materials</TableHead>
                  <TableHead className="outward-table-head">Issue Slip No</TableHead>
                  <TableHead className="outward-table-head">Make</TableHead>
                  <TableHead className="outward-table-head">Units</TableHead>
                  <TableHead className="outward-table-head">Qty</TableHead>
                  <TableHead className="outward-table-head">Issued To</TableHead>
                  <TableHead className="outward-table-head">Department</TableHead>
                  <TableHead className="outward-table-head">Location</TableHead>
                  <TableHead className="outward-table-head">Remarks</TableHead>
                  <TableHead className="outward-table-head">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id} className="outward-table-row">
                    <TableCell className="outward-table-cell">{index + 1}</TableCell>
                    <TableCell className="outward-table-cell">{new Date(item.dateOfIssue).toLocaleDateString()}</TableCell>
                    <TableCell className="outward-table-cell outward-table-cell-code">{item.itemCode}</TableCell>
                    <TableCell className="outward-table-cell outward-table-cell-desc" title={item.descriptionOfMaterials}>
                      {item.descriptionOfMaterials}
                    </TableCell>
                    <TableCell className="outward-table-cell">{item.issueSlipNo}</TableCell>
                    <TableCell className="outward-table-cell">{item.make}</TableCell>
                    <TableCell className="outward-table-cell">{item.units}</TableCell>
                    <TableCell className="outward-table-cell outward-table-cell-qty">{item.qty}</TableCell>
                    <TableCell className="outward-table-cell">{item.issuedTo}</TableCell>
                    <TableCell className="outward-table-cell">{item.department}</TableCell>
                    <TableCell className="outward-table-cell">{item.location}</TableCell>
                    <TableCell className="outward-table-cell outward-table-cell-remarks" title={item.remarks}>
                      {item.remarks}
                    </TableCell>
                    <TableCell className="outward-table-cell">
                      <Badge className="outward-badge">
                        Outward
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="outward-empty-state">
              <TrendingDown className="outward-empty-icon" />
              <p>No outward records found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Outward;
