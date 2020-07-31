const flkconv = require("./index"),
    fs = require("fs"),
    { exit } = require("process");
var args = process.argv.slice(2),
    faces = true,
    file = "./flk.obj";
if(!process.argv[0].toLowerCase().match(/node/)) {
    console.error("This test script must run from node directly.");
    exit(1);
} else if(args[0] == undefined) {
    console.error("No function called.\n>node test.js [convertFromString|convertFromStringSync|convertFromBuffer|convertFromBufferSync]");
    exit(1);
}
switch(args[0].toLowerCase()) {
    case "convertfromstring":
        args.splice(0,1)
        if(args.join(" ") == undefined) {
            console.error("'convertFromString' function left with undefined text argument.\n>node test.js convertFromString [text]");
            exit(1);
            break;
        } else if(args.join(" ") == "" || args.join(" ") == " ") {
            console.error("'convertFromString' function left with no text argument.\n>node test.js convertFromString [text]");
            exit(1);
            break;
        }
        console.log(`Starting 'convertFromString' function.\n>node test.js convertFromString ${args.join(" ")}`);
        flkconv.convertFromString(args.join(" "), faces).then((result) => {
            console.log("Successfully performed 'convertFromString' function!\n"+result);
            fs.writeFile(file,result);
            exit(0);
        }).catch((error) => {
            console.log("Error in 'convertFromString' function!\n", error);
            exit(1);
        })
        break;
    case "convertfromstringsync":
        args.splice(0,1)
        if(args.join(" ") == undefined) {
            console.error("'convertFromStringSync' function left with undefined text argument.\n>node test.js convertFromStringSync [text]");
            exit(1);
            break;
        } else if(args.join(" ") == "" || args.join(" ") == " ") {
            console.error("'convertFromStringSync' function left with no text argument.\n>node test.js convertFromStringSync [text]");
            exit(1);
            break;
        }
        console.log(`Starting 'convertFromString' function.\n>node test.js convertFromStringSync ${args.join(" ")}`);
        let resultstring = flkconv.convertFromBufferSync(args.join(" "), faces, true);
        console.log(resultstring);
        fs.writeFileSync(file,resultstring);
        exit(0);
        break;
    case "convertfrombuffer":
        args.splice(0,1)
        if(args.join(" ") == undefined) {
            console.error("'convertFromBuffer' function left with undefined file argument.\n>node test.js convertFromBuffer [file]");
            exit(1);
            break;
        } else if(args.join(" ") == "" || args.join(" ") == " ") {
            console.error("'convertFromBuffer' function left with no file argument.\n>node test.js convertFromBuffer [file]");
            exit(1);
            break;
        }
        console.log(`Starting 'convertFromBuffer' function.\n>node test.js convertFromBuffer ${args.join(" ")}`);
        flkconv.convertFromBuffer(fs.readFileSync(args.join(" ")), encoding = "utf8", faces).then((result) => {
            console.log("Successfully performed 'convertFromBuffer' function!\n"+result);
            fs.writeFileSync(file,result);
            exit(0);
        }).catch((error) => {
            console.log("Error in 'convertFromBuffer' function!\n", error);
            exit(1);
        })
        break;
    case "convertfrombuffersync":
        args.splice(0,1)
        if(args.join(" ") == undefined) {
            console.error("'convertFromBufferSync' function left with undefined file argument.\n>node test.js convertFromBufferSync [file]");
            exit(1);
            break;
        } else if(args.join(" ") == "" || args.join(" ") == " ") {
            console.error("'convertFromBufferSync' function left with no file argument.\n>node test.js convertFromBufferSync [file]");
            exit(1);
            break;
        }
        console.log(`Starting 'convertFromBuffer' function.\n>node test.js convertFromBufferSync ${args.join(" ")}`);
        let resultbuffer = flkconv.convertFromBufferSync(fs.readFileSync(args.join(" ")), encoding = "utf8", faces, true);
        console.log(resultbuffer);
        fs.writeFileSync(file,resultbuffer);
        exit(0);
        break;
}
