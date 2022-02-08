function fileLoader() {
  var selectedFile = document.getElementById("files").files[0]; //获取读取的File对象
  var name = selectedFile.name; //读取选中文件的文件名
  var size = selectedFile.size; //读取选中文件的大小
  console.log("文件名:" + name + "大小：" + size);
  var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
  reader.readAsText(selectedFile); //读取文件的内容

  reader.onload = function() {
    console.log("读取结果：", this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。

    console.log("读取结果转为JSON：");
    let json = JSON.parse(this.result);
    console.log(json);
  };
}

function fileSaver(data, FileName) {
  if (!data || typeof data == 'function') {
    alert("无效数据！");
    return false;
  }
  if (!FileName) FileName = "save.json";
  if (FileName.indexOf(".json") == -1) FileName = FileName + ".json";

  var content = JSON.stringify(data);
  var blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, FileName);
}