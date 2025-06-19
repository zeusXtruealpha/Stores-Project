import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Database, TrendingUp, Shield, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UpdateData = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setMessage('');
      } else {
        setMessage('Please select a valid Excel file (.xls or .xlsx)');
        setMessageType('error');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      setMessageType('error');
      return;
    }

    setIsUploading(true);
    setMessage('');

    try {
      // TODO: Replace with actual API call to Spring Boot backend
      // When processing the Excel file, the backend should:
      // 1. Check if "Transaction By" field is empty or missing
      // 2. If empty/missing, set it to the current admin user's name
      // 3. Check if "Time" field is empty or missing  
      // 4. If empty/missing, set it to current timestamp
      // 
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('adminId', user?.id || '');
      // formData.append('adminName', user?.fullName || '');
      // const response = await fetch('/api/admin/update-data', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      console.log('Uploading file:', file.name);
      console.log('Admin processing data with defaults:', {
        transactionBy: user?.fullName,
        currentTime: new Date().toISOString()
      });

      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMessage('Data updated successfully! Missing "Transaction By" fields were set to your name, and missing timestamps were set to current time.');
      setMessageType('success');
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setMessage('Failed to update data. Please try again.');
      setMessageType('error');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 font-display">
            Database Update Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Seamlessly upload Excel files to update your inventory database with intelligent auto-fill features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Defaults</h3>
            <p className="text-sm text-gray-600">Auto-fills missing fields intelligently</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Secure Upload</h3>
            <p className="text-sm text-gray-600">Protected file validation process</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Excel Support</h3>
            <p className="text-sm text-gray-600">Full .xls and .xlsx compatibility</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Processing</h3>
            <p className="text-sm text-gray-600">Instant database updates</p>
          </div>
        </div>

        {/* Main Upload Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/30">
          
          {/* File Format Info */}
          <div className="mb-10">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center font-display">
                <CheckCircle className="w-7 h-7 text-green-500 mr-3" />
                Excel File Format & Smart Defaults
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/60 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-700 mb-4 text-blue-600">Required Columns:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span><strong>Column A:</strong> Item Code</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span><strong>Column B:</strong> Description</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span><strong>Column C:</strong> Count</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span><strong>Column D:</strong> Type (import/export)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/60 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-gray-700 mb-4 text-purple-600">Auto-filled if Empty:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span><strong>Transaction By:</strong> {user?.fullName}</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span><strong>Time:</strong> Current timestamp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-8">
            <div>
              <label htmlFor="fileInput" className="block text-lg font-semibold text-gray-700 mb-4">
                Select Excel File
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center w-full h-48 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-500 group hover:border-blue-400 hover:shadow-xl"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300 group-hover:scale-110" />
                    <p className="mb-2 text-lg text-gray-500 group-hover:text-gray-700 font-semibold">
                      <span className="font-bold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">Excel files only (.xls, .xlsx)</p>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {file && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  File Ready for Upload
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-gray-600"><strong className="text-gray-800">Name:</strong></p>
                    <p className="font-semibold text-gray-800 truncate">{file.name}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-gray-600"><strong className="text-gray-800">Size:</strong></p>
                    <p className="font-semibold text-gray-800">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4">
                    <p className="text-gray-600"><strong className="text-gray-800">Type:</strong></p>
                    <p className="font-semibold text-gray-800">Excel Spreadsheet</p>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className={`p-6 rounded-2xl border-2 ${
                messageType === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-green-50 text-green-700 border-green-200'
              } animate-fade-in`}>
                <div className="flex items-center">
                  {messageType === 'error' ? (
                    <AlertCircle className="w-6 h-6 mr-3" />
                  ) : (
                    <CheckCircle className="w-6 h-6 mr-3" />
                  )}
                  <p>{message}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  !file || isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload & Process'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateData;
