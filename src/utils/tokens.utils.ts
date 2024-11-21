export const setToken = (tokenName: string, token: string): void => {
	localStorage.setItem(tokenName, token);
}

export const getToken = (tokenName: string): string | null => {
	return localStorage.getItem(tokenName);
}

export const createFormTokenName = (formName: string, tokenType: string) => {
	return `${formName}:${tokenType}Token`;
}