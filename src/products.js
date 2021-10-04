// connect to the database
const {connectDb} = require("./db")

const clothes_collection = "am-clothes"

//get all products
exports.getAllProducts = (req,res) => {
  const db = connectDb()
  db.collection(clothes_collection).get()
    .then(collection => {
      const products = collection.docs.map(doc => {
        let product = doc.data()
        product.id = doc.id
        return product
      })
      res.send(products)
    })
    .catch(err => res.status(500).send(err))
  
}

//get a single product
exports.getProductById  = (req, res) => {
  const db = connectDb()
  const { id } = req.params

  db.collection(clothes_collection).doc(id).get()
    .then(doc => {
      let product = doc.data()
      product.id = doc.id
      res.send(product)
    })
    .catch(error => res.status(500).send(error))

}

//create a new product

exports.createProduct = (req,res) => {

  const db = connectDb()
  const newProduct = req.body

  db.collection(clothes_collection).add(newProduct)
  .then(docRef => {
    let product = req.body
    product.id = docRef.id
    res.send(product)
  })

}

exports.updateProduct =(req, res) => {

  const db = connectDb()
  let product = req.body
  const { id } = req.params


db.collection(clothes_collection).doc(id).update(product)
  .then(() => this.getProductById(req,res))

  .catch(error => res.status(500).send(error))
}
//delete a single product

exports.deleteProduct =(req, res) => {

  const db = connectDb()
  const {id} = req.params

  db.collection(clothes_collection).doc(id).delete()
    .then(timeStamp => {
      res.status(200).send(`Product ${id} nuked at ${timeStamp}`)
    })
    .catch(error => res.status(500).send(error))
  }