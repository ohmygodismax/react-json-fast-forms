export type JSONFunction = {
	arguments: string,
	body: string
}

export type AsyncConfig = {
	type: 'fetch/post' | 'fetch/get' | 'gql',
	url: string,
	query: string,
	dependsValues: string[] | Array<[string, string]>,
	fetchOnInit: boolean,
	fetchIfUndefined: boolean,
	filterByDependent?: JSONFunction,
	extractDataFunction?: JSONFunction,
	extractValueFunction: JSONFunction,
	extractLabelFunction: JSONFunction,
}