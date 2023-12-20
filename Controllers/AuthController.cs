using Microsoft.AspNetCore.Mvc;
using UBetterSurplus.Databases;
using UBetterSurplus.Dtos;
using UBetterSurplus.Helpers;
using UBetterSurplus.Models;

namespace UBetterSurplus.Controllers;

[Route("api")]
[ApiController]
public class AuthController : Controller
{
    private readonly IUserRepository _repository;
    private readonly JwtService _jwtService;

    public AuthController(IUserRepository repository, JwtService jwtService)
    {
        _repository = repository;
        _jwtService = jwtService;
    }


    [HttpPost("RegisterOrLogin")]
    public IActionResult RegisterOrLogin(RegisterDto dto)
    {
        // Check if the user exist or not, if not then do the register. if exist, do the login
        var user = _repository.GetByUsername(dto.Name);

        if (user == null)
        {
            user = new User
            {
                Name = dto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("Success Register", _repository.Create(user));
        }

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
        {
            return BadRequest(new { message = "Invalid password" });
        }

        var jwt = _jwtService.Generate(user.Id);

        Response.Cookies.Append("jwt", jwt, new CookieOptions
        {
            HttpOnly = true
        });
        return Ok(new
        {
            message = "Success Login"
        });
    }

    [HttpGet("User")]
    public IActionResult User()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt!);

            int userId = int.Parse(token.Issuer);

            var user = _repository.GetById(userId);

            return Ok(user);
        }

        catch (Exception)
        {
            return Unauthorized();
        }
    }

    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        
        Response.Cookies.Delete("jwt");

        return Ok(new
        {
            message = "Success delete cookies"
        });
    }
}