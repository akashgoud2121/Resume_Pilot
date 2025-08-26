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

    // Ensure we have a Buffer before converting to Base64
    const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer as any);
    
    // Return the buffer as a Base64 encoded string
    return { base64: buffer.toString('base64') };
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return { error: (error as Error).message };
  }
}
