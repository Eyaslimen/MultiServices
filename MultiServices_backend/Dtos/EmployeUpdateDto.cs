using System.ComponentModel.DataAnnotations.Schema;

namespace MultiServices.Dtos
{
    public class EmployeUpdateDto
    {
        public int EmployeId { get; set; }
        public string EmployeName { get; set; }
        public string Phone { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public IFormFile? ProfilePhoto { get; set; }
        [NotMapped]
        public List<IFormFile>? WorkPhotos { get; set; }
        [NotMapped]
        public List<IFormFile>? WorkVideos { get; set; }
        public List<string> PhotoUrls { get; set; } = new List<string>();
        public List<string> VideoUrls { get; set; } = new List<string>();
    }
}
