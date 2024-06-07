import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailUserPage } from '../detail-user/detail-user.page';
import { HttpClient } from '@angular/common/http';
// import {  } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: any[] = [];
  selectedFile: File | null = null;
  editingUser: any = null; // Pour stocker les informations de l'utilisateur en cours de modification
  editingSelectedFile: File | null = null; // Pour stocker le fichier sélectionné lors de l'édition

  @ViewChild('bottomDiv') bottomDiv: ElementRef  | null = null; //bouton redirection en bas de page pour la création

  constructor(public modalController: ModalController, private http: HttpClient) {}
//fonction qui redirige vers page details
  async versPageDetail(data: any){
    console.log(data);
    const modal = await this.modalController.create({
    component: DetailUserPage,
    componentProps: { 
    name: data.name,
    image: data.image,
    description: data.description
    }
    });
    return await modal.present();
    }
    

  ngOnInit() {
    this.fetchUsers();
  }
  
  // Fonction pour récupérer les utilisateurs depuis l'API
  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/api/users')
      .subscribe(
        (data) => {
          // Met à jour le tableau des utilisateurs
          this.users = data;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  }
  // Fonction appelée lors de la sélection d'un fichier pour l'upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Fonction appelée lors de la sélection d'un fichier pour la modification
  onEditFileSelected(event: any) {
    this.editingSelectedFile = event.target.files[0];
  }
  showCreateForm = false;  // Booléen pour afficher ou masquer le formulaire de création
  
  // Fonction appelée lors de la création d'un utilisateur
  createUser(user: any) {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('description', user.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('http://localhost:3000/api/users', formData)
      .subscribe(
        (response) => {
          console.log(alert(`l'utilisateur ${user.name} a été ajouté avec succès:`), response);
          this.fetchUsers(); // Récupérer à nouveau les utilisateurs après la création
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  }
  
  // Fonction pour mettre à jour un utilisateur existant
  // updateUser(user: any) {
  //   const formData = new FormData();
  //   formData.append('name', user.name);
  //   formData.append('description', user.description);
  //   if (this.editingSelectedFile) {
  //     formData.append('image', this.editingSelectedFile, this.editingSelectedFile.name);
  //   }

  //   this.http.put(`http://localhost:3000/api/users/${user.id}`, formData)
  //     .subscribe(
  //       (response) => {
  //         console.log(alert(`l'utilisateur ${user.name} a été modifié avec succès:`), response);
  //         this.fetchUsers(); // Récupérer à nouveau les utilisateurs après la modification
  //         this.editingUser = null; // Réinitialiser le mode édition après la mise à jour
  //         this.editingSelectedFile = null; // Réinitialiser le fichier sélectionné après la mise à jour
  //       },
  //       (error) => {
  //         console.error('Une erreur s\'est produite :', error);
  //       }
  //     );
  // }
  updateUser(user: any) {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('description', user.description);
  
    // Inclure l'ancienne image par défaut
    formData.append('image', user.imagePath);
  
    // Si un nouveau fichier a été sélectionné, le remplacer
    if (this.editingSelectedFile) {
      formData.append('image', this.editingSelectedFile, this.editingSelectedFile.name);
    }
  
    this.http.put(`http://localhost:3000/api/users/${user.id}`, formData)
      .subscribe(
        (response) => {
          console.log(alert(`l'utilisateur ${user.name} a été modifié avec succès:`), response);
          this.fetchUsers(); // Récupérer à nouveau les utilisateurs après la modification
          this.editingUser = null; // Réinitialiser le mode édition après la mise à jour
          this.editingSelectedFile = null; // Réinitialiser le fichier sélectionné après la mise à jour
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  }
  // Fonction pour supprimer un utilisateur existant

  deleteUser(userId: number) {
    this.http.delete(`http://localhost:3000/api/users/${userId}`)
      .subscribe(
        (response) => {
          console.log(alert(`l'utilisateur  a été supprimé avec succès:`), response);
          this.fetchUsers(); // Récupérer à nouveau les utilisateurs après la suppression
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  }

  editUser(user: any) {
    this.editingUser = { ...user }; // Faire une copie de l'utilisateur pour l'édition
  }

  // Fonction pour sauvegarder les modifications apportées à un utilisateur
  saveUser() {
    if (this.editingUser) {
      this.updateUser(this.editingUser);
    }
  }
    // Fonction pour faire défiler la page jusqu'en bas
  // scrollToBottom() {
  //   if (this.bottomDiv) {
  //     this.bottomDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
}
