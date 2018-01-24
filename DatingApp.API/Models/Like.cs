namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; }
        public int LikeeId { get; set; }
        public User Liker { get; set; } //Setting up Many-to-Many (EF Core way)
        public User Likee { get; set; } //Setting up Many-to-Many (EF Core way)

    }
}