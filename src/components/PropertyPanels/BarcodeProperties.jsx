/* src/components/PropertyPanels/BarcodeProperties.jsx */
import React from 'react';

const BarcodeProperties = ({ content, height, showText, barWidth, onChange }) => (
  <div className="prop-row">
    <label>Conteúdo:</label>
    <input 
      type="text" 
      value={content} 
      onChange={(e) => onChange('content', e.target.value)} 
    />
    <label>Alt:</label>
    <input 
      type="number" 
      value={height} 
      onChange={(e) => onChange('height', e.target.value)} 
    />
    <label>Largura:</label>
    <input 
      type="number" 
      value={barWidth} 
      onChange={(e) => onChange('barWidth', e.target.value)} 
    />
    <label className="checkbox-group">
      <input 
        type="checkbox" 
        checked={showText} 
        onChange={(e) => onChange('showText', e.target.checked)} 
      /> Texto
    </label>
  </div>
);

export default BarcodeProperties;