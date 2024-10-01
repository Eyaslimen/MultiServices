using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MultiServices.Data;
using MultiServices.Models;
using MultiServices.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;

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
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(ReviewDto ReviewDto)
        {
            int id = ReviewDto.EmloyeId;
            Employe employe = await _context.FindAsync<Employe>(id);
            var Review = new Review
            {
                ClientId = ReviewDto.ClientId,
                EmployeId = ReviewDto.EmloyeId,
                ReviewComment = ReviewDto.ReviewComment,
                date = ReviewDto.date,
                Rating = ReviewDto.Rating
            };
            employe.Reviews.Add(Review);
            await _context.SaveChangesAsync();
            return Ok(Review) ;
        }
    }
}
