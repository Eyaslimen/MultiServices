using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using System.Security.Cryptography;
using System.Text;

namespace MultiServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly MultiServicesContext _context;

        public ClientController(MultiServicesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()

        {
           var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

            [HttpPost("register")]
        public async Task<IActionResult> Register(ClientDto ClientRegisterDto)
        {
            if (await UserExists(ClientRegisterDto.ClientName))
                return BadRequest("Username is already taken");


            CreatePasswordHash(ClientRegisterDto.Password, out string passwordHash, out string passwordSalt);

            var user = new Client
            {
                ClientName = ClientRegisterDto.ClientName,
                Email = ClientRegisterDto.Email,
                Phone = ClientRegisterDto.Phone,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                ProfilePhotoUrl = ClientRegisterDto.ProfilePhotoUrl,
            };
            _context.Clients.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }


        // Spécifie que cette méthode répond aux requêtes POST à api/Users/login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            var user = await _context.Clients.FirstOrDefaultAsync(u => u.ClientName == request.Username);
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
