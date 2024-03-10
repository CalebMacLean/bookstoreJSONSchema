CREATE TABLE books (
  isbn TEXT PRIMARY KEY,
  amazon_url TEXT,
  author TEXT,
  language TEXT, 
  pages INTEGER,
  publisher TEXT,
  title TEXT, 
  year INTEGER
);

INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year) 
  VALUES
  ('978-1779501127', 'https://www.amazon.com/Watchmen-Alan-Moore/dp/1779501128', 'Alan Moore', 'English', 416, 'DC Comics', 'Watchmen', 1986),
  ('978-1779501126', 'https://wwww.amazon.com/Frankenstein-Mary-Shelley/dp/1779501126', 'Mary Shelley', 'English', 280, 'DC Comics', 'Frankenstein', 1818),
  ('978-1779501125', 'https://www.amazon.com/Neuromancer-William-Gibson/dp/1779501125', 'William Gibson', 'English', 271, 'DC Comics', 'Neuromancer', 1984);