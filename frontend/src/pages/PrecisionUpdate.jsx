
import React, { useState } from 'react';
import { Calendar, Package, FileText, Building, AlertCircle, CheckCircle } from 'lucide-react';
import './PrecisionUpdate.css';

const PrecisionUpdate = () => {
  const [formData, setFormData] = useState({
    sNo: '',
    itemCode: '',
    description: '',
    challanNo: '',
    make: '',
    calibrationDate: '',
    dueDate: '',
    remarks: '',
    site: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Precision Update Data:', formData);
    // Handle form submission here
  };

  const handleClear = () => {
    setFormData({
      sNo: '',
      itemCode: '',
      description: '',
      challanNo: '',
      make: '',
      calibrationDate: '',
      dueDate: '',
      remarks: '',
      site: ''
    });
  };

  return (
    <div className="precision-update-container">
      <div className="precision-update-inner">
        {/* Header */}
        <div className="precision-update-header">
          <h1 className="precision-update-title">
            <Package className="precision-update-title-icon" />
            Precision Tools Update
          </h1>
          <p className="precision-update-subtitle">
            Update calibration and maintenance records for precision tools
          </p>
        </div>

        {/* Main Form Card */}
        <div className="precision-update-main-card">
          <div className="precision-update-card-header">
            <h2 className="precision-update-card-title">
              <FileText className="precision-update-card-icon" />
              Precision Tool Information
            </h2>
          </div>

          <div className="precision-update-form-container">
            <form onSubmit={handleSubmit} className="precision-update-form">
              <div className="precision-update-grid">
                {/* S.No */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <FileText className="precision-update-label-icon" />
                    S.No
                  </label>
                  <input
                    type="text"
                    name="sNo"
                    value={formData.sNo}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    placeholder="Enter serial number"
                    required
                  />
                </div>

                {/* Item Code */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <Package className="precision-update-label-icon" />
                    Item Code
                  </label>
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    placeholder="Enter item code"
                    required
                  />
                </div>

                {/* Make */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <Building className="precision-update-label-icon" />
                    Make
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    placeholder="Enter make/brand"
                    required
                  />
                </div>

                {/* Description of Materials */}
                <div className="precision-update-field-group precision-update-field-full">
                  <label className="precision-update-label">
                    <FileText className="precision-update-label-icon" />
                    Description Of Materials
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="precision-update-textarea"
                    placeholder="Enter detailed description of materials"
                    required
                  />
                </div>

                {/* Challan No */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <FileText className="precision-update-label-icon" />
                    Challan No
                  </label>
                  <input
                    type="text"
                    name="challanNo"
                    value={formData.challanNo}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    placeholder="Enter challan number"
                    required
                  />
                </div>

                {/* Calibration Date */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <Calendar className="precision-update-label-icon" />
                    Calibration Date
                  </label>
                  <input
                    type="date"
                    name="calibrationDate"
                    value={formData.calibrationDate}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    required
                  />
                </div>

                {/* Due Date */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <AlertCircle className="precision-update-label-icon" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="precision-update-input"
                    required
                  />
                </div>

                {/* Site */}
                <div className="precision-update-field-group">
                  <label className="precision-update-label">
                    <Building className="precision-update-label-icon" />
                    Site
                  </label>
                  <select
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    className="precision-update-select"
                    required
                  >
                    <option value="">Select Site</option>
                    <option value="RMD">RMD</option>
                    <option value="OOT">OOT</option>
                  </select>
                </div>

                {/* Remarks */}
                <div className="precision-update-field-group precision-update-field-double">
                  <label className="precision-update-label">
                    <FileText className="precision-update-label-icon" />
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="precision-update-textarea"
                    placeholder="Enter any additional remarks"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="precision-update-actions">
                <button type="submit" className="precision-update-submit-btn">
                  <CheckCircle className="precision-update-btn-icon" />
                  Update Precision Tool
                </button>
                <button type="button" onClick={handleClear} className="precision-update-clear-btn">
                  <AlertCircle className="precision-update-btn-icon" />
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrecisionUpdate;
