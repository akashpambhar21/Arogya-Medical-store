using Microsoft.EntityFrameworkCore;

namespace Arogya_Medical_store.Models
{
    public class MedContext : DbContext
    {
        public MedContext(DbContextOptions<MedContext> options) : base(options)
        {

        }

        public DbSet<Users> users { get; set; } = null!;
        public DbSet<Medicines> medicines { get; set; } = null!;
        public DbSet<Orders> orders { get; set; } = null!;
    }
}
