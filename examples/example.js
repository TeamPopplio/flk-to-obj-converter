const converter = require("../index"),
    fs = require('fs'), //Only required for Buffer conversion.
    flk = fs.readFileSync("./examples/example.flk"), //Read the FLK file as a Buffer.
    example = "/*\nHeader\n*/\n\n\n/*Comment*/\n\n	2, 8,\n\n    -1, -1, 1,\n    -1, 1, 1,\n    -1, -1, -1,\n    -1, 1, -1,\n    1, -1, 1,\n    1, 1, 1,\n    1, -1, -1,\n    1, 1, -1,\n\n/*Comment*/\n"

//String encoding (Buffer) is set to UTF-8 by default.
//First boolean indicates conversion of faces.
//Second boolean (sync) indicates returning an Error class or simply 'false' upon an error.

//Asynchronous | Returns promises
converter.convertFromString(example, false)
    .then(result => console.log("String Async:\n"+result))
    .catch(error => console.error(error));
converter.convertFromBuffer(flk, "utf8", true)
    .then(result => console.log("Buffer Async:\n"+result))
    .catch(error => console.error(error));

//Synchronous | Returns either a string or an Error
let objFromString = converter.convertFromStringSync(example, true, false);
console.log("String Sync:\n"+objFromString);
let objFromBuffer = converter.convertFromBufferSync(flk, "utf8", true, false);
console.log("Buffer Sync:\n"+objFromBuffer);
