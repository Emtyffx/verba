class Counter extends View {
	@cell value(next = 0) {return next}

	kids() {
		return [this.Dec(), this.Value(), this.Inc()]
	}

	@cell Dec() {
		return Button.make({
			onClick: () => this.value(this.value() - 1),
			kids: () => ['-'],
		})
	}

	@cell Value() {
		return View.make({
			tag: () => 'span',
			kids: () => [this.value()],
		})
	}

	@cell Inc() {
		return Button.make({
			onClick: () => this.value(this.value() + 1),
			kids: () => ['+'],
		})
	}
}

Counter.make().mount(document.body)
