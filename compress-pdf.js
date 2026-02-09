import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function compressPDF() {
  try {
    console.log('Reading PDF file...');
    const existingPdfBytes = fs.readFileSync('./public/coffee-table-book.pdf');
    
    console.log('Loading PDF document...');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    console.log(`Original PDF has ${pdfDoc.getPageCount()} pages`);
    console.log(`Original size: ${(existingPdfBytes.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Save with compression
    console.log('Compressing PDF...');
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });
    
    console.log(`Compressed size: ${(compressedPdfBytes.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Save compressed PDF
    fs.writeFileSync('./public/coffee-table-book-compressed.pdf', compressedPdfBytes);
    
    const reduction = ((1 - compressedPdfBytes.length / existingPdfBytes.length) * 100).toFixed(2);
    console.log(`\nCompression complete! Size reduced by ${reduction}%`);
    console.log('Compressed file saved as: public/coffee-table-book-compressed.pdf');
    console.log('\nYou can now replace the original file or use the compressed version.');
    
  } catch (error) {
    console.error('Error compressing PDF:', error);
  }
}

compressPDF();
