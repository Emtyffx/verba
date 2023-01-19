
/**
 *
 *
 * @class View
 */
class View {

	/**
	 *
	 *
	 * @static
	 * @param {{kids: Array<any>}} {kids}
	 * @return {*}  {ViewHelper}
	 * @memberof View
	 */
	public static make({kids}: {kids: Array<any>}): ViewHelper {
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


	/**
	 * Creates an instance of ViewHelper.
	 * @param {Array<any>} kids
	 * @memberof ViewHelper
	 */
	public constructor(kids: Array<any>) {
		kids.forEach(el => {
			if (typeof el === 'string') {
				const htmlElement = document.createElement('div')
				htmlElement.innerHTML = el
				this.rootElement.appendChild(htmlElement)
			} else if (el instanceof Element) {
				this.rootElement.appendChild(el)
			}
		})
  }


	/**
	 *
	 * @param {Element} root
	 * @memberof ViewHelper
	 */
	public mount(root: Element) {
		root.appendChild(this.rootElement)
	}
}

export default View
