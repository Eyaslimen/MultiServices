using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Azure.Core;

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

            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name == employeRegisterDto.CategoryName);

            if (category == null)
                return BadRequest("Category not found");

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
                CategoryId = category.CategoryId,
            };

            // Handling profile photo upload
            if (employeRegisterDto.ProfilePhoto != null)
            {
                // Save file to wwwroot/uploads
                string fileName = Path.GetFileName(employeRegisterDto.ProfilePhoto.FileName);
                string profilePhotoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);

                using (var stream = new FileStream(profilePhotoPath, FileMode.Create))
                {
                    await employeRegisterDto.ProfilePhoto.CopyToAsync(stream);
                }

                // Store public URL (without 'wwwroot')
                user.ProfilePhotoUrl = Path.Combine("/uploads", fileName).Replace("\\", "/");
            }

            // Handling work photos upload
            if (employeRegisterDto.WorkPhotos != null && employeRegisterDto.WorkPhotos.Count > 0)
            {
                user.PhotoUrls = new List<string>();
                foreach (var photo in employeRegisterDto.WorkPhotos)
                {
                    string fileName = Path.GetFileName(photo.FileName);
                    string photoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);

                    using (var stream = new FileStream(photoPath, FileMode.Create))
                    {
                        await photo.CopyToAsync(stream);
                    }

                    // Store public URL
                    user.PhotoUrls.Add(Path.Combine("/uploads", fileName).Replace("\\", "/"));
                }
            }

            // Handling work videos upload
            if (employeRegisterDto.WorkVideos != null && employeRegisterDto.WorkVideos.Count > 0)
            {
                user.VideoUrls = new List<string>();
                foreach (var video in employeRegisterDto.WorkVideos)
                {
                    string fileName = Path.GetFileName(video.FileName);
                    string videoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);

                    using (var stream = new FileStream(videoPath, FileMode.Create))
                    {
                        await video.CopyToAsync(stream);
                    }

                    // Store public URL
                    user.VideoUrls.Add(Path.Combine("/uploads", fileName).Replace("\\", "/"));
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

        // get employe by id : 
        [HttpGet("id")]
        public async Task<ActionResult<EmployeDto>> GetEmploye(int id)
        {
            var Employe = _context.Employees.Where(e => e.EmployeId == id);
            return Ok(Employe);
        }



        [HttpPut("editprofile")]
        public async Task<IActionResult> UpdateProfile([FromForm] EmployeUpdateDto employeUpdateDto)
        {
            var user = await _context.Employees.FirstOrDefaultAsync(u => u.EmployeName == employeUpdateDto.EmployeName);

            if (user == null) return NotFound("User not found");

            user.EmployeName = employeUpdateDto.EmployeName;
            user.Place = employeUpdateDto.Place;
            user.Description = employeUpdateDto.Description;
            user.Email = employeUpdateDto.Email;
            user.Phone = employeUpdateDto.Phone;
            user.PhotoUrls = employeUpdateDto.PhotoUrls;
            user.VideoUrls = employeUpdateDto.VideoUrls;
            // Met à jour le mot de passe si un nouveau est fourni
            if (!string.IsNullOrEmpty(employeUpdateDto.Password))
            {
                CreatePasswordHash(employeUpdateDto.Password, out string passwordHash, out string passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            // Traitement de la photo de profil
            if (employeUpdateDto.ProfilePhoto != null)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(employeUpdateDto.ProfilePhoto.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await employeUpdateDto.ProfilePhoto.CopyToAsync(stream);
                }
                user.ProfilePhotoUrl = "/uploads/" + fileName;
            }
            // Si des photos sont téléchargées, les ajouter
            if (employeUpdateDto.WorkPhotos != null)
            {
                foreach (var photo in employeUpdateDto.WorkPhotos)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await photo.CopyToAsync(stream);
                    }
                    user.PhotoUrls.Add("/uploads/" + fileName); // Ajoute la nouvelle photo
                }
            }

            // Si des vidéos sont téléchargées, les ajouter
            if (employeUpdateDto.WorkVideos != null)
            {
                foreach (var video in employeUpdateDto.WorkVideos)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(video.FileName);
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await video.CopyToAsync(stream);
                    }
                    user.VideoUrls.Add("/uploads/" + fileName); // Ajoute la nouvelle vidéo
                }
            }

            // Si vous souhaitez conserver les photos et vidéos existantes,
            // ne les remplacez pas, seulement ajoutez les nouvelles.

            await _context.SaveChangesAsync();
            return Ok(user);
        }



    }
}
