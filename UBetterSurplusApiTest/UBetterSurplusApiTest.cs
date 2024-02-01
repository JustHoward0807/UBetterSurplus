using System.Text;
using System.Text.Json;

namespace UBetterSurplusApiTest;

public class UBetterSurplusApiTest
{
    private HttpClient? _httpClient;


    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [TearDown]
    public void TearDown()
    {
        _httpClient!.Dispose();
    }

    
    //TODO: Also do the database setting, so can test register and login
    [Test]
    public async Task Test1()
    {
        try
        {
            const string apiUrl = "http://localhost:5064/auth/RegisterOrLogin";

            var jsonPayload = new
            {
                Name = "testNewUser",
                Password = "12345"
            };

            var content = new StringContent(JsonSerializer.Serialize(jsonPayload), Encoding.UTF8, "application/json");


            var response = await _httpClient!.PostAsync(apiUrl, content);

            var responseBody = await response.Content.ReadAsStringAsync();
            Assert.That(responseBody.Contains("Success Login"), Is.EqualTo(true));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception occurred: {ex.Message}");
            throw;
        }
    }
    
    
    //TODO: Test with Get, Purchase, ItemTrackCheck, Track, Untrack method with database
}