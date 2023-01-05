import {Obj, dict, localStorageItem, guid} from '@durudex/verba'

// Можливо, потрібно винести з класу юзкейси (completed екшени, фільтрація)?

interface TodoDto {
	completed: boolean
	title: string
}

export const TodoStoreFilters = ['all', 'active', 'completed'] as const
export type TodoStoreFilter = typeof TodoStoreFilters[number]

export class TodoStore extends Obj {
	itemIds(next?: string[]): string[] {
		return localStorageItem('todoIds', next) ?? []
	}

	item(id: string, next?: TodoDto | null) {
		return localStorageItem(`todo=${id}`, next)
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
