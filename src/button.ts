/**
 *
 *
 * @class Button
 */
abstract class Button {
	/**
	 *
	 *
	 * @static
	 * @param {{kids: Array<any>}} {kids, ...rest}
	 * @return {*}  {Element}
	 * @memberOf Button
	 */
	public static make({kids, ...rest}: {kids: Array<any>}): Element {
		const htmlElement = document.createElement('button')
		kids.forEach(el => {
			if (typeof el == 'string') {
				const divElement = document.createElement('div')
				divElement.innerHTML = el
				htmlElement.appendChild(divElement)
			}
		})
		Object.entries(rest).forEach(([key, value]) => {
			htmlElement[key] = value
		})

		return htmlElement
	}
}
export default Button
