using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace SPA_API.CustomError
{
    public class CustomError : IActionResult
    {
        private readonly HttpStatusCode _status;
        private readonly string _errorMessage;

        public CustomError(HttpStatusCode status, string errorMessage)
        {
            _status = status;
            _errorMessage = errorMessage;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(new
            {
                errorMessage = _errorMessage
            })
            {
                StatusCode = (int)_status,
            };

            context.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = _errorMessage;

            await objectResult.ExecuteResultAsync(context);
        }
    }
}
