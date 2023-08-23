const axios = require('axios');

// Example API URL
const API_URL = 'http://localhost:8000/api';

describe('API Integration Tests', () => {
  let createdBooks = [];

//   // Create a book and store its ID
   test('create book', async () => {
    try {
    const response = await axios.post(`${API_URL}/books`, {
      title: 'Book 1',
      isbn: 'ABCD',
    });
    expect(response.status).toBe(200);

    const createdBook = response.data.result;
    console.log('Books created:', createdBook);
    expect(createdBook).toHaveProperty('id');
    createdBooks.push(createdBook.id);
    } catch (error) {
        if(error.response){
            switch(error.response.status)
                    {
                        case 400:
                            console.log(error.response.data.error)
                        break;

                        case 500:
                            console.log(error.response.data.error)
                        break;
                    }
            }
        }
  });

  // Create another book
  test('create another book', async () => {
    try {
    const response = await axios.post(`${API_URL}/books`, {
      title: 'Book 2',
      isbn: 'EFGH',
    });
    expect(response.status).toBe(200);

    const createdBook = response.data.result;
    console.log('2nd Books created:', createdBook);
    expect(createdBook).toHaveProperty('id');
    createdBooks.push(createdBook.id);
    } catch (error) {
        if(error.response){
            switch(error.response.status)
                {
                    case 400:
                        console.log(error.response.data.error)
                    break;

                    case 500:
                        console.log(error.response.data.error)
                    break;
                }
            }
    }
  });

  // List all books and validate their presence
  test('list all books', async () => {
    try {
    const response = await axios.get(`${API_URL}/books`);
    expect(response.status).toBe(200);

    const books = response.data.result;
    console.log('All Books List:', books);
    expect(books).toBeGreaterThan(0); // Assuming 2 books were created
    // You could also validate specific book properties here
    } catch (error) {
        if(error.response){
            switch(error.response.status)
            {
                case 400:
                    console.log(error.response.data.error)
                break;

                case 500:
                    console.log(error.response.data.error)
                break;
            }
        }
    }
  });

  // Delete a book and verify its absence
  test('delete a book', async () => {
    try {
    const bookIdToDelete = createdBooks.pop(); // Get the last created book ID
    const response = await axios.delete(`${API_URL}/books/${bookIdToDelete}`);
    expect(response.status).toBe(200);

    // Verify the book is no longer present
    const listResponse = await axios.get(`${API_URL}/books`);
    console.log('All Books List after deleting:', listResponse.data.result);
    expect(listResponse.data.result);
    expect(listResponse.data.result.some(book => book.id === bookIdToDelete)).toBe(false);
    } catch (error) {
        if(error.response){
            switch(error.response.status)
                {
                    case 400:
                        console.log(error.response.data.error)
                    break;

                    case 500:
                        console.log(error.response.data.error)
                    break;
                }
        }
        
    }
  });
});
