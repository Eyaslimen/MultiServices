using MultiServices.Models;

namespace MultiServices.Dtos
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public List<EmployeDto> Employes { get; set; } = new List<EmployeDto>();
    }
}
