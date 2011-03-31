function ltrim(str){
	return str.replace(/^\s+/, '');
}
function rtrim(str) {
	return str.replace(/\s+$/, '');
}
function alltrim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}
function padleft(val, ch, num) {
	var re = new RegExp(".{" + num + "}$");
	var pad = "";
	if (!ch) ch = " ";
	do  {
		pad += ch;
	}while(pad.length < num);
	return re.exec(pad + val)[0];
}
function padright(val, ch, num){
	var re = new RegExp("^.{" + num + "}");
	var pad = "";
	if (!ch) ch = " ";
	do {
		pad += ch;
	} while (pad.length < num);
	return re.exec(val + pad)[0];
}
function padcenter(str, ch, size, extra2right) {
	var pad = "";
    var len = str.length;
    var re;

    if (extra2right)
        re = new RegExp("^(.*)(.{" + len + "})(\\1)");
    else
        re = new RegExp("(.*)(.{" + len + "})(\\1)$");

    do {
        pad += ch;
    } while (--size);

    return str.replace(re, "$1" + str + "$3");
}//eof padcenter
function extractMiddle(str, size, extra2right) {
	var len = Math.floor( (str.length - size)/2);

	if (extra2right)
		re = new RegExp("(.{" + len + "})(.{" + size + "})(.*)");
	else
		re = new RegExp("(.*)(.{" + size + "})(.{" + len + "})");

	return str.replace(re, "$2");
}//eof extractMiddle









function debugresponse(response,type) {
 	var html = '<table>';
	var standard = "";
        for (var key in response) {
			if (type == 'html') {
				if (typeof response[key] == 'object') {
					html += dumpObj(response[key],'html');
				}
				else {
						html += (
						'<tr>' +
						'<th>' + key + '</th>' +
						'<td>' + response[key] + '</td>' +
						'</tr>'
						);
				}
			}
			else {
				if (typeof response[key] == 'object') {
									standard += key + ": " + dumpObj(response[key]) + "\n";
							}
							else {
					standard += key + ": " + response[key] + "\n";
				}
			}
        }
        html += "</table>";
	var out;
	if (type == 'html') { return(html); }
	else { console.log(standard); }
}


// ----------------------------------------------------
// DEBUGGING -- return items in an object
//
var MAX_DUMP_DEPTH = 10;
function dumpObj(obj, name, indent, depth, type) {
	var delim = '';
	if (type == 'html') { delim = '<BR>'; }
	else { delim = '\n'; }
        if (depth > MAX_DUMP_DEPTH) {
              return indent + name + ": <Maximum Depth Reached>" + delim;
        }
        if (typeof obj == "object") {
              	var child = null;
              	var output = indent + name + delim;
              	indent += "\t";
		for (var item in obj) {
              		try {
                        	child = obj[item];
                        } catch (e) {
                                child = "<Unable to Evaluate>";
                        }
                        if (typeof child == "object") {
                                output += dumpObj(child, item, indent, depth + 1, type);
                        } else {
                                output += indent + item + ": " + child + delim;
                        }
                }
                return output;
        } else {
                return obj;
        }
}



var log = function(item){
	if (DEBUG == 1) {
		if(window.console) {
			if(window.console.firebug != '') {
				console.info(item);
			}
		}
		else {
			alert(item);
		}
	}
}
