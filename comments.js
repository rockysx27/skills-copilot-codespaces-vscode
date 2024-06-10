// Create web server
// Create a comments page
// Create a form that allows user to enter a comment
// Create a list of comments that are displayed on the page

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
  res.send(`
    <form action="/comments" method="POST">
      <input name="comment" type="text" />
      <button>Submit</button>
    </form>
  `);
});

app.post('/comments', (req, res) => {
  const { comment } = req.body;

  fs.readFile('comments.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.send('Error reading comments file');
    }

    const comments = data.split('\n');
    comments.push(comment);

    fs.writeFile('comments.txt', comments.join('\n'), err => {
      if (err) {
        console.error(err);
        return res.send('Error writing comments file');
      }

      res.redirect('/comments');
    });
  });
});

app.listen(3000);
