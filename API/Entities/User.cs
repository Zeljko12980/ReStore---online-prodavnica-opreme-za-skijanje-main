using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User:IdentityUser
    {
        public UserAdress UserAdress{get;set;}
        
    }
}