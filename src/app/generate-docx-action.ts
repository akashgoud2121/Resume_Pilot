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
    
    // Return the buffer as a Base64 encoded string to avoid passing raw buffers to client components.
    return { base64: (fileBuffer as Buffer).toString('base64') };
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return { error: (error as Error).message };
  }
}
