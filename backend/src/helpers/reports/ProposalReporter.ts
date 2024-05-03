import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';


class ProposalReporter {
  async build(data: ejs.Data) {
    try {
      const template = fs.readFileSync(
        path.join(__dirname, 'templates/proposal.ejs'),
        'utf8'
      );
    
      const html = ejs.render(template, data);
    
      const browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage();
      await page.setContent(html);
      await page.emulateMediaType('print');
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
      })
      return pdf
    } catch (error) {
      throw new Error(error)
    }
  }
}

export { ProposalReporter }