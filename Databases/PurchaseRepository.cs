using System.Runtime.InteropServices.JavaScript;
using Google.Protobuf.WellKnownTypes;
using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class PurchaseRepository : IPurchaseRepository
{
    private readonly PurchaseHistoryContext _purchaseHistoryContext;
    private readonly ProductContext _productContext;
    private readonly ILogger<PurchaseRepository> _logger;

    public PurchaseRepository(PurchaseHistoryContext purchaseHistoryContext, ProductContext productContext,
        ILogger<PurchaseRepository> logger)
    {
        _purchaseHistoryContext = purchaseHistoryContext;
        _productContext = productContext;
        _logger = logger;
    }

    public PurchaseHistory? Purchase(string surplusNumber, int uid)
    {
        try
        {
            var purchase = new PurchaseHistory
            {
                Sid = surplusNumber,
                Uid = uid,
                PurchaseTime = DateTime.UtcNow
            };

            _purchaseHistoryContext.PurchaseHistories.Add(purchase);
            purchase.Pid = _purchaseHistoryContext.SaveChanges();

            // Minus Qty from Products
            var selectedItem = _productContext.SurplusItems.FirstOrDefault(item => item.SurplusNumber == surplusNumber);


            if (selectedItem != null)
            {
                selectedItem.Qty = selectedItem!.Qty = (selectedItem!.Qty - 1);
                _productContext.SurplusItems.Update(selectedItem);
                _productContext.SaveChanges();
                _logger.LogInformation($"Updated Qty for SurplusItem {surplusNumber}: {selectedItem.Qty}");
            }
            else
            {
                _logger.LogError($"SurplusItem with SurplusNumber {surplusNumber} not found.");
            }

            return purchase;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}