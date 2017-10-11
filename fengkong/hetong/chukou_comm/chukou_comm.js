/*
function add_jqGrid_formBox(argument) {
	if (argument) {
		var big = document.createElement("div");
		$(big).attr({'class':'layerFormBox'});
		var little = document.createElement("div");

		$(little).appendTo($(big));
		$(little).attr({'class':'form-horizontal layerForm zzxx'});
		var form = document.createElement("div");
		$(form).appendTo(little);
		$(form).attr({'class':'form-group col-xs-4'});
		var label = document.createElement("label")
		// var arr = [
		// 	{name: }
		// ]
	}
}

function add_jqGrid_formBox(obj){
	if(!obj)return;
	var $o;
	if(typeof obj=="string") $o = $("#"+obj);
	else if($.isEmptyObject(obj)) $o = $(obj);
	var array = [];
	var str = '\
		
}
*/




/*
var obj = {
	container:"chukou_jqGrid_formBox",
	clazz:"",
	columns:[
		{col:"relName",label:"合同名称",type:"text",required:true},
		{col:"numBer",label:"合同编号",type:"text",required:true}
	]
}
*/


function formGenerator(obj){return;
	if(!obj || $.isEmptyObject(obj)) return;
	//处理容器
	var container = obj.container;
	console.log(obj.container);
	
	if(!container) return;
	var $container = null;
	if(typeof container=="string") $container = $("#"+container);
	else if($.isEmptyObject(container)) $container = $(container);
	else return;
	if($container==null || $container.length==0)return;
	if($container.hasClass("layerFormBox")) $container.addClass("layerFormBox");
	
	//处理第一个子div
	var columns = obj.columns;
	if(columns==null || !columns || columns.length==0) return;
	var $firstDiv = $('<div class="form-horizontal layerForm zzxx"></div>').appendTo($container);
	for(var i=0;i<columns.length;i++){
		var column = columns[i];
		if(column==null || $.isEmptyObject(column))continue;
		var $innerDiv = $('<div class="form-group col-xs-4"></div>').appendTo($firstDiv);
		$('<label class="col-xs-4 control-label"><span>'+(column.required?'*':'')+'</span>'+column.label+':</label>').appendTo($innerDiv);
		var $tempDiv = $('<div class="col-xs-8"></div>').appendTo($innerDiv);
		
		/*
		//第二个form表单分两个div
		var $lastDiv = $('<form class="col-xs-12 zzxx" style="margin-bottom: 50px;"></form>').appendTo($firstDiv);
		var $oneDiv = $('<div class="row col-xs-6 ctrol_form" style="border: 1px solid #000;border-right: none;margin-left: 20px;"><div>').appendTo($lastDiv);
		var $twoDiv = $('<div class="row col-xs-6 ctrol_form" style="border: 1px solid #000;"><div>').appendTo($lastDiv);
		var $leftDiv = $('<div class="form-group col-xs-12"></div>').appendTo($oneDiv);
		var $rightDiv = $('<div class="form-group col-xs-12"></div>').appendTo($twoDiv);
		$('<label class="col-xs-4 control-label"><span>'+(column.required?'*':'')+'</span>'+column.labelone+':</label>').appendTo($leftDiv);
		$('<label class="col-xs-4 control-label"><span>'+(column.required?'*':'')+'</span>'+column.labeltwo+':</label>').appendTo($rightDiv);
		var $inputone = $('<div class="col-xs-8"></div>').appendTo($leftDiv);
		var $inputtwo = $('<div class="col-xs-8"></div>').appendTo($rightDiv);
		*/
		
		var type = column.type || "text";
		var $input = null;
		//var $inputfirst = null;
		//var $inputsecond = null;
		switch(type){
			case "text":
				$input = $('<input type="text" id="" name="'+column.col+'" class="form-control input-sm"  placeholder="'+column.label+'"/>');
				//$inputfirst = $('<input type="text" id="" name="'+column.colone+'" class="form-control input-sm"  placeholder="'+column.labelone+'"/>');
				//$inputsecond = $('<input type="text" id="" name="'+column.coltwo+'" class="form-control input-sm"  placeholder="'+column.labeltwo+'"/>');
				break;
			case "select":
				$input = $('<select id="chukou_bus" name="'+column.col+'" class="form-control input-sm" onclick="'+(column.dateTime?'WdatePicker()':'')+'"></select>');
				var options = column.options;
				if(options!=null && options.length>0){
					for(var j=0;j<options.length;j++){
						var option = options[j];
						var text = option.text;
						var value = option.value;
						var selected = option.selected;
						if(text!=null && value!=null){
							var $option = $('<option value="'+value+'"'+(selected?' selected="true"':'')+'>'+text+'</option>').appendTo($input);
						}
					}
				}
				break;	
			case "radio":
				$input = $('<input type="radio" class="input-sm">');
				break;
			default:
				break;
		}
		//$inputsecond.appendTo($inputtwo);
		//$inputfirst.appendTo($inputone);
		$input.appendTo($tempDiv);
	}
}



