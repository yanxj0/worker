let w;
const js = `var i=0;
				function timedCount()
				{
					i=i+1;
					postMessage(i);
					setTimeout("timedCount()",500);
				}
				timedCount();`
// 转成二进制对象
const blob = new Blob([js])
// 生成url
const url = window.URL.createObjectURL(blob)
// 加载url
// const worker = new Worker(url);
function startWorker() {
    if (typeof Worker !== 'undefined') {
        w = new Worker(url)
        w.onmessage = function (event) {
            document.getElementById('result').innerHTML = event.data
        }
        // worker线程报错
        w.onerror = e => {
            // e.filename - 发生错误的脚本文件名；e.lineno - 出现错误的行号；以及 e.message - 可读性良好的错误消息
            console.log('onerror', e)
        }
    } else {
        document.getElementById('result').innerHTML =
            'Sorry, your browser does not support Web Workers...'
    }
}

function stopWorker() {
    w.terminate()
}