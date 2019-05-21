self.onmessage = function(e) {
    let {data} = e;
    let source = JSON.parse(ab2str(data));
    let resArr = [];
    extraction(source, resArr);
    postMessage(getLowRegion(resArr,"42",start));
}
const dics = [4, 6, 9, 12];
const start = 0;
function getLowRegion(data, pCode, dicIndex) {
    let resArr = [],
        dic = dics[dicIndex]
	for (let i = 0; i < data.length;) {
        let item = data[i];
        let codeStr = item.code.toString();
        let res = {};
        if(codeStr.length === dic && codeStr.indexOf(pCode)>-1){
            data.splice(i,1)
            res = {
                code: item.code,
				name: item.name
            };
            if(dicIndex<dics.length){
                let childs = getLowRegion(data, item.code, dicIndex+1);
                childs.length && (res.children = childs);
            }
            resArr.push(res);
        }
        else{
            i++
        }
    }
    return resArr;
}

function extraction(data, resArr) {
    data.map(item=>{
        let {Code, title, children} = item;
        resArr.push({
            name: title,
            code:Code
        });
        if(children && children.length){
            extraction(children,resArr);
        }
    })
}

// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
    let u8a = new Uint8Array(buf);
    let decoder = new TextDecoder();
    return decoder.decode(u8a);
    // return String.fromCharCode.apply(null, u8a);//调用栈溢出
}