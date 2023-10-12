const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const translate = require("@iamtraction/google-translate");
const PDFDocument = require("pdfkit");

//reading the file content and returning a buffer
const dataBuffer = fs.readFileSync(path.join(__dirname, "demo_123.pdf"));

const doc = new PDFDocument();
pdf(dataBuffer).then(function (data) {
  //translating the text to English
  translate(data.text, { to: "en" })
    .then((res) => {
      if (res.text) {
        //logging the translated text to the console
        console.log(res.text);
        
        //saving the translated text to a pdf filefor convenience
        doc.pipe(fs.createWriteStream("translated.pdf"));

        doc.fontSize(12).text(res.text, 100, 100);
        doc.end();
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
