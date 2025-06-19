
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Upload, FileText, Calendar, User, MapPin, Hash, Package, Wrench, Ruler, Archive, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './UpdateCenter.css';

const UpdateCenter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    dateOfReceipt: '',
    itemCode: '',
    descriptionOfMaterials: '',
    challanNo: '',
    make: '',
    units: '',
    qty: '',
    location: '',
    remarks: '',
    type: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call to Spring Boot backend
    console.log('Update Center Data:', formData);
    
    toast({
      title: "Success",
      description: "Transaction recorded successfully!",
    });
    
    // Reset form
    setFormData({
      dateOfReceipt: '',
      itemCode: '',
      descriptionOfMaterials: '',
      challanNo: '',
      make: '',
      units: '',
      qty: '',
      location: '',
      remarks: '',
      type: ''
    });
  };

  return (
    <div className="update-center-container">
      <div className="update-center-inner">
        <div className="update-center-header">
          <h1 className="update-center-title">
            <Sparkles className="update-center-title-icon" />
            Update Center
          </h1>
          <p className="update-center-subtitle">
            Record and manage inventory transactions with our advanced system
          </p>
        </div>

        <div className="update-center-main-card">
          <div className="update-center-card-header">
            <div className="update-center-card-title">
              <FileText className="update-center-card-icon" />
              Transaction Details
            </div>
          </div>
          
          <div className="update-center-form-container">
            <form onSubmit={handleSubmit} className="update-center-form">
              <div className="update-center-grid">
                {/* Date of Receipt */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Calendar className="update-center-label-icon" />
                    Date of Receipt
                  </Label>
                  <Input
                    type="date"
                    value={formData.dateOfReceipt}
                    onChange={(e) => handleInputChange('dateOfReceipt', e.target.value)}
                    className="update-center-input"
                    required
                  />
                </div>

                {/* Item Code */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Hash className="update-center-label-icon" />
                    Item Code
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter item code"
                    value={formData.itemCode}
                    onChange={(e) => handleInputChange('itemCode', e.target.value)}
                    className="update-center-input"
                    required
                  />
                </div>

                {/* Challan No */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <FileText className="update-center-label-icon" />
                    Challan Number
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter challan number"
                    value={formData.challanNo}
                    onChange={(e) => handleInputChange('challanNo', e.target.value)}
                    className="update-center-input"
                    required
                  />
                </div>

                {/* Make */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Wrench className="update-center-label-icon" />
                    Make/Brand
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter make or brand"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    className="update-center-input"
                  />
                </div>

                {/* Units */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Ruler className="update-center-label-icon" />
                    Units
                  </Label>
                  <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                    <SelectTrigger className="update-center-select">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">Pieces</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="ltr">Liters</SelectItem>
                      <SelectItem value="mtr">Meters</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="set">Set</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Package className="update-center-label-icon" />
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.qty}
                    onChange={(e) => handleInputChange('qty', e.target.value)}
                    className="update-center-input"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Location */}
                <div className="update-center-field-group update-center-field-double">
                  <Label className="update-center-label">
                    <MapPin className="update-center-label-icon" />
                    Storage Location
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter storage location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="update-center-input"
                  />
                </div>

                {/* Type */}
                <div className="update-center-field-group">
                  <Label className="update-center-label">
                    <Archive className="update-center-label-icon" />
                    Transaction Type
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)} required>
                    <SelectTrigger className="update-center-select">
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inward">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-xs">Inward</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="outward">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">Outward</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="damaged">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">Damaged</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description of Materials */}
              <div className="update-center-field-group update-center-field-full">
                <Label className="update-center-label">
                  <FileText className="update-center-label-icon" />
                  Description of Materials
                </Label>
                <Textarea
                  placeholder="Enter detailed description of materials"
                  value={formData.descriptionOfMaterials}
                  onChange={(e) => handleInputChange('descriptionOfMaterials', e.target.value)}
                  className="update-center-textarea"
                  required
                />
              </div>

              {/* Remarks */}
              <div className="update-center-field-group update-center-field-full">
                <Label className="update-center-label">
                  <User className="update-center-label-icon" />
                  Remarks & Notes
                </Label>
                <Textarea
                  placeholder="Enter any additional remarks or notes"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="update-center-textarea"
                />
              </div>

              <div className="update-center-actions">
                <Button 
                  type="submit" 
                  className="update-center-submit-btn"
                >
                  <Upload className="update-center-btn-icon" />
                  Record Transaction
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setFormData({
                    dateOfReceipt: '',
                    itemCode: '',
                    descriptionOfMaterials: '',
                    challanNo: '',
                    make: '',
                    units: '',
                    qty: '',
                    location: '',
                    remarks: '',
                    type: ''
                  })}
                  className="update-center-clear-btn"
                >
                  <RefreshCw className="update-center-btn-icon" />
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCenter;
