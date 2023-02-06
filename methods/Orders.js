const exportToCsv = require("../helpers/exportToCsv");
const dateFormat = require("../helpers/dateFormat");
const WooCommerceAPI = require("@woocommerce/woocommerce-rest-api").default;

// conexion a api de woocommerce, como parametro recibe la URL donde corre la tienda WC,
// y las key de la WooCommerceAPI que deben ser generadas previamente desde el panel de control wordPress.

var WooCommerce = new WooCommerceAPI({
  url: "https://aerobicadeportes.com/",
  consumerKey: "ck_89a01deb02171f693203f464026fde43c5e156c3",
  consumerSecret: "cs_13049ea30d965cf0941bd05e579f8f5939185e1c",
  version: "wc/v3",
  queryStringAuth: true,
});

/* var WooCommerce = new WooCommerceAPI({
  url: "http://localhost:8888/wordpress/",
  consumerKey: "ck_ce85d8d326bc8ca06e0ad153205a354a23678f9c",
  consumerSecret: "cs_64aeb08e4bf974b1ee50a870849ee16be9e84606",
  version: "wc/v3",
  queryStringAuth: true,
}); */

//Metodo get que solicita todas las ordenes realizadas despues de la fecha insertada como parametro.
// la fecha que toma como parametro es la fecha del dia segun sistema GMT -3 a las 11:59 hs

const getProductos = async () => {
  try {
    let order;
    await WooCommerce.get(`products`)
      .then((response) => {
        console.log(response.data);
        order = response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    return order;
  } catch (error) {
    console.log("error:", error);
  }
};

const getOrders = async () => {
  try {
    let order;
    let today = dateFormat.todayFormat();
    /*  let todayLimit = dateFormat.todayLimit(); */
    await WooCommerce.get(`orders?after=${today}&status=processing`)
      .then((response) => {
        order = response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    let result = "";

    if (typeof order[0] != "undefined") {
      await exportOrders(order);
    } else {
      console.log("no hay ordenes");
    }

    return result;
  } catch (error) {
    console.log("error:", error);
  }
};

const exportOrders = async (order) => {
  let StockUpdate = [];
  try {
    let StockUpdate = forPush(order);
    exportToCsv.savesCsv(StockUpdate);
  } catch (error) {
    console.log(error);
  }
};

// Metodo que limpia y adapta el objeto con los datos de la orden del get para poder ser exportados.

const forPush = (order) => {
  let forPush = [];
  try {
    if (order.length > 1) {
      order.forEach((obj) => {
        if (obj.status == "processing") {
          let trim = {
            id: obj.id,
            nom_cliente: obj.billing.first_name + " " + obj.billing.last_name,
            fecha_orden: obj.date_created,
            total: obj.total,
            items: trimItems(obj.line_items),
          };
          forPush.push(trim);
        }
      });
    } else if (
      typeof order[0] != "undefined" &&
      order[0].status == "processing"
    ) {
      forPush[0] = {
        id: order[0].id,
        nom_cliente:
          order[0].billing.first_name + " " + order[0].billing.last_name,
        fecha_orden: order[0].date_created,
        total_orden: order[0].total,
        items: trimItems(order[0].line_items),
      };
    }
  } catch (error) {
    console.log(error);
  }
  return forPush;
};

const trimItems = (line_items) => {
  let items = [];
  try {
    for (obj of line_items) {
      let data = {
        sku: obj.sku,
        cantidad: obj.quantity,
        precio: obj.price,
      };
      items.push(data);
    }
    return items;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrders: getOrders,
  getProductos: getProductos,
};
