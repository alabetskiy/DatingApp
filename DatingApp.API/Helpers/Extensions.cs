using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message) //Lets add this method to Startup.cs 
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Applica tion-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response,
        int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);
            
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter)); //Passing camelCaseFormatter with paginationHeader just to normolize JSON object.
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

        public static int ConvertDateTimeToInt(this DateTime thedateTime)
        {
            var age = DateTime.Now.Year - thedateTime.Year;
            if (thedateTime.AddYears(age) > DateTime.Today)
            {
                age--;
            }
            return age;
        }
    }
}