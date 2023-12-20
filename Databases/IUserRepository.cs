using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public interface IUserRepository
{
    User Create(User user);
    User? GetByUsername(string username);
    
    User GetById(int id);
}