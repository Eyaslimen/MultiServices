using MultiServices.Models;

namespace MultiServices.Dtos
{
    public class ReviewDto
    {
        public int EmloyeId { get; set; }
        public int ClientId { get; set; }
        public int ReviewId { get; set; }
        public string ReviewComment { get; set; }
        public DateTime date { get; set; }
        public int Rating { get; set; }
    }
}
