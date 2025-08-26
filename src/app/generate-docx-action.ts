'use server';

import htmlToDocx from 'html-to-docx';

export async function generateDocxAction(htmlContent: string) {
  try {
    const fileBuffer = await htmlToDocx(htmlContent, undefined, {
      margins: {
        top: 720,
        bottom: 720,
        left: 720,
        right: 720,
      },
    });

    // Ensure we have a proper Buffer object before encoding
    const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer as ArrayBuffer);
    const base64 = buffer.toString('base64');
    
    const dataUri = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64}`;

    return { dataUri };
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return { error: (error as Error).message };
  }
}
