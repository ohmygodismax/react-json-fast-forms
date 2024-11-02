export const FabricException = (field: string) => {
	return new Error(`SchemeComponentsFabricException: ${field} must be defined`);
}