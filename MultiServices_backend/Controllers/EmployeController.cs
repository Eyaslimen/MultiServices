using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace MultiServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeController : ControllerBase
    {
        private readonly MultiServicesContext _context;

        public EmployeController(MultiServicesContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeDto>>> GetEmployes()

        {
            var employes = await _context.Employees
                .Include(rev => rev.Reviews)
                //  Le Select est une méthode LINQ utilisée pour projeter chaque catégorie et ses employés associés dans une nouvelle instance de CategoryDto. C'est ici que nous définissons la transformation des données de la base de données en objets DTO.
                .Select(e => new EmployeDto
                {
                    EmployeName = e.EmployeName,
                    Email = e.Email,
                    Phone = e.Phone,
                    Post = e.Post,
                    Place = e.Place,
                    ProfilePhotoUrl = e.ProfilePhotoUrl,
                    Description = e.Description,
                    PhotoUrls = e.PhotoUrls,
                    VideoUrls = e.VideoUrls,
                    Reviewss = e.Reviews.Select(rv => new ReviewDto
                    {
                        ClientId = rv.ClientId,
                        EmloyeId = rv.EmployeId,
                        ReviewComment = rv.ReviewComment,
                        date = rv.date,
                        Rating = rv.Rating
                    }).ToList()
                }).ToListAsync();
            return Ok(employes);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] EmployeDto employeRegisterDto)
        {
            if (await UserExists(employeRegisterDto.EmployeName))
                return BadRequest("Username is already taken");

            // Recherche de la catégorie
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name == employeRegisterDto.CategoryName);

            if (category == null)
                return BadRequest("Category not found");

            // Création du hash du mot de passe
            CreatePasswordHash(employeRegisterDto.Password, out string passwordHash, out string passwordSalt);

            var user = new Employe
            {
                EmployeName = employeRegisterDto.EmployeName,
                Email = employeRegisterDto.Email,
                Phone = employeRegisterDto.Phone,
                Post = employeRegisterDto.Post,
                Place = employeRegisterDto.Place,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Description = employeRegisterDto.Description,
                CategoryId = category.CategoryId
            };

            // Gestion du téléchargement de la photo de profil
            if (employeRegisterDto.ProfilePhoto != null)
            {
                string profilePhotoPath = Path.Combine("wwwroot/uploads", employeRegisterDto.ProfilePhoto.FileName);
                using (var stream = new FileStream(profilePhotoPath, FileMode.Create))
                {
                    await employeRegisterDto.ProfilePhoto.CopyToAsync(stream);
                }
                user.ProfilePhotoUrl = profilePhotoPath;
            }

            // Gestion du téléchargement des photos de travail
            if (employeRegisterDto.WorkPhotos != null && employeRegisterDto.WorkPhotos.Count > 0)
            {
                user.PhotoUrls = new List<string>();
                foreach (var photo in employeRegisterDto.WorkPhotos)
                {
                    string photoPath = Path.Combine("wwwroot/uploads", photo.FileName);
                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await photo.CopyToAsync(stream);
                    }
                    user.PhotoUrls.Add(photoPath);
                }
            }

            // Gestion du téléchargement des vidéos de travail
            if (employeRegisterDto.WorkVideos != null && employeRegisterDto.WorkVideos.Count > 0)
            {
                user.VideoUrls = new List<string>();
                foreach (var video in employeRegisterDto.WorkVideos)
                {
                    string videoPath = Path.Combine("wwwroot/uploads", video.FileName);
                    using (var stream = new FileStream(videoPath, FileMode.Create))
                    {
                        await video.CopyToAsync(stream);
                    }
                    user.VideoUrls.Add(videoPath);
                }
            }

            _context.Employees.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.EmployeId, user.EmployeName });
        }



        // Spécifie que cette méthode répond aux requêtes POST à api/Users/login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            var user = await _context.Employees.FirstOrDefaultAsync(u => u.EmployeName == request.Username);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid username or password.");
            // Vérifiez ici les valeurs renvoyées pour s'assurer qu'elles ne sont pas nulles ou vides
                return Ok(user);
        }

        private bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            using (var hmac = new HMACSHA512(Convert.FromBase64String(storedSalt)))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(Convert.FromBase64String(storedHash));
            }
        }

        private void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = Convert.ToBase64String(hmac.Key);
                passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }
        }


        private async Task<bool> UserExists(string username)
        {
            return await _context.Employees.AnyAsync(u => u.EmployeName == username);
        }
    }
}
