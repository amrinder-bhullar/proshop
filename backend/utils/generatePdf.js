import fs from "fs";
import puppeteer from "puppeteer";
import path from "path";

const __dirname = path.resolve(); // set __dirname to current directory

const runPdfGenrate = async (order) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const { user, _id, itemsPrice, shippingPrice, taxPrice, totalPrice } = order;

  // Read HTML template
  const htmlTemplatePath = path.join(__dirname, "template", "template.html");
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");
  // Define the data to be inserted into the template
  const data = {
    address: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`,
    deliverAt: Date.now().toLocaleString(),
  };

  // Replace placeholders in the template with actual data
  const filledTemplate = htmlTemplate
    .replace("{{name}}", user.name)
    .replace("{{orderNum}}", _id)
    .replace("{{email}}", user.email)
    .replace("{{address}}", data.address)
    .replace("{{deliverAt}}", data.deliverAt)
    .replace("{{itemsPrice}}", itemsPrice)
    .replace("{{shippingPrice}}", shippingPrice)
    .replace("{{taxPrice}}", taxPrice)
    .replace("{{totalPrice}}", totalPrice);

  await page.setContent(filledTemplate);

  // Generate PDF using puppeteer
  const pdfOptions = {
    path: path.join(__dirname, "invoices", `${_id}.pdf`),
    format: "A4",
  };

  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();

  return pdfBuffer;
};

export { runPdfGenrate };
