using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection; //Added manually to resolve GetService<IDatingRepository>()

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter //Don't forget to add in Startup.cs to services.AddScoped<LogUserActivity>(); 
    {
        //we can run before action is executed or after. Depence on what we choose: context or next. 
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) 
        {
            var resultContext = await next(); //it will run after our Action is execited 

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}