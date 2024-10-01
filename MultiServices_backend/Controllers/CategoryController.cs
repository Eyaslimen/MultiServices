using Microsoft.AspNetCore.Mvc;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MultiServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly MultiServicesContext _context;

        public CategoryController(MultiServicesContext context)
        {
            _context = context;
        }
        // ADD A NEW CATEGORY
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }
        // GET ALL CATEGORIES
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories
                // Include : pour associer le table des employes vu que il y a une relation entre category et employé
                .Include(c => c.Employes)
                //  Le Select est une méthode LINQ utilisée pour projeter chaque catégorie et ses employés associés dans une nouvelle instance de CategoryDto. C'est ici que nous définissons la transformation des données de la base de données en objets DTO.
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    Employes = c.Employes.Select(e => new EmployeDto
                    {
                        EmployeName = e.EmployeName,
                        Email = e.Email,
                        Phone = e.Phone,
                        Post = e.Post,
                        ProfilePhotoUrl = e.ProfilePhotoUrl,
                        Description = e.Description,
                        PhotoUrls = e.PhotoUrls, 
                        VideoUrls = e.VideoUrls  
                    }).ToList()
                }).ToListAsync();

            return Ok(categories);
        }

    }
}
