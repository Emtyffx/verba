class Counter extends View {
	@solo value(next = 0) {return next}

	kids() {
		return [this.Dec(), this.Value(), this.Inc()]
	}

	@solo Dec() {
		return Button.make({
			onClick: () => this.value(this.value() - 1),
			kids: () => ['-'],
		})
	}

	@solo Value() {
		return View.make({
			tag: () => 'span',
			kids: () => [this.value()],
		})
	}

	@solo Inc() {
		return Button.make({
			onClick: () => this.value(this.value() + 1),
			kids: () => ['+'],
		})
	}
}

new Counter().mount(document.body)
