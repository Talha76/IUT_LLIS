const fs = require('fs');
const PDFDocument = require('pdfkit');

module.exports = (tableData, saveFileName, columnNames) => {
  function addTableToPDF(doc, tableData) {
    const FirstpagetableTop = 200;
    const tableTop=100
    const tableLeft = 50;
    const cellPadding = 10;
    const bottomSpace = 1;
    const fontSize = 12;
    const cellHeight = cellPadding * 1.5 + bottomSpace;
    
  
    const columnWidth = (doc.page.width - tableLeft * 2) / 5; // Assuming 5 columns
  
    let y = FirstpagetableTop;
  
    doc.font('./pdfs/Fonts/times new roman.ttf');
  
     // Add the column names as the first row
     let x = tableLeft;
     columnNames.forEach(columnName =>{
       doc.rect(x, y, columnWidth, cellHeight*2).stroke();
       doc.font('./pdfs/Fonts/times-new-roman-grassetto.ttf').fontSize(fontSize).text(columnName, x + cellPadding, y + cellPadding);
       x += columnWidth;
     });
     y += cellHeight*2;

    tableData.forEach(rowData => {
      let x = tableLeft;
  
      // Extract cell values from the rowData object
      const leaveId = rowData.leaveId || '';
      const lateId = rowData.lateId || '';
      // const leaveId = rowData.leaveId || '';
      const time = rowData.time || '';
      const id = rowData.id || '';
      const name = rowData.name || '';
      // const purposeOfVisit = rowData.purposeOfVisit || '';
      const supervisorStatus = rowData.supervisorStatus || '';
  
      // Check if the current row exceeds the available space on the page
      if (y + cellHeight * 2 > doc.page.height - tableTop) {
        doc.addPage(); // Start a new page
        y = tableTop;  // Reset the y-coordinate for the new page
        
  
        // Add the column names as the first row on each new page
        let x = tableLeft;
        columnNames.forEach(columnName => {
          doc.rect(x, y, columnWidth, cellHeight*2).stroke();
          doc.font('./pdfs/Fonts/times-new-roman-grassetto.ttf').fontSize(fontSize).text(columnName, x + cellPadding, y + cellPadding);
          x += columnWidth;
        });
  
        // Move to the next row
        y += cellHeight*2;
  
      }
  
  
      // Draw the cell rectangles and add text content
      doc.rect(x, y, columnWidth, cellHeight * 2).stroke();
      if (columnNames[0] == 'Leave ID')
        doc.font('./pdfs/Fonts/times new roman.ttf').fontSize(fontSize).text(leaveId, x +cellPadding, y +cellPadding);
      else
        doc.font('./pdfs/Fonts/times new roman.ttf').fontSize(fontSize).text(lateId, x +cellPadding, y +cellPadding);

      x += columnWidth;
      doc.rect(x, y, columnWidth, cellHeight * 2).stroke();
      doc.fontSize(fontSize).text(time, x + cellPadding, y + cellPadding);
  
      x += columnWidth;
      doc.rect(x, y, columnWidth, cellHeight * 2).stroke();
      doc.fontSize(fontSize).text(id, x + cellPadding, y + cellPadding);
  
      x += columnWidth;
      doc.rect(x, y, columnWidth, cellHeight * 2).stroke();
      doc.fontSize(fontSize).text(name, x + cellPadding, y + cellPadding);
      
      x += columnWidth;
      doc.rect(x, y, columnWidth, cellHeight * 2).stroke();
      doc.fontSize(fontSize).text(supervisorStatus, x + cellPadding, y + cellPadding);
  
      // Move to the next row
      y += cellHeight * 2;
    });
  }
  
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(`./pdfs/${saveFileName}.pdf`);
  
  doc.pipe(writeStream);
  
  // add pictures
  doc.image('./pdfs/images/Islamic_University_of_Technology_(coat_of_arms).png', 20, 45, { width: 60 });
  doc.image('./pdfs/images/OIC_Logo_since_2011.jpg', doc.page.width - 190, 25, { width: 250 });
  
  // add headings
  doc.font('./pdfs/Fonts/times-new-roman-grassetto.ttf').fontSize(25).text('OFFICE OF THE PROVOST', 130, 30);
  doc.font('./pdfs/Fonts/times-new-roman-grassetto.ttf').fontSize(18).text('FEMALE HALLS OF RESIDENCE', 144, 60);
  doc.font('./pdfs/Fonts/times new roman.ttf').fontSize(16).text('ISLAMIC UNIVERSITY OF TECHNOLOGY', 125, 85);
  doc.font('./pdfs/Fonts/times new roman.ttf').fontSize(18).text('DHAKA,BANGLADESH', 175, 105);
  doc.font('./pdfs/Fonts/times-new-roman-grassetto.ttf').fontSize(15).text('ORGANIZATION OF ISLAMIC COOPERATION', 125, 130);
  
  
  addTableToPDF(doc, tableData);
  
  
  const signatureLabel1 = 'Signature of Provost: ____________________________';
  const signatureHeight = doc.heightOfString(signatureLabel1) + 20; // Calculate the height of the signature label
  
  if (doc.page.height - doc.y > signatureHeight) {
    doc
      .fontSize(12)
      .font('./pdfs/Fonts/times new roman.ttf')
      .text(signatureLabel1, 50, doc.page.height - 20 - signatureHeight); // Adjust the Y-coordinate as needed
  } 
  else {
    doc.addPage(); // Add a new page for the signature
    doc
      .fontSize(12)
      .font('./pdfs/Fonts/times new roman.ttf')
      .text(signatureLabel1, 50, 200); // Adjust the Y-coordinate as needed
  }
  
  
  doc.end();  
}
