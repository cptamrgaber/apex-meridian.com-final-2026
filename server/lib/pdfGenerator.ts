import puppeteer from 'puppeteer';

export interface PDFGenerationOptions {
  title: string;
  content: string;
  author?: string;
  date?: string;
}

export async function generatePDF(options: PDFGenerationOptions): Promise<Buffer> {
  const { title, content, author = 'Apex Meridian', date = new Date().toLocaleDateString() } = options;

  // Create HTML template for PDF
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px 60px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #0891b2;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #0891b2;
      margin-bottom: 10px;
    }
    
    h1 {
      font-size: 32px;
      color: #1e3a8a;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    
    .meta {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
    }
    
    .content {
      margin-top: 30px;
    }
    
    h2 {
      font-size: 24px;
      color: #1e3a8a;
      margin-top: 30px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    h3 {
      font-size: 20px;
      color: #1e40af;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    
    h4 {
      font-size: 18px;
      color: #1e40af;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      margin-bottom: 15px;
      text-align: justify;
    }
    
    ul, ol {
      margin-left: 30px;
      margin-bottom: 15px;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }
    
    pre {
      background: #f3f4f6;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 15px;
      border-left: 4px solid #0891b2;
    }
    
    pre code {
      background: none;
      padding: 0;
    }
    
    blockquote {
      border-left: 4px solid #0891b2;
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
      color: #555;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    th, td {
      border: 1px solid #e5e7eb;
      padding: 12px;
      text-align: left;
    }
    
    th {
      background: #f3f4f6;
      font-weight: bold;
      color: #1e3a8a;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #0891b2;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    
    @page {
      margin: 20mm;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Apex Meridian</div>
    <h1>${title}</h1>
    <div class="meta">
      <strong>Author:</strong> ${author} | <strong>Date:</strong> ${date}
    </div>
  </div>
  
  <div class="content">
    ${content}
  </div>
  
  <div class="footer">
    <p>© ${new Date().getFullYear()} Apex Meridian. All rights reserved.</p>
    <p>For more information, visit apex-meridian.com</p>
  </div>
</body>
</html>
  `;

  // Launch Puppeteer and generate PDF
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
