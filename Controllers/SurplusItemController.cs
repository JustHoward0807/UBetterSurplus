using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace UBetterSurplus.Controllers;

[ApiController]
[Route("[controller]")]
public class SurplusItemController
{
    private readonly ILogger<SurplusItemController> _logger;
    public SurplusItemController(ILogger<SurplusItemController> logger)
    {
        _logger = logger;
    }
    
    
    [HttpGet]
    public async Task<IEnumerable<SurplusItem>> Get()
    {
        //TODO: Maybe not getting from json here. could change it to getting from database.
        
        const string fileName = "output.json";
        await using var openStream = File.OpenRead(fileName);

        var surplusItems = await JsonSerializer.DeserializeAsync<List<SurplusItem>>(openStream);
        
        // foreach (var item in surplusItems!)
        // {
        //     _logger.LogInformation(item.SurplusNumber + " " + item.Description);
        // }
        
        return surplusItems!.ToArray();
    }
}