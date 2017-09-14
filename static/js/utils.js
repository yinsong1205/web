/* 依赖于jquery */
/**
 * 提供项目中重复的元素
 * 1. addBtn 动态生成表头按钮
 * 2. createSelectOption 动态创建select元素下面的option
 */
//工具类构造函数
function FXUtils(){}
//工具类方法扩展
FXUtils.prototype =  {
	/**
	* @author 柴建锋
	* @param data : 需要传入的数组: 示例:[{text: '增加',class:'', onClick:'addLayer(\"insert\")',iClass:''}]
	*		 text: 按钮的文本
	*		 class: 按钮的样式
	*		 onClick : 按钮点击的动作
	*		 iClass: 按钮上小图标的样式 参考: http://www.bootcss.com/p/font-awesome/
	* @result 多个按钮元素
	* @description 动态生成表头按钮
	*/
	addBtn : function(data){
		//本类对象
		var eThis = this;
		
		if(data && $.isArray(data) && data.length>0){
			//创建元素节点
			var btnHtml = document.createElement('div');
			$.each(data,function(i,e){
				//调用创建按钮的函数,添加到元素节点
				btnHtml.appendChild(eThis.createBtn(e));
			});
			return $(btnHtml).html();
		}else{
			return '请修改参数格式 : [{text:"增加",class:"btn btn-sm"}]';
		}
	},
	/**
	 * @author 柴建锋
	 * @update 
	 * @param JSON json
	 * @return 单个button元素
	 * @version v1.0
	 * @description 生成button元素
	 */
	createBtn : function(json){
		if(json){
			//创建按钮元素
			var btn = document.createElement("button");
			//给元素设置属性
			$(btn).css({'marginRight':'6px'}); //设置默认的style
			$(btn).attr({'class':'btn btn-sm btn-primary'});//设置默认的class
			//设置小图标
			var iEle = document.createElement("i");
			$.each(json,function(k,v){
				if(k == 'text'){
					$(btn).text(' '+v);
				}else if(k == 'iClass'){
					$(btn).prepend($(iEle).attr("class",v));
				}else{
					$(btn).attr(k,v)
				}
			});
			return $(btn).get(0); 
		}else{
			return '';
		}
	},
	/**
	 * @author 柴建锋
	 * @create 2017-08-11
	 * @update 
	 * @param  string selecteId : 要挂载的selecte元素的id
	 * 		   string data      : 格式: [{name=人事部,value=1,selected=false},{name=客服部,value=2,selected=true},{name=开发部,value=3,selected=false}]
	 * @return 
	 * @version v1.0
	 * @description 动态创建select元素下面的option
	 */
	createSelectOption : function(selectId,data){
		//本类对象
		var eThis = this;
		
		if(selectId && data){
			data = this.changeDataToJson(data);
			if($.isArray(data) && data.length>0){
				var selectEle = $('#'+selectId).get(0);
				var optionEle;
				$.each(data,function(i,e){
					optionEle = document.createElement('option');
					$.each(e,function(k,v){
						if(k.toLowerCase()=='name'){
							$(optionEle).text(v);
						}else{
							$(optionEle).attr(k,v);
						}
					});
					selectEle.appendChild(optionEle);
				});
			}
		}
	},
	/**
	 * @author 柴建锋
	 * @create 2017-08-11
	 * @update
	 * @param  string data 格式: [{name=人事部,value=1,selected=false},{name=客服部,value=2,selected=true},{name=开发部,value=3,selected=false}]
	 * @return JSON对象
	 * @version v1.0
	 * @description 转换后台数据为JSON对象
	 */
	changeDataToJson : function (data){
		data = data.replace(/\{/ig,'\{\"');
		data = data.replace(/\}/ig,'\"\}');
		data = data.replace(/=/ig,'\":\"');
		data = data.replace(/\s{0,}\,\s{0,}/ig,'\"\,\"');
		data = data.replace(/\}\"\,\"\{/ig , '\}\,\{');
		return JSON.parse(data);
	}
	
};



	
/*1.表头增加按钮使用示例*/
/*
//1.定义按钮的json对象  iClass:图标样式参考: http://www.bootcss.com/p/font-awesome/
var arr = [
	{"text":"新 增","onClick":"addLayer(\'insert\')", "class":"btn btn-primary btn-sm","iClass":"fa fa-plus"},
	{"text":"修 改","onClick":"addLayer(\'update\')","class":"btn btn-primary btn-sm","iClass":"fa fa-pencil"},
	{"text":"删 除","onClick":"","class":"btn btn-primary btn-sm","iClass": "fa fa-trash"}
];

//2.创建工具对象
var fxUtils = new FXUtils(); 

//3.给jqGrid的caption属性赋值
jQuery("#list2").jqGrid({
	caption : fxUtils.addBtn(arr), //调用添加按钮的方法
});

function addLayer(type){
	console.log(type);
}*/
/*表头增加按钮使用示例*/

/*创建select中的option*/
/*function createSelectOption(selectId,data){
	if(selectId && data){
		data = changeDataToJson(data);
		if($.isArray(data) && data.length>0){
			var selectEle = $('#'+selectId).get(0);
			var optionEle;
			$.each(data,function(i,e){
				optionEle = document.createElement('option');
				$.each(e,function(k,v){
					if(k.toLowerCase()=='name'){
						$(optionEle).text(v);
					}else{
						$(optionEle).attr(k,v);
					}
				});
				selectEle.appendChild(optionEle);
			});
		}
	}
}*/
//转换后台的数据为json格式
/*function changeDataToJson(data){
	data = data.replace(/\{/ig,'\{\"');
	data = data.replace(/\}/ig,'\"\}');
	data = data.replace(/=/ig,'\":\"');
	data = data.replace(/\s{0,}\,\s{0,}/ig,'\"\,\"');
	data = data.replace(/\}\"\,\"\{/ig , '\}\,\{');
	return JSON.parse(data);
}*/