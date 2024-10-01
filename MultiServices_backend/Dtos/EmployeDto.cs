using MultiServices.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MultiServices.Dtos
{
    public class EmployeDto
    {
        public string EmployeName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Post { get; set; }
        public string Place { get; set; }
        public string Password { get; set; }
        public string? ProfilePhotoUrl { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public List<ReviewDto> Reviewss { get; set; } = new List<ReviewDto>();
        public List<string>? PhotoUrls { get; set; }  // Liste des chemins des photos de travail
        public List<string>? VideoUrls { get; set; }  // Liste des chemins des vidéos de travail

        // Ces propriétés ne seront pas mappées à la base de données
        [NotMapped]
        public IFormFile ProfilePhoto { get; set; }

        [NotMapped]
        public List<IFormFile> WorkPhotos { get; set; }

        [NotMapped]
        public List<IFormFile> WorkVideos { get; set; }
    }
}

