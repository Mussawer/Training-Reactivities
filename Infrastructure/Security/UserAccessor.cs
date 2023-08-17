using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            //we are not inside our API project and we need to access Http context
            //so we can do this via this interface because it contains user object
            //and from user object we can access user claims inside token 
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetUserName()
        {
            var result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            return result;
        }
    }
}