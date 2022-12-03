const nodemailer = require("nodemailer");
const {getProduct} = require('./routes/product')

const EmailSender = async (data, cart) => {

  const ProductsListings = await Promise.all(cart.map(async item =>{
    let product = await getProduct(item._id)
    return(
      `
        <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
          <td valign="middle" width="80%" style="text-align:left; padding: 0 2.5em;">
            <div style="padding-top: 20px;">
              <img src="${product.img}" alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block;">
              <div>
                <h3>${product.title}</h3>
                <span style="color: rgba(0,0,0,.4);">Quantity x${item.quantity}</span>
              </div>
            </div>
          </td>
          <td valign="middle" width="20%" style="text-align:left; padding: 0 2.5em;">
            <span style="color: #000; font-size: 20px;">$${product.price * item.quantity}</span>
          </td>
        </tr>
    `
    )
  }))

  const output = `
  <html>
    <body width="100%" style="margin: 0; padding: 0 !important; background-color: #f1f1f1;">
    <center style="width: 100%; background-color: #f1f1f1;">
      <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; font-family: sans-serif;">
      </div>
      <div style="max-width: 600px; height:100%; margin: 0 auto;">
    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
    <tr>
      <td valign="top" style="padding: 1em 2.5em 0 2.5em; background:#e3f2fd;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td style="text-align: left;">
          <h1 style ="font-family: Lucida Handwriting, Helvetica, sans-serif;">HandMade Crafts</h1>
        </td>
        </tr>
      </table>
      </td>
    </tr><!-- end tr -->
    <tr>
      <td valign="middle" style="padding: 2em 0 2em 0; background: #ffffff;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td style="padding: 0 2.5em; text-align: left;">
          <h2>Thank you for your purchase</h2>
        </td>
        </tr>
      </table>
      </td>
    </tr><!-- end tr -->
    <tr>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #ffffff;">
          <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
            <th width="80%" style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 20px">Item</th>
            <th width="20%" style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 20px">Price</th>
          </tr>
            ${ProductsListings}
            <td valign="middle" width="80%" style="text-align:left; padding: 0 2.5em;">
            <div style="padding-top: 20px;">
              <div>
                <h4>Total</h4>
              </div>
            </div>
          </td>
          <td valign="middle" width="20%" style="text-align:left; padding: 0 2.5em;">
            <span style="color: #000; font-size: 20px;">$${data.amount_total/100}</span>
          </td>
            </table>
          </tr><!-- end tr -->

        </div>
      </center>
      </body>
  </html>
`
  try {
    let transporter = nodemailer.createTransport({
      service:"hotmail",
      port: 587,
      secure: false, 
      logger: true,
      auth: {
        user: process.env.TEST_EMAIL,
        pass: process.env.TEST_EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized:false
      }
    });

    let info = transporter.sendMail({
      from: process.env.TEST_EMAIL,
      to: data.customer_details.email,
      subject: "Order confirmation",
      text: "Hello world?", 
      html: output,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {EmailSender}; // uncomment when checkout is working