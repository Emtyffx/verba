import {cell, Obj} from '@krulod/wire/dist'
const testSell = cell.ref('test', () => 1)


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
	private root: Element = new Element()
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
				let newElement = el
				Object.entries(newElement).forEach(([k, v]) => {
					if (v instanceof Function) {
						newElement[k] = (event: Event) => {
							v(event)
              this.rerender()
						}
					}
				})
				this.rootElement.appendChild(el)
			} else if (el instanceof Element) {
				this.rootElement.appendChild(el)
			}
		})
		this.root = root
		root.appendChild(this.rootElement)
	}
	public rerender() {
		this.root.removeChild(this.rootElement)
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
	private kids(): Array<any> {
		return []
	}

	/**
	 * Creates an instance of ViewBase.
	 * @memberof ViewBase
	 */
	public constructor() {
		super()
		this.view_helper = View.make({
			kids: this.kids
		})
	}

	public mount(root: Element) {
		this.view_helper.mount(root)
	}

}
export default View

