import {Obj} from '@krulod/wire/dist'

/**
 *
 *
 * @abstract
 * @class View
 */
abstract class View {
	/**
	 *
	 *
	 * @static
	 * @param {{kids: Array<any>}} {kids}
	 * @return {*}  {ViewHelper}
	 * @memberof View
	 */
	public static make({kids}: {kids: () => Array<any>}): ViewHelper {
		return new ViewHelper(kids)
	}
}

/**
 *
 *
 * @class ViewHelper
 */
class ViewHelper {
	private rootElement = document.createElement('div')
	private root: Element = document.createElement('div')
	private kids: () => Array<any>
	/**
	 * Creates an instance of ViewHelper.
	 * @param {Array<any>} kids
	 * @memberof ViewHelper
	 */
	public constructor(kids: () => Array<any>) {
		this.kids = kids
	}

	/**
	 *
	 * @param {Element} root
	 * @memberof ViewHelper
	 */
	public mount(root: Element) {
		this.kids().forEach(el => {
			if (typeof el === 'string') {
				const htmlElement = document.createElement('div')
				htmlElement.innerHTML = el
				this.rootElement.appendChild(htmlElement)
			} else if (el instanceof HTMLButtonElement) {
				this.rootElement.appendChild(el)
			} else if (el instanceof Element) {
				this.rootElement.appendChild(el)
			}
		})
		this.root = root
		root.appendChild(this.rootElement)
	}
	public rerender(kidsEl: () => Array<any>) {
		this.rootElement.innerHTML = ''
		this.root.removeChild(this.rootElement)
		this.kids = kidsEl
		console.log(this.kids)
		this.mount(this.root)
	}
}
export class ViewBase extends Obj {
	private view_helper: ViewHelper
	/**
	 *
	 *
	 * @private
	 * @return {*}  {Array<any>}
	 * @memberof ViewBase
	 */
	kids(): Array<any> {
		return []
	}

	/**
	 * Creates an instance of ViewBase.
	 * @memberof ViewBase
	 */
	public constructor() {
		super()
		this.view_helper = View.make({
			kids: () => this.kids(),
		})
	}

	public mount(root: Element) {
		this.view_helper.mount(root)
	}
	rerender(kids: () => Array<any>) {
		this.view_helper.rerender(() => kids())
	}
}
export default View
