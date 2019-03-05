self.onmessage = function(e) {
	let data = e.data
	console.log('worker:', data.length)
}
const dics = [6, 9, 12]
const start = 0
function handle(data) {
	let len = data.length
	for (let i = 0; i < len; ) {
		let item = data[i],
			res = {}
		if (item.Code.length === dics[start]) {
			data.splic(i,1)
			res = {
				code: item.Code,
				name: item.Name
			}
            let childs = getLowRegion(data, item.Code, start + 1)
            
        }
        else{
            i++
        }
	}
}
function getLowRegion(data, pCode, dicIndex) {
    let resArr = [],
        dic = dics[dicIndex]
	for (let i = 0; i < data.length;) {
        let item = data[i];
        let codeStr = item.Code.toString();
        let res = {};
        if(codeStr.length === dic && codeStr.indexOf(pCode)>-1){
            res = {
                code: item.Code,
				name: item.Name
            };
            if(dicIndex<dics.length){
                getLowRegion(data, item.Code, dicIndex+1);
            }
            
        }
        else{
            i++
        }
    }
}
