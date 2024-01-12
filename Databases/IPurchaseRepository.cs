using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public interface IPurchaseRepository
{
    PurchaseHistory? Purchase(string surplusNumber, int uid);
}