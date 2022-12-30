export class AppelVideo {
	id:number
	dateDebut:string
	dateFin:string
	employeTraitant :{
		id:number,
		user:{
			id:string
			fullName:string,
			nom:string,
		}
	}
	assure :{
		id:number,
		user:{
			id:string
			,dateNaissance:string,
			fullName:string,
			nom:string,
		}
	}
	gerant :{
		id:number,
		user:{
			id:number
			fullName:string,
			nom:string,
		}
	}
	createdAt:string
	updatedAt:string
	version:number
	active:number
}
