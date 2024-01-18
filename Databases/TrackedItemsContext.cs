using Microsoft.EntityFrameworkCore;
using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class TrackedItemsContext : DbContext
{
    public TrackedItemsContext(DbContextOptions<TrackedItemsContext> options) : base(options)
    {
        
    }
    
    public DbSet<TrackedItems> TrackedItems { get; set; }
    public DbSet<SurplusItem> SurplusItems { get; set; }
}