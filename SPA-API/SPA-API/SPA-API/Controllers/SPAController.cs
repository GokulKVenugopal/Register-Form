using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SPA_API.Model;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;

namespace SPA_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SPAController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register(Register register)
        {
            try
            {
                List<string> EmailList = new List<string>();
                EmailList.Add("mahesh@gmail.com");
                EmailList.Add("praveen@gmail.com");
                EmailList.Add("patrick@gmail.com");
                EmailList.Add("susan@gmail.com");
                EmailList.Add("john@gmail.com");
                EmailList.Add("ronald@gmail.com");

                var regex = @"(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}";
                var match = Regex.Match(register.Password, regex);

                if (EmailList.Contains(register.Email))
                {
                    throw new Exception("Email already exists!");
                }

                if (register.Password != register.ConfirmPassword)
                {
                    throw new Exception("Password mismatch!");
                }

                if (register.Password.Length < 8 || register.Password.Length > 16 || !match.Success)
                {
                    throw new Exception("Password should be between 8 and 16 characters and contain atleast 2 special characters!");
                }

                return Ok(new { statusCode = 200, message = "Sucess" });
            }
            catch (Exception ex)
            {
                return new CustomError.CustomError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


    }
}
