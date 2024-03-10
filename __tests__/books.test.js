// Imports and Configurations
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

// isbn of sample book
let testISBN;

// test setup
beforeAll(async () => {
    await db.query('DELETE FROM books');
});

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES (
            '1234321',
            'https://amazon.com',
            'Elie Wiesel',
            'english',
            100,
            'Hill & Wang',
            'Night',
            1958
        )
        RETURNING isbn`);
    
    testISBN = result.rows[0].isbn;
});

describe('POST /books', () => {
    test("Creates a new book", async () => {
        const response = await request(app)
            .post('/books')
            .send({
                isbn: '32794782',
                amazon_url: 'https://amazon.com',
                author: 'Test Author',
                language: 'english',
                pages: 100,
                publisher: 'Test Publisher',
                title: 'Test Title',
                year: 2020});
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty('isbn');
    });
    test("Prevents creating a book without required title", async () => {
        const response = await request(app)
            .post('/books')
            .send({
                isbn: '32794783',
                amazon_url: 'https://amazon.com',
                author: 'Test Author',
                language: 'english',
                pages: 100,
                publisher: 'Test Publisher',
                year: 2020});
        expect(response.statusCode).toBe(400);
    });
})

describe('PUT /books/:isbn', () => {
    test("Updates a single book", async () => {
        const response = await request(app)
            .put(`/books/${testISBN}`)
            .send({
                amazon_url: 'https://amazon.com/change',
                author: 'New Author',
                language: 'french',
                pages: 100,
                publisher: 'New Publisher',
                title: 'New Title',
                year: 2020});
        expect(response.statusCode).toBe(200);
        expect(response.body.book).toHaveProperty('amazon_url');
        expect(response.body.book.amazon_url).toBe('https://amazon.com/change');
    });
    test("Prevents a bad book update", async () => {
        const response = await request(app)
            .put(`/books/${testISBN}`)
            .send({
                isbn: '32794783',
                amazon_url: 'https://amazon.com',
                author: 'New Author',
                language: 'french',
                pages: 100,
                publisher: 'New Publisher',
                title: 'New Title',
                year: 2020});
        expect(response.statusCode).toBe(400);
    });
})

// test teardown
afterEach(async () => {
    await db.query('DELETE FROM books');
});

afterAll(async () => {
    await db.end();
});