using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class UserRepository : IUserRepository
{
    private readonly UserContext _context;
    public UserRepository(UserContext context)
    {
        _context = context;
    }
    public User Create(User? user)
    {
        _context.Users.Add(user!);
        user!.Id = _context.SaveChanges();
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