// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../dist/`));

app.get("*", (request, response) => {
  response.sendFile(`${__dirname}/../dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
