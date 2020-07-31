# FLK to OBJ Converter

This module allows for the conversion of FLK models (\*.flk) to the Wavefront OBJ geometry format (\*.obj) to view in an accessible model editor.

# Installation

You can install the module using [NPM](https://www.npmjs.com/):
```
npm i flk-to-obj-converter
```

## Usage

```javascript
const converter = require("flk-to-obj-converter"),
    fs = require('fs'), //Only required for Buffer conversion.
    flk = fs.readFileSync("./examples/example.flk"), //Read the FLK file as a Buffer.
    example = "FLK string" //This is where a string representation of an FLK file would go.

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
```
This example can be ran using ``npm run example`` within the working directory.

## License

Copyright (c) 2020 KiwifruitDev
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
