using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class UserRepository : IUserRepository
{
    private readonly UserContext _context;
    private readonly ILogger<UserRepository> _logger;
    public UserRepository(UserContext context,  ILogger<UserRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public User Create(User? user)
    {
        // _context.Users.Add(user!);
        // user!.Id = _context.SaveChanges();
        // return user;
        
        var entityEntry = _context.Users.Add(user);
        _context.SaveChanges();
        var generatedId = (int)entityEntry.Property("Id").CurrentValue!;
        user.Id = generatedId;
        return user;
    }
    
    public User? GetByUsername(string username)
    {
        // Returns null if no matching user is found.
        return _context.Users.FirstOrDefault(user => user.Name == username);
    }

    public User GetById(int id)
    {
        return _context.Users.FirstOrDefault(user => user.Id == id)!;
    }
}