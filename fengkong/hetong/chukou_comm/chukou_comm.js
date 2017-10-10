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





{
	container:"",
	clazz:"",
	columns:[
		{col:"relName",label:"合同名称",type:"text",required:true},
		{col:"numBer",label:"合同编号",type:"text",required:true}
	]
}

function formGenerator(obj){
	if(!obj || $.isEmptyObject(obj)) return;
	//处理容器
	var container = obj.container;
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
		var type = column.type || "text";
		var $input = null;
		switch(type){
			case "text":
				$input = $('<input type="text" id="" name="'+column.col+'" class="form-control input-sm"  placeholder="'+column.label+'"/>');
				break;
			case "select":
				break;	
			case "date":
				break;
			default:
				break;
		}
		$input.appendTo($tempDiv);
	}
}



