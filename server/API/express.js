const express = require("express");
const cors = require("cors");
const { fetchDataFromTable } = require("../BL/readTable");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
const { insertToTable } = require("../BL/insertToTable");
const { updateTable } = require("../BL/updateTable");
const { deleteFromTable } = require("../BL/deleteFromTable");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const {getProductsFromCategory} = require("../BL/getPresentsFromCategory");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

//Amene tous les produits de la category demandee
app.get("/products/:category", async (req, res) => {
  try {
    let categ = req.params.category;
    const products = await getProductsFromCategory(categ);
    if (products == undefined) res.status(404).send("Products from this category not found");
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).send("Internal Server Error");
  }
});

//לשאול את המורה איך בודקים שהמשתמש קים בלי שיראו את הסיסמה בכתובת למעלה,
//המורה אמרה לעשות את זה ב post
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await authenticateUser(username, password);
      res.status(200).send(user);
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      res.status(401).send("Authentication failed");
    }
  }


   
);

//Amene tous les details du produit dont l'id est la 
app.get("/products/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await fetchDataFromTableCondition(
      "Products",
      "Id",
      productId
    );
    if (product == undefined) res.status(404).send("Product not found");
    res.status(200).send(product[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get('/', (req, res) => {
//     res.send('Hello World !')
// });

//Changer l'adresse
// app.get("login/name=?&password=?", async (req, res) => {
//   const { username, password } = req.query;

//   if (!username || !password) {
//     res.status(400).send("Username and password are required");
//     return;
//   }

//   try {
//     const user = await authenticateUser(username, password);
//     res.status(200).send(user);
//   } catch (error) {
//     console.error("Error authenticating user:", error.message);
//     res.status(401).send("Authentication failed");
//   }
// });

app.get("/users", async (req, res) => {
  try {
    const user = await fetchDataFromTable("User");
    console.log("User", user);
    if (user === undefined) {
      res.status(404).send("Table User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await fetchDataFromTableCondition("User", "Id", userId);
    if (user == undefined) res.status(404).send("User not found");
    res.status(200).send(user[0]);
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).send("Internal Server Error");
  }
});



// POST method to add data to users table
// app.post("/users", async (req, res) => {
//   try {
//     const { Id, UserId, Name, Password, Mail, Phone, AuthorizedDealerNumber } =
//       req.body;
//     insertToTable(
//       "User",
//       "Id, UserId, Name, Password, Mail, Phone, AuthorizedDealerNumber",
//       `'${Id}', '${UserId}', '${Name}', '${Password}', '${Mail}', '${Phone}', '${AuthorizedDealerNumber}'`
//     );
//     res.status(200).send("User created successfully");
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// PUT method to update data in users table
app.put("/users/:id", async (req, res) => {
  try {
    //let userId = req.params.id;
    const { Id, UserId, Name, Password, Mail, Phone, AuthorizedDealerNumber } =
      req.body; // Assuming the request body contains name and email fields
    updateTable(
      "User",
      `UserId = '${UserId}' AND Name = '${Name}' AND Password = '${Password}' AND Mail = '${Mail}' AND Phone = '${Phone}' AND AuthorizedDealerNumber = '${AuthorizedDealerNumber}' `,
      `Id = ${Id}`
    );

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/users/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    deleteFromTable("User", "Id", `${userId}`);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/presents", async (req, res) => {
  try {
    const present = await fetchDataFromTable("Present");
    console.log("Present", present);
    if (present === undefined) {
      res.status(404).send("Table Present not found");
    } else {
      res.status(200).send(present);
    }
  } catch (error) {
    console.error("Error fetching presents:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/presents/:id", async (req, res) => {
  try {
    let presentId = req.params.id;
    const present = await fetchDataFromTableCondition(
      "Present",
      "Id",
      presentId
    );
    if (present == undefined) res.status(404).send("Present not found");
    res.status(200).send(post[0]);
  } catch (error) {
    console.error("Error fetching Present:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST method to add data to users table
app.post("/presents", async (req, res) => {
  try {
    insertToTable(
      "Present",
      "Id, Date, ExpirationDate, MaxPrice, Category, UserId",
      `'${req.body.Id}', '${req.body.Date}', '${req.body.ExpirationDate}', '${req.body.MaxPrice}', '${req.body.Category}', '${req.body.UserId}'`
    );
    res.status(200).send("Present created successfully");
  } catch (error) {
    console.error("Error fetching Present:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update data in users table
app.put("/presents/:id", async (req, res) => {
  try {
    const { Id, Date, ExpirationDate, MaxPrice, Category, UserId } = req.body; // Assuming the request body contains name and email fields
    updateTable(
      "Present",
      `Date = '${Date}' AND ExpirationDate = '${ExpirationDate}' AND MaxPrice = '${MaxPrice}' AND Category = '${Category}' AND UserId = '${UserId}'`,
      `Id = ${Id}`
    );

    res.status(200).send("Present updated successfully");
  } catch (error) {
    console.error("Error updating Present:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/presents/:id", async (req, res) => {
  try {
    let presentId = req.params.id;
    deleteFromTable("Present", "Id", `${presentId}`);
    res.status(200).send("Present deleted successfully");
  } catch (error) {
    console.error("Error deleting present:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/selectpresents", async (req, res) => {
  try {
    const selectedPresent = await fetchDataFromTable("SelectPresent");
    console.log("SelectPresent", selectedPresent);
    if (selectedPresent === undefined) {
      res.status(404).send("Table SelectPresent not found");
    } else {
      res.status(200).send(selectedPresent);
    }
  } catch (error) {
    console.error("Error fetching SelectPresent:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/selectpresents/:id", async (req, res) => {
  try {
    let presentId = req.params.id;
    const present = await fetchDataFromTableCondition(
      "SelectPresent",
      "Id",
      presentId
    );
    if (present == undefined) res.status(404).send("SelectPresent not found");
    res.status(200).send(post[0]);
  } catch (error) {
    console.error("Error fetching SelectPresent:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST method to add data to users table
app.post("/selectpresents", async (req, res) => {
  try {
    const { Id, PresentId, ProductId, Amount } = req.params;
    insertToTable(
      "SelectPresent",
      "Id, PresentId, ProductId, Amount",
      `'${Id}', '${PresentId}', '${ProductId}', '${Amount}'`
    );
    res.status(200).send("SelectPresent created successfully");
  } catch (error) {
    console.error("Error fetching SelectPresent:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update data in users table
app.put("/selectpresents/:id", async (req, res) => {
  try {
    const { Id, PresentId, ProductId, Amount } = req.body; // Assuming the request body contains name and email fields
    updateTable(
      "SelectPresent",
      `PresentId = '${PresentId}' AND ProductId = '${ProductId}' AND Amount = '${Amount}' `,
      `Id = ${Id}`
    );

    res.status(200).send("SelectPresent updated successfully");
  } catch (error) {
    console.error("Error updating SelectPresent:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/selectpresents/:id", async (req, res) => {
  try {
    let presentId = req.params.id;
    deleteFromTable("SelectPresent", "Id", `${presentId}`);
    res.status(200).send("SelectPresent deleted successfully");
  } catch (error) {
    console.error("Error deleting SelectPresent:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await fetchDataFromTable("Products");
    console.log("products", products);
    if (products === undefined) {
      res.status(404).send("Table Products not found");
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await fetchDataFromTableCondition(
      "Products",
      "Id",
      productId
    );
    if (product == undefined) res.status(404).send("Product not found");
    res.status(200).send(product[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:category", async (req, res) => {
  try {
    let productCategory = req.params.category;
    const categoryNum = await fetchDataFromTableCondition(
      "Category",
      "Name",
      productCategory
    );
    const product = await fetchDataFromTableCondition(
      "Products",
      "Category",
      categoryNum.Id
    );
    if (product == undefined) res.status(404).send("Product not found");
    res.status(200).send(product[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST method to add data to users table
app.post("/products", async (req, res) => {
  try {
    const { Id, Name, Image, Category, BusinessId, Price } = req.body;
    insertToTable(
      "Products",
      "Id, Name, Image, Category, BusinessId, Price",
      `'${Id}', '${Name}', '${Image}', '${Category}', '${BusinessId}', '${Price}'`
    );
    res.status(200).send("Product created successfully");
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update data in users table
app.put("/products/:id", async (req, res) => {
  try {
    const { Id, Name, Image, Category, BusinessId, Price } = req.body;
    updateTable(
      "Products",
      `Name = '${Name}' AND Image = '${Image}' AND Category = '${Category}' AND BusinessId = '${BusinessId}' AND Price = '${Price}'`,
      `Id = ${Id}`
    );
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/products/:id", async (req, res) => {
  try {
    let productId = req.params.id;
    deleteFromTable("Products", "Id", `${productId}`);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/category", async (req, res) => {
  try {
    const category = await fetchDataFromTable("Category");
    console.log("category", category);
    if (category === undefined) {
      res.status(404).send("Table Category not found");
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/category/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;
    const category = await fetchDataFromTableCondition(
      "Category",
      "Id",
      categoryId
    );
    if (category == undefined) res.status(404).send("Category not found");
    res.status(200).send(category[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST method to add data to users table
app.post("/category", async (req, res) => {
  try {
    const { Id, Name } = req.body;
    insertToTable("Category", "Id, Name", `'${Id}', '${Name}'`);
    res.status(200).send("Category created successfully");
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update data in users table
app.put("/category/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;
    const { Id, Name } = req.body; // Assuming the request body contains name and email fields
    updateTable("Category", `Name = '${Name}' `, `Id = ${Id}`);

    res.status(200).send("Category updated successfully");
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/category/:id", async (req, res) => {
  try {
    let categoryId = req.params.id;
    deleteFromTable("Category", "Id", `${categoryId}`);
    res.status(200).send("Category deleted successfully");
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/business", async (req, res) => {
  try {
    const business = await fetchDataFromTable("Business");
    console.log("business", business);
    if (business === undefined) {
      res.status(404).send("Table Business not found");
    } else {
      res.status(200).send(business);
    }
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/business/:id", async (req, res) => {
  try {
    let businessId = req.params.id;
    const business = await fetchDataFromTableCondition(
      "business",
      "Id",
      businessId
    );
    if (business == undefined) res.status(404).send("Business not found");
    res.status(200).send(business[0]);
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST method to add data to users table
app.post("/business", async (req, res) => {
  try {
    const { Id, Name, Phone, Email, Password, BusinessNumber } = req.body;
    insertToTable(
      "Business",
      "Id, Name, Phone, Email, Password, BusinessNumber",
      `'${Id}', '${Name}', '${Phone}', '${Email}', '${Password}', '${BusinessNumber}'`
    );
    res.status(200).send("Business created successfully");
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update data in users table
app.put("/business/:id", async (req, res) => {
  try {
    let businessId = req.params.id;
    const { Id, Name, Phone, Email, Password, BusinessNumber } = req.body; // Assuming the request body contains name and email fields
    updateTable(
      "Business",
      `Email = '${Email}' AND Name = '${Name}' AND Phone = '${Phone}' AND Password = '${Password}' AND BusinessNumber = '${BusinessNumber}'`,
      `Id = ${Id}`
    );

    res.status(200).send("Business updated successfully");
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to delete data from users table
app.delete("/business/:id", async (req, res) => {
  try {
    let businessId = req.params.id;
    deleteFromTable("Business", "Id", `${businessId}`);
    res.status(200).send("Business deleted successfully");
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
