using MultiServices.Dtos;
using System.ComponentModel.DataAnnotations.Schema;

namespace MultiServices.Models
{
    public class Employe
    {
        public int EmployeId { get; set; }
        public string EmployeName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Post { get; set; }
        public string Place { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Description { get; set; }
        public string ProfilePhotoUrl { get; set; }  // Chemin du fichier photo de profil
        public List<string> PhotoUrls { get; set; }  // Liste des chemins des photos de travail
        public List<string> VideoUrls { get; set; }  // Liste des chemins des vidéos de travail

        // Ces propriétés ne seront pas mappées à la base de données
        [NotMapped]
        public IFormFile ProfilePhoto { get; set; }

        [NotMapped]
        public List<IFormFile> WorkPhotos { get; set; }

        [NotMapped]
        public List<IFormFile> WorkVideos { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>();
        public Category? Category { get; set; }
        public int CategoryId { get; set; }

    }
}