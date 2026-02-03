
import React from 'react';
import { Type, Minus, Square, QrCode, Barcode, Trash2, Play, BoxSelect } from 'lucide-react'; // BoxSelect opcional para icone
import './Toolbar.css';

import TextProperties from './PropertyPanels/TextProperties';

function Toolbar({
  onAddText, onAddLine, onAddSquare, onAddFilledSquare,
  onAddQRCode, onAddBarcode, onClearAll,
  labelWidth, labelHeight, onWidthChange, onHeightChange,
  selectedElement, fontHeight, fontWidth, onFontSizeChange,
  qrCodeContent, qrCodeMagnification, onQRCodeChange,
  barcodeContent, barcodeHeight, barcodeShowText, barcodeBarWidth, onBarcodeChange,
  elementThickness, onThicknessChange,
  onPositionChange
}) {

  const selectedType = selectedElement?.type;

  return (
    <>
<aside className="sidebar">
        <button onClick={onAddText} className={selectedType === 'text' ? 'active' : ''} title="Texto (T)"><Type size={22} /></button>
        <button onClick={onAddLine} className={selectedType === 'line' ? 'active' : ''} title="Linha (L)"><Minus size={22} /></button>
        <button onClick={onAddSquare} className={selectedType === 'square' ? 'active' : ''} title="Retângulo (R)"><Square size={22} /></button>
        <button onClick={onAddFilledSquare} className={selectedType === 'filled-square' ? 'active' : ''} title="Bloco Preenchido"><Square size={22} fill="currentColor" /></button>
        <button onClick={onAddQRCode} className={selectedType === 'qrcode' ? 'active' : ''} title="QR Code (Q)"><QrCode size={22} /></button>
        <button onClick={onAddBarcode} className={selectedType === 'barcode' ? 'active' : ''} title="Código de Barras (B)"><Barcode size={22} /></button>
        <hr />
        <button onClick={onClearAll} className="clear-button" title="Limpar Tudo"><Trash2 size={22} /></button>
      </aside>

<header className="top-toolbar">
        <div className="input-group-horizontal">
          <label>Etiqueta (cm):</label>
          <input type="number" value={labelWidth} onChange={onWidthChange} />
          <span>x</span>
          <input type="number" value={labelHeight} onChange={onHeightChange} />
        </div>

        <div className="vertical-divider"></div>

        {selectedElement && (
          <>
            {}
            {(selectedType === 'line' || selectedType === 'square' || selectedType === 'filled-square') ? (
              <div className="prop-row" style={{ gap: '15px' }}>
                {}
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <label style={{ color: '#2563eb' }}>Início:</label>
                  <label>X</label>
                  <input type="number" className="manual-input"
                    value={selectedType === 'line' ? selectedElement.x1 : selectedElement.x}
                    onChange={(e) => onPositionChange(selectedType === 'line' ? 'x1' : 'x', e.target.value)}
                  />
                  <label>Y</label>
                  <input type="number" className="manual-input"
                    value={selectedType === 'line' ? selectedElement.y1 : selectedElement.y}
                    onChange={(e) => onPositionChange(selectedType === 'line' ? 'y1' : 'y', e.target.value)}
                  />
                </div>

                <div className="vertical-divider" style={{ height: '15px' }}></div>

                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <label style={{ color: '#dc2626' }}>Final:</label>
                  <label>X</label>
                  <input type="number" className="manual-input"
                    value={selectedType === 'line' ? selectedElement.x2 : (selectedElement.x + selectedElement.width)}
                    onChange={(e) => onPositionChange(selectedType === 'line' ? 'x2' : 'xFinal', e.target.value)}
                  />
                  <label>Y</label>
                  <input type="number" className="manual-input"
                    value={selectedType === 'line' ? selectedElement.y2 : (selectedElement.y + selectedElement.height)}
                    onChange={(e) => onPositionChange(selectedType === 'line' ? 'y2' : 'yFinal', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="prop-row">
                <label>X:</label>
                <input type="number" className="manual-input" value={selectedElement.x ?? ''} onChange={(e) => onPositionChange('x', e.target.value)} />
                <label>Y:</label>
                <input type="number" className="manual-input" value={selectedElement.y ?? ''} onChange={(e) => onPositionChange('y', e.target.value)} />
              </div>
            )}

            {}
            {(selectedType === 'line' || selectedType === 'square') && (
              <>
                <div className="vertical-divider"></div>
                <div className="prop-row">
                  <label title="Espessura da linha em pixels">Espessura:</label>
                  <input
                    type="number"
                    className="manual-input"
                    style={{ width: '50px !important' }}
                    value={elementThickness}
                    onChange={(e) => onThicknessChange(e.target.value)}
                    min="1"
                  />
                  <span style={{ fontSize: '11px', color: '#64748b' }}>px</span>
                </div>
              </>
            )}

            <div className="vertical-divider"></div>
          </>
        )}

        <div className="dynamic-props">
          {selectedType === 'text' && (
            <TextProperties fontHeight={fontHeight} fontWidth={fontWidth} onFontSizeChange={onFontSizeChange} />
          )}
          {selectedType === 'qrcode' && (
            <div className="prop-row">
              <label>Mag:</label>
              <input
                type="number"
                className="manual-input"
                value={qrCodeMagnification}
                onChange={(e) => onQRCodeChange('magnification', e.target.value)}
              />
              {}
              <label>Dados:</label>
              <input
                type="text"
                className="manual-input qr-content-input"
                value={qrCodeContent}
                onChange={(e) => onQRCodeChange('content', e.target.value)}
                placeholder="Conteúdo do QR Code"
              />
            </div>
          )}

          {selectedType === 'barcode' && (
            <div className="prop-row">
              <label>Alt:</label>
              <input
                type="number"
                className="manual-input"
                value={barcodeHeight}
                onChange={(e) => onBarcodeChange('height', e.target.value)}
              />
              <label>Larg:</label>
              <input
                type="number"
                className="manual-input"
                value={barcodeBarWidth}
                onChange={(e) => onBarcodeChange('barWidth', e.target.value)}
              />

              {}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <label htmlFor="chkTxt" style={{ cursor: 'pointer' }}>Texto:</label>
                <input
                  id="chkTxt"
                  type="checkbox"
                  checked={barcodeShowText}
                  onChange={(e) => onBarcodeChange('showText', e.target.checked)}
                />
              </div>

              {}
              <div className="vertical-divider" style={{ height: '15px', margin: '0 5px' }}></div>
              <label>Dados:</label>
              <input
                type="text"
                className="manual-input barcode-content-input"
                value={barcodeContent}
                onChange={(e) => onBarcodeChange('content', e.target.value)}
                placeholder="123456"
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Toolbar;