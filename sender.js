const nodemailer = require("nodemailer");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);

function random_creator() {
  let length = 6,
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    code = "";
  for (let i = 0, n = chars.length; i < length; ++i) {
    code += chars.charAt(Math.floor(Math.random() * n));
  }

  fs.writeFile("code.txt", code, (err) => {
    if (err) throw err;
  });
  return code;
}
function send_mail() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "190541044bsg@gmail.com",
      pass: "ougfljeawognjfvz",
    },
  });

  transporter.verify(function (error) {
    if (error) throw error;
  });

  let bilgiler = {
    from: "190541044bsg@gmail.com",
    to: "can123.bugra@gmail.com",
    subject: "Doğrulama codu",
    text: random_creator(),
  };

  transporter.sendMail(bilgiler, function (error) {
    if (error) throw error;
    console.log("mail gönderidi");
  });
}

function verification() {
  rl.question(
    "Daha önceden size gönderilmiş mailde bulunan 6 haneli kodu giriniz : \n",
    function (code) {
      fs.readFile("code.txt", (error, data) => {
        if (error) console.log(error);
        if (data.toString() === code) console.log("Girdiğiniz kod uyuşuyor.");
        else console.log("Girdiğiniz kod uyuşmuyor.");
        rl.close();
      });
    }
  );
}

rl.question(
  "İşlem seçiniz ;\n 1- Doğrulama maili alma \n 2- Doğrulama yapma\n",
  function (dis) {
    if (dis === "1") {
      send_mail();
      rl.close();
    } else if (dis === "2") {
      verification();
    } else {
      console.log("yanlış işlem");
      rl.close();
    }
  }
);
