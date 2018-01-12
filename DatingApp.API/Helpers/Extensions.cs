using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) //Lets add this method to Startup.cs 
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int ConvertDateTimeToInt(this DateTime thedateTime)
        {
            var age = DateTime.Now.Year - thedateTime.Year;
            if (thedateTime.AddYears(age)> DateTime.Today)
            {
                age--;
            }
            return age;
        }
    }
}