namespace MultiServices.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int EmployeId { get; set; }
        public string authorName { get; set; }
        public string ReviewComment { get; set; }
        public DateTime date { get; set; }
        public Employe Employe { get; set; }

    }
}
