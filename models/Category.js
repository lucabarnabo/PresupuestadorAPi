const db = require("../db");

const getAll = async () => {
  return new Promise((resolve, reject) => {
    // probar este metodo
    db.query(
      `SELECT * FROM category  WHERE disabled IS NULL`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const getComidas = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM products WHERE category_id = 1 and disabled IS NULL`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const getBebidas = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM products WHERE category_id = 2 and disabled IS NULL`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const getActividades = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM products WHERE category_id = 3 and disabled IS NULL`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const insertProduct = async (data) => {
  //data siempre es un array de objetos
  console.log("data de insert", data);
};

const insert = async (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (item, info, price, category_id) VALUES ('${data.item}', '${data.info}',${data.price}, ${data.category_id})`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const updateProduct = (data) => {
  //se pasa el objeto completo, solamente se actualiza los valores de info(descripcion) y precio.
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE products SET info = '${data[0].info}', price = ${data[0].price} WHERE id = ${data[0].id}`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

const deleteProduct = (data) => {
  disDate = new Date().toISOString().substring(0, 10);
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE products SET disabled = '${disDate}' WHERE id = ${data[0].id}`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  getAll,
  getComidas,
  getBebidas,
  getActividades,
  insertProduct,
  updateProduct,
  deleteProduct,
};