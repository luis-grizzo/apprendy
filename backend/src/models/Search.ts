export class Search {
  public type: string

  public value: string

  constructor(type: string, value: string) {
    this.type = type.toLowerCase()
    this.value = value
  }

  public typeIsValid = (): boolean => {
    const types = [ "recursos", "ferramentas", "categorias", "tags" ]

    const findType = types.find(type => type === this.type)

    return !!findType 
  }
}