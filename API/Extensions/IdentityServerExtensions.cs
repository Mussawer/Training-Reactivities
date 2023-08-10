using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServerExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            //this service is going to be scoped to Http request itself
            // when http request comes in we are going to our account controller
            // then new instance of token service will be created
            // when http request is finished we will dispise of token service
            services.AddScoped<TokenService>();
            return services;
        }
    }
}