using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Azure.Core;

namespace MultiServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly MultiServicesContext _context;

        public ReviewController(MultiServicesContext context)
        {
            _context = context;
        }

        // ajouter un review a un employé par son ID 
        [HttpPost("{id}/reviews")]
        public async Task<IActionResult> AddReview(int id, [FromBody] ReviewDto reviewDto)
        {
            var employe = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeId == id);

            if (employe == null)
            {
                return NotFound(); // Gérer le cas où l'employé n'existe pas
            }

            var rev = new Review
            {
                authorName = reviewDto.authorName,
                ReviewComment = reviewDto.ReviewComment,
                date = DateTime.Now,
            };
            employe.Reviews.Add(rev);
            _context.SaveChanges();
            var responseReviewDto = new ReviewDto
            {
                authorName = rev.authorName,
                ReviewComment = rev.ReviewComment,
                date = rev.date
            };

            return Ok(responseReviewDto);
        }

        // retourner l'ensemble de reviewss : 
        [HttpGet("{id}/reviews")]
        public IActionResult GetReviews(int id)
        {
            var reviews = _context.Reviews.Where(r => r.EmployeId == id).ToList();
            return Ok(reviews);
        }

    }
}
