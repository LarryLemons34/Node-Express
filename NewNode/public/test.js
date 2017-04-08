function actionJson(){
	console.log("function");
	$.ajax({
		type:"POST",
		url:"/action",
		data:"number1",
		dataType:"json"
	});
}