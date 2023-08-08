using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Response<T> response)
        {
            if (response == null)
            {
                return NotFound();
            }
            if (response.IsSuccess && response.Value != null)
            {
                return Ok(response.Value);
            };
            if (response.IsSuccess && response.Value == null)
            {
                return NotFound();
            }
            return BadRequest(response.Error);
        }
    }
}