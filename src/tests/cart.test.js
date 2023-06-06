const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require('../models')


let cartId;
let token;

beforeAll(async() => {
    const credentials = {
        email: "minaya@gmail.com",
       password: "g1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token

})

test('POST /favorites should create a favorite', async () => {
  const product = await Product.create({
    title: "iPhone 15",
    price: 2000,
    description: "iPhone Pro Max",
    brand:"Apple"
  })
  const cart = {
    productId: product.id,
    quantity: 5
  }
  const res = await request(app)
      .post('/carts')
      .send(cart)
      .set('Authorization', `Bearer ${token}`);
  await product.destroy();
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /carts', async () => {
  const res = await request(app)
      .get('/carts')
      .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT /carts/:id', async () => {
  const cartUpdated = {
    quantity: 1
  }
  const res = await request(app)
      .put(`/carts/${cartId}`)
      .send(cartUpdated)
      .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartUpdated.quantity);
});

test('DELETE /carts/:id', async () => {
  const res = await request(app)
      .delete(`/carts/${cartId}`)
      .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
