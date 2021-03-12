/*
var elm = new Element({
	html: '<div>123</div>',        
	parentSelector: 'body > div',
	possition: 'before'
});

var elm = new Element({
	html: '<div>123</div>',        
	parentDOM: document.querySelector('body > div'),
	possition: 'after'
});
*/

let exportTo = new Object();

class DataList {
	constructor(containerId, inputId, listId, options) {
		this.containerId = containerId;
		this.inputId = inputId;
		this.listId = listId;
		this.options = options;
	}

	create(filter = "") {
		const list = document.getElementById(this.listId);
		const filterOptions = this.options.filter(
			d => filter === "" || d.text.includes(filter)
		);

		if (filterOptions.length === 0) {
			list.classList.remove("active");
		} else {
			list.classList.add("active");
		}

		list.innerHTML = filterOptions
			.map(o => `<li id=${o.value}>${o.text}</li>`)
			.join("");
	}

	addListeners(datalist) {
		const container = document.getElementById(this.containerId);
		const input = document.getElementById(this.inputId);
		const list = document.getElementById(this.listId);
		container.addEventListener("click", e => {
			if (e.target.id === this.inputId) {
				container.classList.toggle("active");
			} else if (e.target.id === "datalist-icon") {
				container.classList.toggle("active");
				input.focus();
			}
		});

		input.addEventListener("input", function(e) {
			if (!container.classList.contains("active")) {
				container.classList.add("active");
			}

			datalist.create(input.value);
		});

		list.addEventListener("click", function(e) {
			if (e.target.nodeName.toLocaleLowerCase() === "li") {
				input.value = e.target.innerText;
				container.classList.remove("active");
			}
		});
	}
}
exportTo.DataList = DataList;

class Element {
	constructor(obj) {
		let { html, parentDOM, parentSelector, possition } = obj;
		this.element = this.create(
			html,
			(parentSelector) ? parentSelector : parentDOM,
			possition
		);
        return this;
    }

    create(html, parent, possition = 'after') {
        let element = document.createElement("div");
        element.innerHTML = html;
		element = element.firstElementChild;
		const parentElement = (typeof parent === 'string') ? document.querySelector(parent) : parent;
		(possition === 'after') ? parentElement.append(element) : parentElement.prepend(element);
        return element;
    }

    isExists() {
        try {
            if ( this.element.parentElement === null || this.element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement === null) {
                return false;
            } else return true;
        } catch {
            return false;
        }
    }

    remove() {
        this.element.remove();
        delete this;
	}
	
	hide() {
		this.element.style.display = 'none';
	}

	show() {
		this.element.style.display = 'block';
	}
}
exportTo.Element = Element;

return exportTo;