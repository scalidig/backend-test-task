var rest = require('msw').rest;

const mockBooks = [];

const handlers = [
  // Mocking createBook
  rest.post('/api/books', (req, res, ctx) => {
    console.log("------------------------------------------------")
    const { title, isbn } = req.body;

    if (!title || !isbn) {
      return res(ctx.status(400), ctx.json({ error: 'title and isbn fields are required!' }));
    }

    const bookExists = mockBooks.find(book => book.isbn === isbn);

    if (bookExists) {
      return res(ctx.status(400), ctx.json({ error: 'Book already exists with isbn!' }));
    }

    const newBook = { title, isbn };
    mockBooks.push(newBook);

    return res(ctx.status(200), ctx.json({ result: newBook }));
  }),

  // Mocking getAllBooks
  rest.get('/api/books', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ result: mockBooks }));
  }),

  // Mocking getOneBookById
  rest.get('/api/books/:id', (req, res, ctx) => {
    const { id } = req.params;
    const book = mockBooks.find(book => book.id === parseInt(id));

    if (!book) {
      return res(ctx.status(404), ctx.json({ error: 'Book not found!' }));
    }

    return res(ctx.status(200), ctx.json({ result: book }));
  }),

  // Mocking updateBook
  rest.put('/api/books/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res(ctx.status(400), ctx.json({ error: 'title is required!' }));
    }

    const bookIndex = mockBooks.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Book not found!' }));
    }

    mockBooks[bookIndex].title = title;

    return res(ctx.status(200), ctx.json({ result: mockBooks[bookIndex] }));
  }),

  // Mocking deleteBook
  rest.delete('/api/books/:id', (req, res, ctx) => {
    const { id } = req.params;
    const bookIndex = mockBooks.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Book not found!' }));
    }

    mockBooks.splice(bookIndex, 1);

    return res(ctx.status(200), ctx.json({ result: 'Deleted!' }));
  }),

  // Default handler to bypass unhandled requests to the actual server
//   rest.defaultHandler((req, res, ctx) => {
//     console.error(`Unhandled request: ${req.method} ${req.url.href}`);
//     return res(ctx.status(500), ctx.json({ error: 'Unhandled request' }));
//   }),
];

module.exports = handlers