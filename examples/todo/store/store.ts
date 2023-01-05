// @ts-nocheck

interface TodoDto {
	completed: boolean
	title: string
}

export type TodoStoreFilter = 'all' | 'active' | 'completed'

export class TodoStore {
	itemIds(next?: string[]): string[] {
		return storageLocal('todoIds', next) ?? []
	}

	item(id: string, next?: TodoDto | null) {
		return storageLocal(`todo=${id}`, next)
	}

	@dict title(id: string, next?: string) {
		if (next === undefined) return this.item(id).content
		return this.item(id, {...this.item(id), title: next})
	}

	@dict completed(id: string, next?: boolean) {
		if (next === undefined) return this.item(id).content
		return this.item(id, {...this.item(id), completed: next})
	}

	completeAll() {
		this.itemIds().forEach(id => this.completed(id, true))
	}

	clearCompleted() {
		this.itemIdsFiltered('completed').forEach(id => this.delete(id))
	}

	add(content: string) {
		this.item(guid(), {completed: false, title: content})
	}

	delete(id: string) {
		this.itemIds(this.itemIds().filter(tid => tid !== id))
		this.item(id, null)
	}

	@dict itemIdsFiltered(filter: TodoStoreFilter) {
		return this.itemIds().filter(id => {
			switch (filter) {
				case 'all': return true
				case 'completed': return this.completed(id)
				case 'active': return !this.completed(id)
			}
		})
	}
}
