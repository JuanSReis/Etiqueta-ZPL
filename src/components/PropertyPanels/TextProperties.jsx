/* src/components/PropertyPanels/TextProperties.jsx */
import React from 'react';

const TextProperties = ({ fontHeight, fontWidth, onFontSizeChange }) => (
  <div className="prop-row">
    <label>Fonte (H x W):</label>
    <input 
      type="number" 
      value={fontHeight} 
      onChange={(e) => onFontSizeChange('height', e.target.value)} 
    />
    <input 
      type="number" 
      value={fontWidth} 
      onChange={(e) => onFontSizeChange('width', e.target.value)} 
    />
  </div>
);

export default TextProperties;