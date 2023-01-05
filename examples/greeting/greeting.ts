import {cell, View} from '@durudex/verba'

class Greeting extends View {
	@cell name(next = '') {return next}

	kids() {
		return [this.Input(), this.Label()]
	}

	@cell Input() {
		return InputString.make({
			hint: () => 'Name',
			value: next => this.name(next)
		})
	}

	@cell Label() {
		return View.make({kids: () => [this.label()]})
	}

	label() {
		return `Welcome, ${this.name() || 'Anonymous'}`
	}
}

Greeting.make().mount(document.body)
