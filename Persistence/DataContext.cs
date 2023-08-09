using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        //constructor needed by DbContext
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //Activities represent table name inside database when it gets created
        public DbSet<Activity> Activities { get; set; }
    }
}