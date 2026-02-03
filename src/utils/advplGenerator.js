/* src/utils/advplGenerator.js */

const PIXELS_PER_MM = 3.78; // Mesma constante usada no App.js

export const generateAdvplSource = (elements) => {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');

  let sourceCode = `#INCLUDE "TOTVS.CH"

/*/{Protheus.doc} IMPETIQ
Etiqueta Gerada pelo Editor Visual
@type     function
@author   Juan Reis
@since    ${currentDate}
/*/

User Function IMPETIQ()
    Local cImpressora := "000001" // Pegue uma impressora da CB5
    
    MSCBPRINTER(cImpressora) //Seto a impressora 

    MSCBBEGIN(1, 6)
`;

  elements.forEach(el => {
    // Conversão de Pixels (Tela) para Milímetros (ADVPL usa mm nas funções MSCB)
    const x_mm = (el.x / PIXELS_PER_MM).toFixed(2);
    const y_mm = (el.y / PIXELS_PER_MM).toFixed(2);

    // Texto
    if (el.type === 'text') {
      const h_mm = (el.fontHeight / PIXELS_PER_MM).toFixed(2);
      const w_mm = (el.fontWidth / PIXELS_PER_MM).toFixed(2);
      // MSCBSAY(nCol, nLin, cTexto, cRotacao, cFonte, cTamStr)
      // Nota: O ultimo parametro de tamanho no MSCBSAY geralmente é string "H,W"
      sourceCode += `    MSCBSAY(${x_mm}, ${y_mm}, "${el.content}", "N", "0", "${h_mm},${w_mm}")\n`;
    }

    // Linha
    else if (el.type === 'line') {
      const x1_mm = (el.x1 / PIXELS_PER_MM);
      const y1_mm = (el.y1 / PIXELS_PER_MM);
      const x2_mm = (el.x2 / PIXELS_PER_MM);
      const y2_mm = (el.y2 / PIXELS_PER_MM);
      const thick_mm = (el.thickness / PIXELS_PER_MM).toFixed(2);
      
      const width_mm = Math.abs(x2_mm - x1_mm).toFixed(2);
      const height_mm = Math.abs(y2_mm - y1_mm).toFixed(2);
      const finalX = Math.min(x1_mm, x2_mm).toFixed(2);
      const finalY = Math.min(y1_mm, y2_mm).toFixed(2);

      // Se for linha horizontal
      if (width_mm > height_mm) {
         sourceCode += `    MSCBLineH(${finalX}, ${finalY}, ${width_mm}, ${thick_mm})\n`;
      } 
      // Se for linha vertical
      else {
         sourceCode += `    MSCBLineV(${finalX}, ${finalY}, ${height_mm}, ${thick_mm})\n`;
      }
    }

    // Quadrado (Box)
    else if (el.type === 'square') {
      const width_mm = (el.width / PIXELS_PER_MM);
      const height_mm = (el.height / PIXELS_PER_MM);
      const thick_mm = (el.thickness / PIXELS_PER_MM).toFixed(1); // Espessura aproximada

      const xFinal = (parseFloat(x_mm) + width_mm).toFixed(2);
      const yFinal = (parseFloat(y_mm) + height_mm).toFixed(2);

      // MSCBBox(nColIni, nLinIni, nColFim, nLinFim, nEspessura)
      sourceCode += `    MSCBBox(${x_mm}, ${y_mm}, ${xFinal}, ${yFinal}, ${thick_mm})\n`;
    }

    // Quadrado Preenchido (Simulado com GB via MSCBWrite ou Box grosso)
    else if (el.type === 'filled-square') {
       // O Protheus antigo não tem função nativa fácil para 'Filled Box', 
       // então usamos o comando ZPL direto via MSCBWrite para garantir
       const width_dots = Math.round(el.width * (8 / 3.78)); // Convertendo de volta pra dots
       const height_dots = Math.round(el.height * (8 / 3.78));
       const x_dots = Math.round(el.x * (8 / 3.78));
       const y_dots = Math.round(el.y * (8 / 3.78));
       
       sourceCode += `    MSCBWrite("^FO${x_dots},${y_dots}^GB${width_dots},${height_dots},${height_dots},B^FS")\n`;
    }

    // Código de Barras
    else if (el.type === 'barcode') {
      const h_mm = (el.height / PIXELS_PER_MM).toFixed(2);
      const showText = el.showText ? ".T." : ".F.";
      
      // MSCBSAYBAR(nCol, nLin, cTexto, cRotacao, cTipo, nAlt, lCheck, lLinhas, lNumero)
      // Usando "128" como padrão genérico, ou "39"
      sourceCode += `    MSCBSAYBAR(${x_mm}, ${y_mm}, "${el.content}", "N", "128", ${h_mm}, .F., .F., ${showText})\n`;
    }

    // QR Code
    else if (el.type === 'qrcode') {
        // MSCBSAYBAR também imprime QR Code em versões mais novas (Tipo "QR")
        // Ou usamos injeção direta ZPL para garantir compatibilidade
        sourceCode += `    MSCBSAYBAR(${x_mm}, ${y_mm}, "${el.content}", "N", "QR", ${el.magnification * 10})\n`;
    }

  });

  sourceCode += `
    MSCBEND()

Return
`;

  return sourceCode;
};