using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string  KnowAs { get; set; }
        public DateTime Created { get; set; }
        
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }    
        public string LookingFor { get; set; }  
        public string Interests { get; set; }
        public string City { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Like> Liker { get; set; } //Setting up Many-to-Many (EF Core way)
        public ICollection<Like> Likee { get; set; } //Setting up Many-to-Many (EF Core way)
        public ICollection<Message> MessageSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
        public User(){
            Photos = new Collection<Photo>();
        }

    }
}