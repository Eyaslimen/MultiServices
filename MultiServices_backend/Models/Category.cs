namespace MultiServices.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public List<Employe> Employes { get; set; } = new List<Employe>();

    }
}
