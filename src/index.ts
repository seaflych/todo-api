import { app } from "./server";

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`hello from ${port}`);
});
