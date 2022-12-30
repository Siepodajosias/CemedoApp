import { User } from 'src/app/models/interfaceUtilisateur/user';

export class Reception implements User{
    dateNaissance: string;
    email: string;
    fcmToken: string;
    genre: any;
    login: string;
    matricule: number;
    nom: string;
    password: string;
    prenoms: string;
    role: number;
    tel: string;
    tel2: string;
    typeEmploye: number;

}
