using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public interface ITrackedItemsRepository
{
    TrackedItems? Track(string surplusNumber, int uid);
    
}