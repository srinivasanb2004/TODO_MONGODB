const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(5000, function () {
    console.log("Server started...")
})

mongoose.connect("mongodb://127.0.0.1:27017/Todo").then(() => console.log("connected DB sucessfully.."))
    .catch(() => console.log("Connection DB failed"))

const fruits = mongoose.model("fruits", { name: String }, "fruits")

app.get("/fruitlist", function (req, res) {

    fruits.find().then(function (retdata) {
        res.send(retdata)
    })
})

app.post("/addfruit", function (req, res) {

    var newfruit = req.body.newfruit

    const newFruit = new fruits(
        {
            name:newfruit
        }
    );

    newFruit.save().then(() => console.log("Saved sucessfully.."))
})