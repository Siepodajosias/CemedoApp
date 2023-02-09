import { User } from 'src/app/models/interfaceUtilisateur/user';

export class Administrateur implements User{
    dateNaissance: string;
    email: string;
    fcmToken: string;
    genre: any;
    matricule: number;
    login: string;
    nom: string;
    password: string;
    prenoms: string;
    role: number;
    tel: string;
    tel2: string;
    typeEmploye: number;
}
