using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Cms;
using UBetterSurplus;
using UBetterSurplus.Databases;
using UBetterSurplus.Models;

namespace UBetterSurplusApiTest;

public class UBetterSurplusApiTest
{
    private HttpClient? _httpClient;
    private UserContext? _userContext;
    private ProductContext? _productContext;
    private PurchaseHistoryContext? _purchaseHistoryContext;
    
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
        var userOptions = new DbContextOptionsBuilder<UserContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        var productOptions = new DbContextOptionsBuilder<ProductContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        var purchaseOptions =
            new DbContextOptionsBuilder<PurchaseHistoryContext>().UseInMemoryDatabase(databaseName: "InMemoryDatabase").Options;

        _purchaseHistoryContext = new PurchaseHistoryContext(purchaseOptions);
        _userContext = new UserContext(userOptions);
        _productContext = new ProductContext(productOptions);
        
        SeedTestData(_userContext, _productContext, _purchaseHistoryContext);
    }

    [TearDown]
    public void TearDown()
    {
        _httpClient!.Dispose();
        _userContext!.Dispose();
        _productContext!.Dispose();
        _purchaseHistoryContext!.Dispose();
    }

    private void SeedTestData(UserContext context, ProductContext productContext, PurchaseHistoryContext purchaseHistoryContext)
    {
        var uid = context.Users.Add(new User { Name = "testNewUser6", Password = "somepassword" });
        context.Users.Add(new User { Name = "testNewUser7", Password = "somepassword" });
        context.Users.Add(new User { Name = "testNewUser8", Password = "somepassword" });
        context.Users.Add(new User { Name = "testNewUser9", Password = "somepassword" });
        context.SaveChanges();

        var sid = productContext.SurplusItems.Add(new SurplusItem
        {
            SurplusNumber = "test surplus number",
            Qty = 1,
            Description = "Computer",
            Price = "$100.0",
            PublicDate = "null",
            Type = "CPU",
            Category = "Computer/IT/Telecommunication Equipment/Supply"
        });
        
        productContext.SaveChanges();


        purchaseHistoryContext.PurchaseHistories.Add(new PurchaseHistory
            { Uid = uid.Entity.Id, Sid = sid.Entity.SurplusNumber, PurchaseTime = DateTime.Now });
        purchaseHistoryContext.SaveChanges();
    }
    
    [Test]
    public async Task TestLogin()
    {
        var testNewUser = "testNewUser10";
        var testExistUser = "testNewUser6";
        var testRegisterSignUpList = new List<string>
        {
            testNewUser,
            testExistUser
        };
        
        try
        {
            const string apiUrl = "http://localhost:5064/auth/RegisterOrLogin";

            foreach (var user in testRegisterSignUpList)
            {
                var jsonPayload = new
                {
                    Name = user,
                    Password = "somepassword"
                };

                
                var content = new StringContent(JsonSerializer.Serialize(jsonPayload), Encoding.UTF8, "application/json");
                
                var response = await _httpClient!.PostAsync(apiUrl, content);

                var responseBody = await response.Content.ReadAsStringAsync();
                Assert.That(responseBody.Contains("Success Login"), Is.EqualTo(true));
                Assert.That(responseBody.Contains("Success Login"), Is.EqualTo(true));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception occurred: {ex.Message}");
            throw;
        }
    }

    [Test]
    public void TestDatabaseSeedData()
    {
        var users = _userContext!.Users.ToList();
        Assert.That(users, Has.Count.EqualTo(4));
        Assert.That(users, Has.Some.Matches<User>(user => user.Name == "testNewUser6"));
        Assert.That(users, Has.Some.Matches<User>(user => user.Name == "testNewUser7"));
        Assert.That(users, Has.Some.Matches<User>(user => user.Name == "testNewUser8"));
        Assert.That(users, Has.Some.Matches<User>(user => user.Name == "testNewUser9"));


        var purchaseHis = _purchaseHistoryContext!.PurchaseHistories.ToList();
        Assert.That(purchaseHis, Has.Count.EqualTo(1));
        
        var products = _productContext!.SurplusItems.ToList();
        Assert.That(products, Has.Count.EqualTo(1));
        var surplusItemToRemove = _productContext.SurplusItems.FirstOrDefault(item => item.SurplusNumber == "test surplus number");
        _productContext.SurplusItems.Remove(surplusItemToRemove!);
        _productContext.SaveChanges();
        products = _productContext!.SurplusItems.ToList();
        Assert.That(products, Has.Count.EqualTo(0));
        
    }
    
    
    
    
}