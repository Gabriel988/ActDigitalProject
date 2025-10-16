using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IApiCredentialsRepository
    {
        public bool ValidateCredentials(Credentials credentials);

    }
}
