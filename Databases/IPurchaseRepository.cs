using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public interface IPurchaseRepository
{
    PurchaseHistory? Purchase(string surplusNumber, int uid);

    IEnumerable<PurchaseHistory> GetPurchaseHistory(int uid);
}