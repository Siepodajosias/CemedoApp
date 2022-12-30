export class Ordonnance{
    id:number
    dateEmission:Date
    livre:boolean
    user:{
      id:number
      fullName:string
    }
    medecin:number
    assure:number
    active:number
  
}
