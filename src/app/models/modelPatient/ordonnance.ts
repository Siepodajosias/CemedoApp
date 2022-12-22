export class Ordonnance{
    id:number
    dateEmission:Date
    livre:{
        libelle:string
    }
    user:{
      id:number
      fullName:string
    }
    medecin:{
        id:number,
        user:{
          fullName:string
          nom:string 
        }

    }
    assure:{
        id:number
        user:{
          fullName:string
          nom:string 
        }

    }
    active:number
  
}