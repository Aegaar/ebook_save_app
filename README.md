## Technologies

- **Frontend:** The client application is written in React.
- **Backend:** The server utilizes Node.js and Express.js.
- **Database:** Data is stored in MongoDB.

## Running the Application

### Client

To run the client, follow these steps:

```bash
cd client/ebook-save-app
npm install
npm start
```
The client will be running at http://localhost:3000/.

### SERVER

To run the client, follow these steps:

```bash
cd server
npm install
npm run dev
```
You must create a `.env` file in the `server` directory with the following content:

PORT=port number on which you want to run the server | You also need to change the proxy in package.json in the client, depending on the port you choose

MONG_URI=your connection string to MongoDB 

SECRET=your jsonwebtoken secret 


### Application Features

- Account Management: Users can create new accounts.
- Adding E-books and Audiobooks:  To add a new e-book or audiobook, users need to provide a file, title, and author.
- File formats supported by the application .mp3, audio/mpeg, audio, .pdf, .txt, .epub, .rb, .mobi, .azw3, .docx, .fb2, .lit, lrf, .pdb, .pmlz, . rtf, .snb, tcr, .snb, txtz
- Users can download e-books and audiobooks.
- Deletion E-books and Audiobooks is also supported.
