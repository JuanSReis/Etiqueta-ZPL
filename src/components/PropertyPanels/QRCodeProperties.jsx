/* src/components/PropertyPanels/QRCodeProperties.jsx */
import React from 'react';

const QRCodeProperties = ({ content, magnification, onChange }) => (
  <div className="prop-row">
    <label>Conteúdo:</label>
    <input 
      type="text" 
      className="qr-content-input"
      value={content} 
      onChange={(e) => onChange('content', e.target.value)} 
    />
    <label>Tamanho:</label>
    <input 
      type="number" 
      value={magnification} 
      onChange={(e) => onChange('magnification', e.target.value)} 
    />
  </div>
);

export default QRCodeProperties;