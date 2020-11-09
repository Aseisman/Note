FileReader 文件异步读取以及解析处理
文件预览，MIME 筛选，多文件处理
单文件上传的两种处理方案
QQ 空间：多文件上传及上传进度管控
百度：基于 h5 拖放 API 实现文件的拖拽上传。

accpet:表示选择的文件的格式，image/\*表示绝大部分的图片

multiple 允许选择多个文件

文件大小，先选择所有，再提示哪种文件不能被选中

```html
<input type="file" multiple id="uploadInp" />
<img src="" alt="" id="suoluetu" />
<script>
  let uploadInp = document.querySelector("#uploadInp");
  let suoluetu = document.getElementById("suoluetu");
  uploadInp.onchange = function () {
    console.log(this.files);
    //FileList集合(多个文件),类数组
    //每一项就是一个文件
    //一个文件有name，size，type属性
    let file = this.files[0];
    if (!file) return;
    if (file.size > 1024) {
      alert("上传的图片必须在1kb内");
      return;
    }
    // if(!file.type.include("image")){
    //     alert("必须上传图片！")
    // }
    // if(!/(jpg|jpeg|gif|png)$/.test(file.type)){
    //     alert("必须上传jpg，，，png格式的照片");
    //     return;
    // }

    //要生成缩略图
    //FIleReader 文件读取类（异步）
    let reader = new FileReader();
    reader.readAsDataURL(file); //读取成base64的，buffer是流的，以后会用到。
    reader.onload = function (ev) {
      console.log(ev); //读取出来的base64
      suoluetu.src = ev.target.result;
    };
  };
</script>
```

```html
<!-- 单张图片上传 -->
<!-- axios+qs -->
<img src="./单张图片上传.png" />
<script>
  (function () {
    let uploadBox = document.querySelector(".uploadBox"),
      uploadInp = document.querySelector(".uploadInp"),
      submit = document.querySelector(".submit"),
      detail = document.querySelector(".detail"),
      detailText = document.querySelector(".span"),
      abbre = document.querySelector(".abbre"),
      abbImg=document.quertSelector(".abbreImg");

    //axios封装post请求
    function postRequest(url, data, config) {
      config = config || {};
      return axios
        .post(`http://127.0.0.1:8888${url}`, data)
        .then((response) => {
          return response.data;
        });
    }
    //点击按钮跳出窗口
    submit.onclick = function () {
      let self = this;
      if (self.className.includes("disable")) {
        return;
      }
      uploadInp.click();
    };
    //选取图片后做的
    uploadInp.onchange = async function () {
      let self = this;
      file = self.files[0];
      if (!file) return;
      //显示上传中
      detailText.innerHTML = file.name;
      detail.style.display = "block";
      //加一个disable,的css类
      submit.className = "submit disable";

      //上传到服务器
      //nodejs中的 FORM-DATA
      let formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      //发起请求
      let res=await postRequest('/single',formData,{
          headers:{
              "Content-Type":"multipart/form-data"
          }
          //传给服务器的格式
          //form-data
          //application/x-www-form-urlencoded
          //raw文本格式
          //json
          //二进制格式
      });
      if(response.code==0){
          //成功时
          abbreImg.src=response.path;
          detail.style.display = "none";
          abbre.style.display='block';
          submit.className = "submit";
      }
    };
  })();
</script>
```
```html
<!-- 单文件上传：方案二：转成base64，然后把base64发给服务器 -->
<script>
    //文件读取
    function fileReader(file){
        return new Promise(resolve=>{
            let reader=new FileReader;
            //new不传参可以不用括号
            reader.readAsDataUrl(file);
            reader.onload=ev=>{
                resolve(ev.target.result)
            }
        })
    }

    let base64=await fileReader(file);
    data={
        chunk:base64,
        filename:file.name
    };
    let response= await postRequest("/single",Qs.stringify({
        data
    }),{
        headers:{
            "content-type":"application/x-www-form-urlencoded"
        }
    })
    if(response.code==0){
          //成功时
          abbreImg.src=response.path;
          detail.style.display = "none";
          abbre.style.display='block';
          submit.className = "submit";
      }

    //   大文件：切片上传，断点续传，文件秒传
</script>
```

```html
<!-- 多图片上传 -->

<script>
//delay延迟函数 promise的延迟函数
function delay(interval){

}

let uploadBox=document.querySelector(".uploadBox"),
button=uploadBox.querySelector(".button"),
uploadInp=uploadBox.querySelectoor("#uploadInp");

button.onclick=function(){
    uploadInp.click();
}
uploadInp.onchange= async function(){
    let self=this,
    files=Array.from(self.files);
    if(files.length==0)return;

    //没有上传前展示出来缩略图base64
    //上传进度条line
    //构建一个上传列表
    let uploadList=[];
    files.forEach((file,index)=>{
        uploadList[index]={
            file:file,
            base64:null,
            card:null,
        };
    });
    //搞定base64和动态创建card，

    //获取10个base64,返回promise实例(文件获取是异步的)
    let base64List=await Promise.all(files.map(file=>fileReader(file)));
    let frag=document.createDocumentFragment();
    base64List.forEach((base64,index)=>{
        //动态创建card
        let card=document.createElement("div");
        card.className='card';
        card.innerHTML='....'
        //uploadBox.appendChild(card)10个会10次回流
        //放进去uploadList
        frag.appendChild(card);
        uploadList[index].card=card;
        uploadList[index].base64=base64;
    })
    //文档碎片丢上去DOM
    uploadBox.appendChild(frag);

    await delay();//延迟一下，看效果明显

    //按照上传列表，批量上传图片&&监听进度
    let data={
        chunk:encodeURIComponent(base64),
        filename:file.name
    },
        config={
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            },
            //上传进度,axios中的回调函数
            onUploadProgreess(ev){
                //ev.loaded && ev.total
                let ratio=ev.loaded/ev.total*100+'%';
                card.querySelector('.line').style.width=ratio;
            }
        };
    uploadList.forEach(async item=>{
        let {file,base64,card}=item;
        let response=await postRequest("/single2",Qs.stringify(data),config);
        if(response.code==0){
            //成功
            let progress=card.querySelector(".progress"),
                mark=card.quertSelector(".mark");
                card.removeChild(progress);
                card.removeChild(mark);
        }
    });

}
</script>

```

```html
<!-- 文件拖拽上传 -->
<!-- 可编辑状态 -->
<div class="uploadBox" contenteditable></div>

<script>
    let uploadBox=document.querySelector(".uploadBox");
    uploadBox.ondrop=function(ev){
        ev.preventDefault();
        console.log(ev.dataTransfer.files);
        //ev.dataTransfer.file包含拖拽的那个文件
    };//拖拽事件
</script>

<!-- 下载文件两种方案：给连接，给blob -->
```