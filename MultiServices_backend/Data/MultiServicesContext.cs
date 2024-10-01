using Microsoft.EntityFrameworkCore;
using MultiServices.Models;

namespace MultiServices.Data
{
    public class MultiServicesContext : DbContext
    {
        public MultiServicesContext(DbContextOptions<MultiServicesContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //One category has many employees 
            modelBuilder.Entity<Category>()
                .HasMany(p => p.Employes)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId)
                .IsRequired();
            base.OnModelCreating(modelBuilder);

            // One Employe has many reviews
            modelBuilder.Entity<Employe>()
              .HasMany(p => p.Reviews)
              .WithOne(c => c.Employe)
              .HasForeignKey(c => c.EmployeId)
              .IsRequired();


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Employe> Employees { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Category>  Categories { get; set; }
    }
}