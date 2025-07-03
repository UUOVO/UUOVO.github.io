// 当 HTML 文档完全解析，且所有延迟脚本下载和执行完毕后，会触发 DOMContentLoaded 事件。它不会等待图片、子框架和异步脚本等其他内容完成加载。
document.addEventListener('DOMContentLoaded', function (event) {
	function traverseNodes(node) {
		if (node.nodeName !== 'FIGURE') {
			// 编辑器不渲染
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent
				console.log(text, '*************')
				// 将英文单词和中文分割并以数组的形式存储
				const parts = text.split(/([a-zA-Z]+)/)
				const parent = node.parentElement
				const wrapper = document.createElement('span')
				parts.forEach((part) => {
					// 遍历时只要是英文单词就把颜色设置为绿色
					if (/^[a-zA-Z]+$/.test(part)) {
						const span = document.createElement('span')
						span.style.color = 'green'
						span.textContent = part
						wrapper.appendChild(span)
					} else wrapper.appendChild(document.createTextNode(part))
				})
				// 替换原节点
				parent.replaceChild(wrapper, node)
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				node.childNodes.forEach(traverseNodes)
			}
		}
	}
	// 从文档部分开始遍历
	traverseNodes(document.getElementById('article-container'))
})
