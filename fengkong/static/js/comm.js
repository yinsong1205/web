$.ajaxSetup ({ 
    cache: false //关闭AJAX相应的缓存 
});


$(window).resize(function(){
	//var gridBox = $('#main .active .gridBox');
	//var currentWidth = gridBox.width();
	//var currentHeight = gridBox.height();
	//$('#main .active .ui-jqgrid').width(currentWidth);
	//$('#main .active .ui-jqgrid .ui-jqgrid-bdiv').height(currentHeight-117);
});

$.jgrid.defaults.styleUI = 'Bootstrap';
//$.jgrid.defaults.responsive = true;

$(function(){
	/*加载头部信息*/
	$('#fkHeader').load('include/header.html');
	//加载左侧信息
	$('#fkLeft').load('include/left.html');
	//加载首页
	$('#main .con').eq(0).load('include/main.html');
	//$('#main .con').eq(0).load('system/module.html');
	
	//右侧触发点击
	$('#fkTabs ul').on('click','li',function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active');
			//比较右侧的内容显示
			var index = $(this).index();
			var $mainCon = $('#main .con');
			$mainCon.eq(index).addClass('active').siblings().removeClass('active');
		}else{
			
		}
	});
	
	//右侧触发点击
	$('#fkTabs ul').on('click','li i',function(){
		var $li = $(this).parent();
		var index = $li.index();
		$li.remove();
		$('#main .con').eq(index).remove();
		$('#fkTabs ul').find('li').eq(index-1).addClass('active');
		$('#main .con').removeClass('active').eq(index-1).addClass('active');
		//layer.closeAll();
	});
	
	
});

function changeSearch(){
	//搜索条添加样式
	var input =  $('.ui-search-toolbar :input');
	input.addClass('input-sm').height();
	var table = $('.gridBox table');
	table.addClass('table-condensed');
}

//获取表单的数据
function getFormData(id){
	
	var formInputs = $('#'+id+' :input');
	var formData = {};
	$.each(formInputs,function(i,e){
		var name = $(e).attr('name');
		if(name != null && name!='underfined' && name != '' ){
			formData[name] = $(e).val();
		}
	});
	//console.log(formData);
	return formData; 
}

//设置表单数据
function setFormData(id,rowData){
	var formInputs = $('#'+id+' :input');
	$.each(formInputs,function(i,e){
		var name = $(e).attr('name');
		if(name != null && name!='underfined' && name != '' ){
			$(e).val(rowData[name]);
		}
	});
}

//表格获取选择的行
function getSelectedRow(id) {
	var grid = $("#"+id);
	var rowKeys = grid.jqGrid('getGridParam',"selarrrow");
    return rowKeys;
}

//格式化标题
function formatTitle(cellValue, options, rowObject) {
	var len = cellValue.length;
	if(len>50){
		cellValue = cellValue.substring(0, 50) + "...";
	}
	return '<a href="javascript:;" onclick="editLayer(\''+options.gid+'\',\''+options.rowId+'\')">'+cellValue+'</a>';
};

//格式化操作链接
function formatLink(cellValue, options, rowObject) {
	var len = cellValue.length;
	if(len>25){
		cellValue = cellValue.substring(0, 25);
	}
	//return '<a href="javascript:;" onclick="deleteEditLayer(\''+options.gid+'\','+options.rowId+')">'+cellValue+'</a>';
	return '<a href="javascript:;" onclick="deleteEditLayer(\''+options.gid+'\',\''+options.rowId+'\')"><i title="删除" class="text-danger fa fa-trash-o"></i></a>';
};

//格式化状态
function formatStatus(cellValue, options, rowObject) {
	var title = '';
	var className = '';
	if(cellValue==0){
		title = '未审核';
		className = 'fa-times-circle text-danger';
	}else if(cellValue==1){
		title = '已审核';
		className = 'fa-check-circle-o text-success';
	}else{
		title = '正在审核...';
		className = 'fa-question-circle-o text-warning';	
	}
	return '<i title="'+title+'" class="fa '+className+'"></i>';
};


var commIndex = null;

function editLayer(gid,rowId){
	var data = $('#'+gid).getRowData(rowId);
	data.name = $(data.name).text();
	setFormData(gid+'_formBox',data);
	title = '编辑窗口';
	commIndex = layer.open({
		type: 1,
		title : title,
		area: ['40%', '70%'], //宽高
		content: $('#'+gid+'_formBox')
	});
}

function saveEditLayer(){
	
}

function deleteEditLayer(gid,rowId){
	console.log(gid);
	var deletindex = layer.confirm('确定要删除吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
		$("#"+gid).delRowData(rowId);  
		layer.msg('删除成功', {icon: 1});
	}, function(){
		layer.close(deletindex);
	});
}

var  layerCloseTime = 1200;

//删除grid数据
function deleteGridData(gridId){
	//console.log(gridId);
	var rowIds = getSelectedRow(gridId);
	var len = rowIds.length;
	if(rowIds && $.isArray(rowIds) && rowIds.length>0){
		commIndex = layer.confirm('确定要删除吗？', {
		  btn: ['确定','取消'] 
		}, function(){
			for(var i=0; i<len; i++){
				jQuery('#'+gridId).delRowData(rowIds[0]);  
			}
			layer.msg('删除成功', {icon: 1,time:layerCloseTime});
		}, function(){
			layer.close(commIndex);
		});
		
	}else{
		layer.msg('请选择记录!',{time:layerCloseTime});
	}
}

function updateGridData(setting){
	var rowIds = getSelectedRow(setting.gridId);
	if(rowIds && $.isArray(rowIds) && rowIds.length == 1 ){
		var rowData = $('#'+setting.gridId).getRowData(rowIds[0]);
		rowData.name = $(rowData.name).text();
		console.log('id:'+rowData.id);
		rowData.id = $(rowData.id).text();
		setFormData(setting.formBoxId,rowData);
		//title = '修改模块';
		commIndex = layer.open({
			type: 1,
			title : setting.title,
			area: setting.area, //宽高
			content: $('#'+setting.formBoxId)
		});
	}else{
		layer.msg('同时只能选择一条记录!',{time:layerCloseTime});
	}
	
	return commIndex;
}

$(document).on('click','.qx',function(){
	layer.close(commIndex);
});

//修改密码
$(document).on('click','#changePasswordBtn',function(){
	commIndex = layer.open({
		type : 1,
		title : '修改密码',
		area : ['40%','55%'],
		content : $('#header_change_pwd')
	});
});

//确定修改
$(document).on('click','#headerQuedingPwdBtn',function(){
	layer.msg('修改成功!',{time:layerCloseTime});
});

//查看信息
function lookInfo(gid,rowId){
	var data = $('#'+gid).getRowData(rowId);
	data.name = $(data.name).text();
	data.relName = $(data.relName).text();
	setFormData(gid+'_formBox',data);
	title = '查看信息';
	commIndex = layer.open({
		type: 1,
		title : title,
		area: ['98%', '98%'], //宽高
		content: $('#'+gid+'_formBox')
	});
}

