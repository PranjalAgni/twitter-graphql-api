// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import initalizeServer from "./server";

const startServer = async () => {
  const server = await initalizeServer();
  server.listen(5555).then(({ url }) => console.log(`Server ready at ${url} `));
};

startServer();
