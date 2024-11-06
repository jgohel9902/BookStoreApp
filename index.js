/*
    Jenil Gohel, 8909157
    Final Exam
*/
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require('express-validator');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false}));
app.set("views","views");
app.set("view engine", "ejs");

const mongoDB = "mongodb://localhost:27017/demo";
mongoose.connect(mongoDB);
const Order = mongoose.model("Order", {
    name: String,
    studentID: String,
    products: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalCost: Number,
    tax: Number,
    finalTotal: Number
});

app.post("/receipt", [
    check("name", "Name Required").notEmpty(),
    check("studentID", "StudentID should be a valid 7 digit number").matches(/^\d{7}$/),
], async (req, res) => {
    const result = validationResult(req);
    if(result.errors.length){
        console.log(result);
        res.render("error", result)
    }

    const bookPrice = {
        "HTML5": 62.99,
        "CSS3": 51.99,
        "Pen": 2.99
    };

    const  books= {
        "HTML5": req.body.HTML5 || 0,
        "CSS3": req.body.css3 || 0,
        "Pen": req.body.pen || 0
    };


    let totalCost = 0;
    let tax = 13;
    const productsBought = [];

    for (const book in books) {
        const quantity = parseInt(books[book]);
        if (!isNaN(quantity) && quantity > 0) {
            const price = bookPrice[book];
            totalCost += quantity * price;
            productsBought.push({ name: book, quantity, price });
        }
    }
    const finalTotal = totalCost + tax;

    const order = new Order({
        name: req.body.name,
        studentID: req.body.studentID,
        products: productsBought,
        totalCost: totalCost.toFixed(2),
        tax: tax.toFixed(2),
        finalTotal: finalTotal.toFixed(2)
    });

    await order.save();
    res.render("receipt", { receipt: order });
});

app.get("/order", async (req, res) => {
   
        const orders = await Order.find();
        res.render("order", { orders});
    
});

app.get("/thank-you", (req, res)=>{
    res.render("thank-you", {name: req.body.name})
})

const server = app.listen(8080, () => {
    console.log(`server listening on http://localhost:${server.address().port}`);
})