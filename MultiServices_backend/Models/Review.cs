namespace MultiServices.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public string ReviewComment { get; set; }
        public int Rating { get; set; }
        public Employe Employe { get; set; }
        public DateTime date { get; set; }
        public int EmployeId { get; set; }
        public int ClientId { get; set; }
    }
}
