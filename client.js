function initEditor(){
	angular.module('kityminderDemo', ['kityminderEditor'])
			.controller('MainController', function($scope) {
				$scope.initEditor = function(editor, minder) {
					window.editor = editor;
					window.minder = minder;
				};
	});	
}

initEditor();//init editor

let filepath='';

const ipc =  Mrequire('electron').ipcRenderer;

//新建文件
ipc.on('new-file', function (event, path) {
	//原文件保存
	console.log('create new file');
})


//保存文件
ipc.on('save-file', function (event, path) {
	if (!path) {
		//提醒
		// ipc.send('save-file-nopath');
		return;
	}
	
	var source=editor.minder.exportJson();
	var source_str=JSON.stringify(source);

	filepath=path;
	var fs = Mrequire('fs');
	fs.writeFileSync(path,source_str,'utf8');
})

//打开文件
ipc.on('open-file', function (event, path) {
	if (!path) {
		//提醒
		ipc.send('open-file-nopath');
		return;
	}
	
	var fs = Mrequire('fs');
	fs.readFile(path, 'utf8', function (err, data) {
	    if (err) {
			// ipc.send('open-file-nopath');
	    	return;
	    }
		filepath=path;
		try{
		    var obj = JSON.parse(data);
			editor.minder.importJson(obj);
		}
		catch(e){
			ipc.send('file-content-error');
		}
	});
})
