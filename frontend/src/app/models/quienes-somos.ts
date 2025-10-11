export interface IQuienesSomos {
  titulo: string,
  descripcion: string,
  equipo: IEquipo[]

}
export interface IEquipo {
  nombre: string,
  rol: string,
  image: string
}
