
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Search, Filter, Calendar, Package, FileText, Download, Clock } from 'lucide-react';
import './PrecisionHistory.css';

const PrecisionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock precision history data
    const mockData = [
      {
        id: 1,
        itemCode: 'PT-001',
        description: 'Digital Caliper 0-150mm',
        challanNo: 'CH-2024-001',
        make: 'Mitutoyo',
        calibrationDate: '2024-01-15',
        dueDate: '2024-07-15',
        remarks: 'Successful calibration, minor adjustment made',
        site: 'RMD'
      },
      {
        id: 2,
        itemCode: 'PT-002',
        description: 'Micrometer 0-25mm',
        challanNo: 'CH-2024-002',
        make: 'Starrett',
        calibrationDate: '2024-01-20',
        dueDate: '2024-07-20',
        remarks: 'Cleaning and lubrication performed',
        site: 'OOT'
      },
      {
        id: 3,
        itemCode: 'PT-003',
        description: 'Height Gauge 0-300mm',
        challanNo: 'CH-2024-003',
        make: 'Fowler',
        calibrationDate: '2024-01-25',
        dueDate: '2024-07-25',
        remarks: 'Replaced damaged components',
        site: 'RMD'
      },
      {
        id: 4,
        itemCode: 'PT-004',
        description: 'Dial Indicator 0-10mm',
        challanNo: 'CH-2024-004',
        make: 'Mitutoyo',
        calibrationDate: '2024-02-01',
        dueDate: '2024-08-01',
        remarks: 'Standard calibration procedure completed',
        site: 'OOT'
      },
      {
        id: 5,
        itemCode: 'PT-005',
        description: 'Surface Roughness Tester',
        challanNo: 'CH-2024-005',
        make: 'Taylor Hobson',
        calibrationDate: '2024-02-05',
        dueDate: '2024-08-05',
        remarks: 'Calibration with new standards',
        site: 'RMD'
      }
    ];
    setHistoryData(mockData);
  }, []);

  useEffect(() => {
    let filtered = historyData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.remarks.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
        (filterType === 'site' && item.site === 'RMD') ||
        (filterType === 'make' && item.make === 'Mitutoyo') ||
        (filterType === 'date' && new Date(item.calibrationDate).getFullYear() === 2024);
      
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterType, historyData]);

  const downloadData = (format) => {
    const data = filteredData;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${data.map(item => 
          `  <item>\n    <id>${item.id}</id>\n    <itemCode>${item.itemCode}</itemCode>\n    <description>${item.description}</description>\n    <challanNo>${item.challanNo}</challanNo>\n    <make>${item.make}</make>\n    <calibrationDate>${item.calibrationDate}</calibrationDate>\n    <dueDate>${item.dueDate}</dueDate>\n    <remarks>${item.remarks}</remarks>\n    <site>${item.site}</site>\n  </item>`
        ).join('\n')}\n</data>`;
        filename = 'precision_history.xml';
        mimeType = 'application/xml';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'precision_history.json';
        mimeType = 'application/json';
        break;
      case 'excel':
        const headers = ['S.No', 'Item Code', 'Description Of Materials', 'Challan No', 'Make', 'Calibration Date', 'Due Date', 'Remarks', 'Site'];
        const csvContent = [
          headers.join(','),
          ...data.map((item, index) => [
            index + 1, item.itemCode, `"${item.description}"`, item.challanNo, 
            item.make, item.calibrationDate, item.dueDate, `"${item.remarks}"`, item.site
          ].join(','))
        ].join('\n');
        content = csvContent;
        filename = 'precision_history.csv';
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

  const totalItems = historyData.length;
  const dueSoon = historyData.filter(item => {
    const today = new Date();
    const dueDate = new Date(item.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;
  const recentCalibrations = historyData.filter(item => {
    const today = new Date();
    const calDate = new Date(item.calibrationDate);
    const diffTime = Math.abs(today - calDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length;

  return (
    <div className="precision-history-container">
      <div className="precision-history-inner">
        <div className="precision-history-header">
          <h1 className="precision-history-title">
            <History className="precision-history-title-icon" />
            Precision Tools History
          </h1>
          <p className="precision-history-subtitle">Track all precision tools calibration records and schedules</p>
        </div>

        {/* Summary Cards */}
        <div className="precision-history-summary-cards">
          <Card className="precision-history-summary-card precision-history-summary-card-orange">
            <CardContent className="precision-history-summary-card-content">
              <div className="precision-history-summary-card-inner">
                <div>
                  <p className="precision-history-summary-card-label">Total Items</p>
                  <p className="precision-history-summary-card-value">{totalItems}</p>
                </div>
                <FileText className="precision-history-summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="precision-history-summary-card precision-history-summary-card-green">
            <CardContent className="precision-history-summary-card-content">
              <div className="precision-history-summary-card-inner">
                <div>
                  <p className="precision-history-summary-card-label">Due Soon</p>
                  <p className="precision-history-summary-card-value">{dueSoon}</p>
                </div>
                <Package className="precision-history-summary-card-icon" />
              </div>
            </CardContent>
          </Card>

          <Card className="precision-history-summary-card precision-history-summary-card-blue">
            <CardContent className="precision-history-summary-card-content">
              <div className="precision-history-summary-card-inner">
                <div>
                  <p className="precision-history-summary-card-label">Recent Calibrations</p>
                  <p className="precision-history-summary-card-value">{recentCalibrations}</p>
                </div>
                <Clock className="precision-history-summary-card-icon" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="precision-history-controls">
          <CardHeader>
            <CardTitle className="precision-history-controls-title">
              <Filter className="precision-history-controls-icon" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="precision-history-controls-content">
            <div className="precision-history-controls-grid">
              <div className="precision-history-search-container">
                <Search className="precision-history-search-icon" />
                <Input
                  placeholder="Search by item code, description, challan no, make, or remarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="precision-history-search-input"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="precision-history-filter-select">
                  <Filter className="precision-history-filter-icon" />
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="site">Site (RMD)</SelectItem>
                  <SelectItem value="make">Make (Mitutoyo)</SelectItem>
                  <SelectItem value="date">Current Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="precision-history-download-buttons">
              <Button size="sm" onClick={() => downloadData('xml')} className="precision-history-download-btn precision-history-download-btn-blue">
                <Download className="precision-history-download-icon" />
                XML
              </Button>
              <Button size="sm" onClick={() => downloadData('json')} className="precision-history-download-btn precision-history-download-btn-green">
                <Download className="precision-history-download-icon" />
                JSON
              </Button>
              <Button size="sm" onClick={() => downloadData('excel')} className="precision-history-download-btn precision-history-download-btn-purple">
                <Download className="precision-history-download-icon" />
                Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Data Table */}
        <Card className="precision-history-main-card">
          <CardHeader className="precision-history-card-header">
            <CardTitle className="precision-history-card-title">
              <History className="precision-history-card-icon" />
              Precision Tools Activity History
            </CardTitle>
          </CardHeader>
          <CardContent className="precision-history-table-container">
            <Table className="precision-history-table">
              <TableHeader className="precision-history-table-header">
                <TableRow>
                  <TableHead className="precision-history-table-th">S.No</TableHead>
                  <TableHead className="precision-history-table-th">Item Code</TableHead>
                  <TableHead className="precision-history-table-th">Description Of Materials</TableHead>
                  <TableHead className="precision-history-table-th">Challan No</TableHead>
                  <TableHead className="precision-history-table-th">Make</TableHead>
                  <TableHead className="precision-history-table-th">Calibration Date</TableHead>
                  <TableHead className="precision-history-table-th">Due Date</TableHead>
                  <TableHead className="precision-history-table-th">Remarks</TableHead>
                  <TableHead className="precision-history-table-th">Site</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id} className="precision-history-table-row">
                    <TableCell className="precision-history-table-td">{index + 1}</TableCell>
                    <TableCell className="precision-history-table-td precision-history-table-code">{item.itemCode}</TableCell>
                    <TableCell className="precision-history-table-td" title={item.description}>
                      {item.description}
                    </TableCell>
                    <TableCell className="precision-history-table-td">{item.challanNo}</TableCell>
                    <TableCell className="precision-history-table-td">{item.make}</TableCell>
                    <TableCell className="precision-history-table-td">{new Date(item.calibrationDate).toLocaleDateString()}</TableCell>
                    <TableCell className="precision-history-table-td">{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="precision-history-table-td" title={item.remarks}>
                      {item.remarks}
                    </TableCell>
                    <TableCell className="precision-history-table-td">
                      <Badge className={`precision-history-site-badge ${item.site === 'RMD' ? 'precision-history-badge-rmd' : 'precision-history-badge-oot'}`}>
                        {item.site}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="precision-history-empty-state">
                <History className="precision-history-empty-icon" />
                <p>No precision tools history found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrecisionHistory;
