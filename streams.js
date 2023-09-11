const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog3.txt");
const writeStream = fs.createWriteStream("./docs/blog4.txt", {
  encoding: "utf8",
});

// Event listener that gets triggered whenever a new chunk is buffered.
// readStream.on("data", (chunk) => {
//   console.log("----- NEW CHUNK ----");
//   console.log(chunk.toString());

//   writeStream.write("\n----- NEW CHUNK -----\n");
//   writeStream.write(chunk.toString());
// });

// piping
readStream.pipe(writeStream);
