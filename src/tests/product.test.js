const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require('../models');

let token;
let productId;

beforeAll(async() => {
    const credentials = {
        email: "minaya@gmail.com",
       password: "g1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token

})

test("POST /products ", async () => {
    const category = await Category.create({name: "tech"})
    const product = {
        title: "Mac",
    price: 800,
    description: "Macbook ro 2022",
    brand:"Apple",
    categoryId: category.id
 
    }
    const res = await request(app)
    .post("/products")
    .send(product)
    
    .set('Authorization', `Bearer ${token}`)
    productId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test ('Post /products/:id/images should set products images', async () =>{
    const image = await ProductImg.create({
        url: "http://falseurl.com",
        publicId:"false id"
    })
    const res = await request(app)
         .post(`/products/${productId}/images`)
         .send([image.id])
      .set('Authorization', `Bearer ${token}`)
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1); 
})
test('PUT /products/:id', async () => {
    const productUpdated = {
        title: "Samgung"
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(productUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
  });

test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });