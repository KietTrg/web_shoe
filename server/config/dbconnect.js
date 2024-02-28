const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kiettruong100702:3VQtb0xHV4jFe50F@cluster0.utm5mts.mongodb.net/?retryWrites=true&w=majority"
    );
    if (conn.connection.readyState === 1) console.log("ket noi db thanh cong");
    else console.log("khong thanh cong"); //check ket noi thanh cong ?
  } catch (error) {
    console.log("DB failed");
    throw new Error(error);
  }
};

module.exports = dbConnect;
