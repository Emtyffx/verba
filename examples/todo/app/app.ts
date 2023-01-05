import {cell, dict, View, InputString, Button, List, Checkbox} from '@durudex/verba'
import {
	Icon,
	iconPathCheckAll,
	iconPathClose,
	iconPathPlus
} from '@durudex/verba-material-icon'

class TodoApp extends View {
	@cell store() {return new TodoStore()}
	@cell filter(next: TodoStoreFilter = 'all') {return next}

	@cell newContent(next = '') {return next}

	kids() {
		return [this.Title(), this.Menu(), this.List(), this.Bottom()]
	}

	@cell Title() {
		return View.make({
			tag: () => 'h1',
			kids: () => ['To-do']
		})
	}

	@cell Menu() {
		return View.make({
			kids: () => [this.CompleteAll(), this.NewInput(), this.NewSubmit()],
		})
	}

	@cell CompleteAll() {
		return Button.make({
			kids: () => [this.CompleteAllIcon()],
			onClick: () => this.store().completeAll()
		})
	}

	@cell CompleteAllIcon() {
		return Icon.make({path: () => iconPathCheckAll})
	}

	@cell NewInput() {
		return InputString.make({
			hint: () => 'What needs to be done?',
			value: next => this.newContent(next),
			on: {keydown: event => this.newInputOnkeydown(event)},
		})
	}

	newInputOnkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') this.newSubmit()
	}

	@cell NewSubmit() {
		return Button.make({
			kids: () => [this.NewSubmitIcon()],
			onClick: () => this.newSubmit(),
			disabled: () => !this.newContent()
		})
	}

	@cell NewSubmitIcon() {
		return Icon.make({path: () => iconPathPlus})
	}

	newSubmit() {
		this.store().add(this.newContent())
		this.newContent('')
	}

	@cell List() {
		return List.make({
			rows: () =>
				this.store().todoIdsFiltered(this.filter()).map(id => this.Todo(id)),
		})
	}

	@dict Todo(id: string) {
		return View.make({
			kids: () => [this.TodoToggle(id), this.TodoContent(id), this.TodoDelete(id)],
		})
	}

	@dict TodoToggle(id: string) {
		return Checkbox.make({
			value: next => this.store().todoCompleted(id, next)
		})
	}

	@dict TodoContent(id: string) {
		return InputString.make({
			value: next => this.store().todoContent(id, next)
		})
	}

	@dict TodoDelete(id: string) {
		return Button.make({
			onClick: () => this.store().todoDelete(id),
			kids: () => [this.TodoDeleteIcon(id)],
		})
	}

	@dict TodoDeleteIcon(id: string) {
		return Icon.make({path: () => iconPathClose})
	}

	@cell Bottom() {
		return View.make({
			kids: () => [this.Left(), this.Filters(), this.ClearCompleted()],
		})
	}

	@cell Left() {
		return View.make({kids: () => [this.leftText()]})
	}

	leftText() {
		const count = this.store().itemIdsFiltered('active').length
		return `Items left: ${count}`
	}

	@cell ClearCompleted() {
		return Button.make({
			kids: () => ['Clear completed'],
			onClick: () => this.store().clearCompleted(),
		})
	}

	@cell Filters() {
		return View.make({
			kids: () => TodoStoreFilters.map(id => this.Filter(id))
		})
	}

	@dict Filter(id: TodoStoreFilter) {
		return Button.make({
			onClick: () => this.filter(id),
			kids: () => [id]
		})
	}
}

TodoApp.make().mount(document.body)
