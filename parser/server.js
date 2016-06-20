var htmlparser = require("htmlparser2");
var parser = new htmlparser.Parser({
	onopentag: function(name, attribs){
		if(name === "script" && attribs.type === "text/javascript"){
			console.log("JS! Hooray!");
		}
	},
	ontext: function(text){
		console.log("-->", text);
	},
	onclosetag: function(tagname){
		if(tagname === "script"){
			console.log("That's it?!");
		}
	}
}, {decodeEntities: true});
parser.write('<tr id="td839535"> <td class="width-10"> <input type="checkbox" name="dumps[]" id="ch1" class="dump_check" value="839535"> </td> <td class="width-50px">374326</td> <td style="width:230px"><img src="./recator_usa_cc_files/amex.png" style="margin-right:3px"> AMEX <br> AMERICAN EXPRESS COMPANY <br><span style="color:red">Dump or cc of this particular bank (BIN) cannot be replaced or refunded.</span> </td> <td style="width:50px">DEBIT</td> <td style="width:100px">PREPAID</td> <td style="width:50px">04/2022</td> <td class="width-15"><img src="./recator_usa_cc_files/us.png" style="margin-top:3px"> United States</td> <td> CA </td> <td>North Highlands</td> <td style="width:70px;">95660</td> <td></td> <td></td> <td></td> <td class="width-15">Boscoreale <a href="https://rescator.cm/?action=cc#" class="tooltip"><img src="./recator_usa_cc_files/pending.png"> <span>Date: 30 May 2016, Replace: 5 M </span> </a> </td> <td class="width-10"><strong>13.5$</strong> </td> <td class="width-15" id="add839535"><a href="javascript:addtocart(839535,1)" id="839535" class="btn addcart">+</a> </td> </tr>');
parser.end();