namespace MultiServices.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ProfilePhotoUrl { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

    }
}
