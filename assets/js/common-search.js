function SourceClass(nameParam, labelParam, activeParam) {
		this.name = nameParam;
		this.label = labelParam;
		this.active = activeParam;
		this.select = "false";
		this.indexes = [];
		
		this.setSelect = function(selectParam) {
			this.select = selectParam;
		}
	}
	
function IndexClass(indexIdParam, indexNameParam) {
		this.indexId = indexIdParam;
		this.indexName = indexNameParam;
		this.indexType = "index";
		this.sourceName = 'undefined';
		this.indexParam = null;
		
		this.setSourceName = function(sourceNameParam) {
			this.sourceName = sourceNameParam;
		}
		
		this.setIndexType = function(indexTypeParam) {
			this.indexType = indexTypeParam;
		}
		
		this.isFiltre = function() {
			return (indexTypeParam != 'index');
		}
		
		this.setIndexParam = function(indexParamParam) {
			this.indexParam = indexParamParam;
			if(this.indexParam == '') {
				this.indexParam = null;
				return;
			}
			var values = this.indexParam.split("#");
			this.indexParam = new Array();
			for(var i = 0 ; i < values.length ; i++) {
				var value = values[i].split("->");
				var tmp = new Array();
				tmp.push(value[0]);
				tmp.push(value[1]);
				this.indexParam[value[0]] = tmp;
			}
		}
}


/**
 * Method used to remove a list of words from criterias used to query sudoc source.
 * called by submit method of the form
 * critHtml, string representing the user value
 * inputDest, the jquery input element that store final (generated) sudoc criteria
 */
function buildSudocCrit(critHtml,inputDest) {
	var det = [ "LE", "LA", "LES", "DE", "DU", "DES", "L", "D" ];
	if (critHtml != "") {
		var words = critHtml.split(" ");
		var critWO = "";
		for (var j = 0; j < words.length; j++) {
			var words2 = words[j].split("'");

			for (var k = 0; k < words2.length; k++) {

				var forbidden = false;
				for (var m = 0; m < det.length; m++) {
					if (words2[k].toUpperCase() == det[m]) {
						forbidden = true;
						break
					}
				}
				if (!forbidden) {
					if (critWO != "")
						critWO += " ";
					critWO += words2[k];
				}
			}
		}
		inputDest.val(critWO);
	} else {
		inputDest.val("");
	}

}