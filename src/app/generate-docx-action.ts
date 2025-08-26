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

    return { buffer: fileBuffer as Buffer };
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return { error: (error as Error).message };
  }
}
