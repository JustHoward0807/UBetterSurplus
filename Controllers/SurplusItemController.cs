using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using UBetterSurplus.Databases;
using UBetterSurplus.Dtos;
using UBetterSurplus.Helpers;
using UBetterSurplus.Models;


namespace UBetterSurplus.Controllers;

[ApiController]
[Route("[controller]")]
public class SurplusItemController : Controller
{
    private readonly ILogger<SurplusItemController> _logger;
    private readonly IProductRepository _productRepository;
    private readonly IPurchaseRepository _purchaseRepository;
    private readonly ITrackedItemsRepository _trackedItemsRepository;
    private readonly IUserRepository _userRepository;
    private readonly JwtService _jwtService;

    public SurplusItemController(ILogger<SurplusItemController> logger,
        IProductRepository productRepository,
        IPurchaseRepository purchaseRepository,
        IUserRepository userRepository,
        JwtService jwtService,
        ITrackedItemsRepository trackedItemsRepository
    )
    {
        _logger = logger;
        _productRepository = productRepository;
        _purchaseRepository = purchaseRepository;
        _userRepository = userRepository;
        _jwtService = jwtService;
        _trackedItemsRepository = trackedItemsRepository;

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
        return _productRepository.GetAllSurplusItems();
    }
    
    [HttpGet("PurchaseHistory")]
    public IEnumerable<PurchaseHistory> GetPurchaseHistory()
    {
       
        try
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt!);
            
            var userId = int.Parse(token.Issuer);
            
            var user = _userRepository.GetById(userId);

            var items = _purchaseRepository.GetPurchaseHistory(user.Id);


            return items;
        }

        catch (Exception)
        {
            return null!;
        }
        
    }

    [HttpPost("Purchase")]
    public IActionResult Purchase(PurchaseDto dto)
    {
        var uId = _userRepository.GetByUsername(dto.Username)!.Id;
        var purchaseRequest = _purchaseRepository.Purchase(dto.Sid, uId);

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
    
    [HttpPost("ItemTrackCheck")]
    public IActionResult ItemTrackCheck(TrackDto dto)
    {
        var uId = _userRepository.GetByUsername(dto.Username)!.Id;
        var hasItem = _trackedItemsRepository.TrackCheck(dto.Sid, uId);
        if (hasItem)
        {
            return Ok(new
            {
                message = "Item Tracked"
            });
        }
        else
        {
            return NotFound(new { message = "Item not tracked" });
        }
    }
    
    [HttpPost("Track")]
    public IActionResult Track(TrackDto dto)
    {
        var uId = _userRepository.GetByUsername(dto.Username)!.Id;
        var trackItem = _trackedItemsRepository.Track(dto.Sid, uId);
        if (trackItem == null)
        {
            return BadRequest(new { message = "Cannot Track" });
            
        }
        else
        {
            return Ok(new
            {
                message = "Item Tracked"
            });
        }
    }
    
}