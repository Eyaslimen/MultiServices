using MultiServices.Models;

namespace MultiServices.Dtos
{
    public class ReviewDto
    {
        public string authorName { get; set; }
        public string ReviewComment { get; set; }
        public DateTime date { get; set; }
    }
}
