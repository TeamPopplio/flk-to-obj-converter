exports.convertFromString = async function(flk, faces = false) {
    return new Promise((resolve, reject) => {
        if(typeof faces !== 'boolean')
            reject("'faces' parameter is not of type 'boolean'.");
        else if(typeof flk !== 'string')
            reject("'flk' parameter is not of type 'string'.");
        if(flk == "")
            reject("'flk' parameter contains no data.");
        resolve(convert(flk,faces));
    });
};
exports.convertFromStringSync = function(flk, faces = false, returnerror = false) {
    if(typeof returnerror !== 'boolean')
        return 1;
    else if(typeof faces !== 'boolean')
        return (returnerror ? Error("'faces' parameter is not of type 'boolean'.") : false);
    else if(typeof flk !== 'string')
        return (returnerror ? Error("'flk' parameter is not of type 'string'.") : false);
    if(flk == "")
        return (returnerror ? Error("'flk' parameter contains no data.") : false);
    return convert(flk,faces);
};
exports.convertFromBuffer = async function(file, encoding = "utf8", faces = false) {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        if(typeof faces !== 'boolean')
            reject("'faces' parameter is not of type 'boolean'.");
        if(!Buffer.isBuffer(file))
            reject("'file' parameter is not of type 'buffer'.");
        if(file == new Buffer.from(""))
            reject("'file' parameter contains no data.");
        flk = file.toString(encoding);
        resolve(convert(flk,faces));
    });
};
exports.convertFromBufferSync = function(file, encoding = "utf8", faces = false, returnerror = false) {
    const fs = require('fs');
    if(typeof returnerror !== 'boolean')
        return 1;
    else if(typeof faces !== 'boolean')
        return (returnerror ? Error("'faces' parameter is not of type 'boolean'.") : false);
    if(!Buffer.isBuffer(file))
        return (returnerror ? Error("'file' parameter is not of type 'buffer'.") : false);
    if(file == new Buffer.from(""))
        return (returnerror ? Error("'file' parameter contains no data.") : false);
    flk = file.toString(encoding);
    return convert(flk,faces);
};
function convert(flk, faces = false) {
    //verts
    var flkarray = flk.split("\n"),
        vertpool = [],
        verts = ["g FLK"];
    flkarray.splice(0, 9);
    if(flkarray[0].startsWith("short"))
        flkarray.splice(0, 3); //older version of FLK format
    for(i = 0; i != flkarray.length; i++) {
        if(flkarray[i].startsWith("/*") || flkarray[i].startsWith("  BG") || flkarray[i].startsWith("	BG")) {
            vertpool = flkarray;
            vertpool.splice(i,vertpool.length-i);
            break;
        }
    }
    for(i = 0; i != vertpool.length; i++) {
        if(!vertpool[i].match(/\d/g))
            continue;
        var str = vertpool[i].replace(/\t/g,"").replace(/ /g,"").replace(/,/g," ");
        str = "v " + str;
        verts.push(str);
    }
    if(!faces)
        return verts.join("\n"); //verts done!
    //faces
    var flkarray2 = flk.split("\n"),
        facepool = [],
        facesdone = [],
        increment = false;
    flkarray2.splice(0, 9);
    if(flkarray2[0].startsWith("short"))
        flkarray2.splice(0, 3); //older version of FLK format
    for(i = 0; i != flkarray2.length; i++) {
        if(flkarray2[i].startsWith("/*") || flkarray2[i].startsWith("  BG") || flkarray2[i].startsWith("	BG")) {
            facepool = flkarray2;
            facepool.splice(0,i+(flkarray2[i].startsWith("/*") ? 3 : 1));
            break;
        }
    }
    for(i = 0; i != facepool.length; i++) {
        if(facepool[i].startsWith("  BG") || facepool[i].startsWith("	BG"))
        {
            if(!increment) {
                increment = true;
                continue;
            } else
                break;
        }
        if(!facepool[i].match(/\d/g))
            continue;
        var str = facepool[i].replace(/\t/g,"").replace(/ /g,"").replace(/,/g," ");
        var split = str.split(" ")
        if(split.length < 3)
            break;
        for(e = 0; e != 3; e++) {
            split[e] = parseInt(split[e])+1;
        }
        str = "f " + split.join(" ");
        facesdone.push(str);
    }
    return verts.join("\n")+"\n"+facesdone.join("\n"); //faces done!
};
