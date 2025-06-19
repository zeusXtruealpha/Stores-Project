import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Search, Download, TrendingUp, TrendingDown, AlertTriangle, Filter } from 'lucide-react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock transaction data
    const mockData = [
      {
        id: 1,
        date: '2024-01-15',
        itemCode: 'ITM001',
        description: 'Laptop Dell Inspiron 15 3000 Series',
        quantity: 5,
        type: 'inward',
        reference: 'CH001',
        user: 'Admin',
        remarks: 'New stock received'
      },
      {
        id: 2,
        date: '2024-01-20',
        itemCode: 'ITM001',
        description: 'Laptop Dell Inspiron 15 3000 Series',
        quantity: 2,
        type: 'outward',
        reference: 'IS001',
        user: 'John Doe',
        remarks: 'Issued for project work'
      },
      {
        id: 3,
        date: '2024-01-22',
        itemCode: 'ITM004',
        description: 'Monitor 24 inch LED Display',
        quantity: 1,
        type: 'damaged',
        reference: 'DM001',
        user: 'Admin',
        remarks: 'Screen cracked during transport'
      },
      {
        id: 4,
        date: '2024-01-25',
        itemCode: 'ITM002',
        description: 'Wireless Mouse Logitech MX Master 3',
        quantity: 10,
        type: 'inward',
        reference: 'CH002',
        user: 'Admin',
        remarks: 'Bulk purchase for office'
      },
      {
        id: 5,
        date: '2024-01-28',
        itemCode: 'ITM003',
        description: 'USB Cable Type-C Premium Quality',
        quantity: 3,
        type: 'outward',
        reference: 'IS002',
        user: 'Jane Smith',
        remarks: 'For mobile charging stations'
      }
    ];
    setTransactions(mockData);
  }, []);

  useEffect(() => {
    let filtered = transactions.filter(item => {
      const matchesSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesFilter;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterType, transactions]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'inward':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'outward':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'damaged':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-inner">
        <div className="transaction-history-header">
          <h1 className="transaction-history-title">
            <History className="transaction-history-title-icon" />
            Transaction History
          </h1>
          <p className="transaction-history-subtitle">
            Complete overview of all inventory transactions and movements
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="transaction-history-controls">
          <CardHeader className="transaction-history-controls-header">
            <CardTitle className="transaction-history-controls-title">
              <Filter className="w-6 h-6" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="transaction-history-controls-content">
            <div className="transaction-history-controls-grid">
              <div className="transaction-history-search-container">
                <Search className="transaction-history-search-icon" />
                <Input
                  placeholder="Search by item code, description, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="transaction-history-search-input"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="transaction-history-filter-select">
                  <SelectValue placeholder="Filter by type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inward">Inward Only</SelectItem>
                  <SelectItem value="outward">Outward Only</SelectItem>
                  <SelectItem value="damaged">Damaged Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Table */}
        <Card className="transaction-history-main-card">
          <CardHeader className="transaction-history-card-header">
            <CardTitle className="transaction-history-card-title">
              <History className="transaction-history-card-icon" />
              Transaction Records
            </CardTitle>
          </CardHeader>
          <CardContent className="transaction-history-table-container">
            <Table className="transaction-history-table">
              <TableHeader className="transaction-history-table-header">
                <TableRow>
                  <TableHead className="transaction-history-table-th">S.No</TableHead>
                  <TableHead className="transaction-history-table-th">Date</TableHead>
                  <TableHead className="transaction-history-table-th">Item Code</TableHead>
                  <TableHead className="transaction-history-table-th">Description</TableHead>
                  <TableHead className="transaction-history-table-th">Quantity</TableHead>
                  <TableHead className="transaction-history-table-th">Type</TableHead>
                  <TableHead className="transaction-history-table-th">Reference</TableHead>
                  <TableHead className="transaction-history-table-th">User</TableHead>
                  <TableHead className="transaction-history-table-th">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((transaction, index) => (
                  <TableRow key={transaction.id} className="transaction-history-table-row">
                    <TableCell className="transaction-history-table-td font-medium">{index + 1}</TableCell>
                    <TableCell className="transaction-history-table-td">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="transaction-history-table-td">
                      <span className="transaction-history-table-code">{transaction.itemCode}</span>
                    </TableCell>
                    <TableCell className="transaction-history-table-td max-w-[200px] truncate" title={transaction.description}>
                      {transaction.description}
                    </TableCell>
                    <TableCell className="transaction-history-table-td font-semibold">{transaction.quantity}</TableCell>
                    <TableCell className="transaction-history-table-td">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <Badge className={`transaction-history-badge-${transaction.type}`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="transaction-history-table-td">{transaction.reference}</TableCell>
                    <TableCell className="transaction-history-table-td">{transaction.user}</TableCell>
                    <TableCell className="transaction-history-table-td max-w-[150px] truncate" title={transaction.remarks}>
                      {transaction.remarks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="transaction-history-empty-state">
                <History className="transaction-history-empty-icon" />
                <p>No transactions found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory; 