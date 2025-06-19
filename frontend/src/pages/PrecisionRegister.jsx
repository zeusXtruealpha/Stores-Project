
import React, { useState } from 'react';
import { Search, Download, Filter, Package, Calendar, Building, FileText } from 'lucide-react';
import './PrecisionRegister.css';

const PrecisionRegister = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [siteFilter, setSiteFilter] = useState('');

  // Sample data - replace with actual data from your backend
  const precisionData = [
    {
      id: 1,
      sNo: 'P001',
      itemCode: 'PT-001',
      description: 'Digital Caliper 0-150mm',
      challanNo: 'CH-2024-001',
      make: 'Mitutoyo',
      calibrationDate: '2024-01-15',
      dueDate: '2024-07-15',
      remarks: 'Calibrated successfully',
      site: 'RMD'
    },
    {
      id: 2,
      sNo: 'P002',
      itemCode: 'PT-002',
      description: 'Micrometer 0-25mm',
      challanNo: 'CH-2024-002',
      make: 'Starrett',
      calibrationDate: '2024-02-01',
      dueDate: '2024-08-01',
      remarks: 'Minor adjustment needed',
      site: 'OOT'
    },
    {
      id: 3,
      sNo: 'P003',
      itemCode: 'PT-003',
      description: 'Height Gauge 0-300mm',
      challanNo: 'CH-2024-003',
      make: 'Mitutoyo',
      calibrationDate: '2023-12-10',
      dueDate: '2024-06-10',
      remarks: 'Overdue for calibration',
      site: 'RMD'
    }
  ];

  const filteredData = precisionData.filter(item => {
    const matchesSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = siteFilter === '' || item.site === siteFilter;
    
    return matchesSearch && matchesSite;
  });

  const handleExportCSV = () => {
    const headers = ['S.No', 'Item Code', 'Description', 'Challan No', 'Make', 'Calibration Date', 'Due Date', 'Site', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.sNo,
        row.itemCode,
        `"${row.description}"`,
        row.challanNo,
        row.make,
        row.calibrationDate,
        row.dueDate,
        row.site,
        `"${row.remarks}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'precision-register.csv';
    a.click();
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Implement PDF export functionality
  };

  return (
    <div className="precision-register-container">
      <div className="precision-register-inner">
        {/* Header */}
        <div className="precision-register-header">
          <h1 className="precision-register-title">
            <Package className="precision-register-title-icon" />
            Precision Tools Register
          </h1>
          <p className="precision-register-subtitle">
            View and manage precision tools calibration records
          </p>
        </div>

        {/* Main Data Table Card */}
        <div className="precision-register-main-card">
          <div className="precision-register-card-header">
            <div className="precision-register-title-section">
              <div className="precision-register-title-left">
                <Package className="precision-register-icon" />
                <h2 className="precision-register-card-title">Precision Tools Data</h2>
              </div>
              
              <div className="precision-register-controls">
                {/* Search */}
                <div className="search-container">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by item code, description, or make..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                {/* Site Filter */}
                <select
                  value={siteFilter}
                  onChange={(e) => setSiteFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Sites</option>
                  <option value="RMD">RMD</option>
                  <option value="OOT">OOT</option>
                </select>

                {/* Export Buttons */}
                <div className="download-buttons">
                  <button onClick={handleExportCSV} className="download-btn download-btn-blue">
                    <Download className="download-icon" />
                    CSV
                  </button>
                  <button onClick={handleExportPDF} className="download-btn download-btn-green">
                    <Download className="download-icon" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="precision-register-table-container">
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">S.No</th>
                    <th className="table-th">Item Code</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Challan No</th>
                    <th className="table-th">Make</th>
                    <th className="table-th">Calibration Date</th>
                    <th className="table-th">Due Date</th>
                    <th className="table-th">Site</th>
                    <th className="table-th">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="table-td">{item.sNo}</td>
                      <td className="table-td">
                        <span className="table-td-code">{item.itemCode}</span>
                      </td>
                      <td className="table-td">{item.description}</td>
                      <td className="table-td">{item.challanNo}</td>
                      <td className="table-td">{item.make}</td>
                      <td className="table-td">{item.calibrationDate}</td>
                      <td className="table-td">{item.dueDate}</td>
                      <td className="table-td">
                        <span className={`badge ${item.site === 'RMD' ? 'badge-rmd' : 'badge-oot'}`}>
                          {item.site}
                        </span>
                      </td>
                      <td className="table-td">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrecisionRegister;
