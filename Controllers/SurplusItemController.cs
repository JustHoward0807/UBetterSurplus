using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using UBetterSurplus.Databases;
using UBetterSurplus.Dtos;
using UBetterSurplus.Models;


namespace UBetterSurplus.Controllers;

[ApiController]
[Route("[controller]")]
public class SurplusItemController : Controller
{
    private readonly ILogger<SurplusItemController> _logger;
    private readonly IProductRepository _productRepository;
    private readonly IPurchaseRepository _purchaseRepository;
    // private readonly IUserRepository _userRepository;

    public SurplusItemController(ILogger<SurplusItemController> logger,
        IProductRepository productRepository,
        IPurchaseRepository purchaseRepository
        // IUserRepository userRepository
    )
    {
        _logger = logger;
        _productRepository = productRepository;
        _purchaseRepository = purchaseRepository;
        // _userRepository = userRepository;
    }


    [HttpGet]
    public IEnumerable<SurplusItem> Get()
    {
        // These are the code that extract data from a json file.
        // Was originally tested from json file
        // const string fileName = "output.json";
        //
        // await using var openStream = File.OpenRead(fileName);
        //
        // var surplusItems = await JsonSerializer.DeserializeAsync<List<SurplusItem>>(openStream);
        // return surplusItems!.ToArray();
        // foreach (var item in test)
        // {
        //     _logger.LogInformation(item.SurplusNumber);
        // }

        var items = _productRepository.GetAllSurplusItems();

        return items;
    }

    [HttpPost("Purchase")]
    public IActionResult Purchase(PurchaseDto dto)
    {
        var purchaseRequest = _purchaseRepository.Purchase(dto.Sid, dto.Uid);

        if (purchaseRequest == null)
        {
            // If the purchase failed, return a BadRequest response
            return BadRequest(new { message = "Cannot Purchase" });
        }

        // If the purchase is successful, return an Ok response
        return Ok(new
        {
            message = "Purchase Successful"
        });
    }
}